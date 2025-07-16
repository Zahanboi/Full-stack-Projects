import React from 'react'
import { useState } from 'react';
import { useRef } from 'react';
import "../styles/video.css"
import TextField from '@mui/material/TextField';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import io from "socket.io-client";

const server_url = "http://localhost:8003";

var connections = {};//can also define inside export also using useref so can implement with connections.current

const peerConfigConnections = {
    "iceServers" : [
        { "urls" : "stun:stun.l.google.com:19302"}//stun servers
    ]
}

export default function VideoMeet() {

    var socketRef = useRef();//for chat get id
    let socketIdRef = useRef();

    let localVideoRef = useRef();//get khudka and others video in local

    let [videoAvailable, setVideoAvailable] = useState(true);//if video available or not

    let [audioAvailable, setAudioAvailable] = useState(true);

    let [video, setVideo] = useState([])//video on and off can be many

    let [audio, setAudio] = useState();

    let[screen, setScreen] = useState();

    let [showModal, setModal] = useState();// for pop up wagera

    let [screenAvailable, setScreenAvailable] = useState();

    let [messages, setMessages] = useState([]);

    let [message, setMessage] = useState("")//jo type hoga

    let[newMessages, setNewMessages] = useState(0);//popups

    let[askForUsername, setAskForUsername] = useState(true);//if someone logs in as guest

    let[username, setUsername] = useState("")

    const videoRef = useRef([]);

    let [videos, setVideos] = useState([]); //multiple videos k liye

    // if (isChrome() === false) {
        
    // }

    const getPermissions = async () => { //get user video audio and permission via navigator object
        try {
            const videoPermission = await navigator.mediaDevices.getUserMedia({video: true})

            if (videoPermission) {
                setVideoAvailable(true);
            } else {
                setVideoAvailable(false);
            }

            const audioPermission = await navigator.mediaDevices.getUserMedia({audio: true})

            if (audioPermission) {
                setAudioAvailable(true);
            } else {
                setAudioAvailable(false);
            }

            if (navigator.mediaDevices.getDisplayMedia) {// not really need permission to share screen only that which screen you want to share 
                setScreenAvailable(true);
            }else{
                setScreenAvailable(false)
            }

            if (videoAvailable || audioAvailable) {//to pass the streams etc of users to others and self

                const userMediaStream = await navigator.mediaDevices.getUserMedia({video: videoAvailable})
                if (userMediaStream) {
                    window.localStream = userMediaStream
                    if (localVideoRef.current) {
                        localVideoRef.current.srcObject = userMediaStream;//explain
                    }
                }
                

            }

        } catch (error) {
            console.log(error);
            
        }
    }

    let getUserMediaSuccess = (stream) => {
        try {
            window.localStream.getTracks().forEach(track => track.stop())
        } catch (error) {
            console.log(error)
        }

        window.localStream = stream;
        localVideoRef.current.srcObject = stream;

        for (let id in connections) {
            if (id !== socketIdRef.current) {//create offer and add stream for other videos in meet apne wale ke liye did when user-joined happened 
                connections[id].addStream(window.localStream)
                
                connections[id].createOffer().then((description) => {
                    connections[id].setLocalDescription(description)
                    .then(() => {
                        socketRef.current.emit("signal", id, JSON.stringify({ "sdp": connections[id].localDescription}))// should be socketref not socketidref
                    })
                    .catch((e) => console.log(e))
                })
            }
            
        }

         stream.getTracks().forEach(track => track.onended = () => {//if a video or stream has ended or stopped
            setVideo(false);
            setAudio(false);

            try {
                let tracks = localVideoRef.current.srcObject.getTracks()
                tracks.forEach(track => track.stop())
            } catch { (e) => console.log(e) }

            let blackSilence = (...args) => new MediaStream([black(...args), silence()])
            window.localStream = blackSilence()
            localVideoRef.current.srcObject = window.localStream

            for (let id in connections) {
                connections[id].addStream(window.localStream)

                connections[id].createOffer().then((description) => {
                    connections[id].setLocalDescription(description)
                        .then(() => {
                            socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
                        })
                        .catch(e => console.log(e))
                })
            }
        })
    }

    let silence = () => {//read about audiocontext on mdn used to display static black screen on a "empty" audio stream meaning even when audio disconnect give a stream of nothing these are practises
        let context = new AudioContext();
        let oscillator = context.createOscillator();

        let dest = oscillator.connect(context.createMediaStreamDestination());

        oscillator.start();
        context.resume();
        return Object.assign( dest.stream.getAudioTracks()[0] ,{ enabled: false}) //provided in MediaStream default by js
    }

    let black = ({width = 640, height = 480} = {}) => {//learn about canvas
        let canvas = Object.assign(document.createElement("canvas"), {width, height});
        
        canvas.getContext('2d').fillRect(0,0, width, height);
        let stream = canvas.captureStream();
        return Object.assign( stream.getVideoTracks()[0], {enabled: false})
    }

    let getUserMedia = () => {
        if ((video && videoAvailable) || (audio || audioAvailable)) {
            navigator.mediaDevices.getUserMedia({video: video, audio: audio})// here we check the true false condition from video audio not videoAvailable wagera because this is for inside meet part not connect page videoAvailable will be checked before
            .then(getUserMediaSuccess)// do not call this function like () because already being called otherwise it will be called without stream argument , this will mske sure via above video:video and audio:audio that if user mutes his audio then no audio and audio: false so only video goes through his to getUserMediaSuccess and that gives only video or audio
            .then((stream) => { })
            .catch(err => console.log(err))
        }else{
            try {
                 let tracks = localVideoRef.current.srcObject.getTracks();
            tracks.forEach(track => {
                track.stop();// explain
            });
            } catch (error) {
                console.log(error);
            }
           
        }
    }

    useEffect(() => {
        getPermissions();
    }, []);

    useEffect(() => {
        if (video !== undefined && audio !== undefined) {
            getUserMedia();
        }
    }, [audio, video])

    let getMedia = () => {
        setVideo(videoAvailable);//these are async funcs so will be handled independently thats why create another use effect for video audio stream transfer
        setAudio(audioAvailable);//
        connectToSocketServer();
    }

    let connect = () => {
        setAskForUsername(false);
        getMedia();
    }

    let gotMessageFromServer = (icmId, message) => {
        var signal = JSON.parse(message)

        if (icmId !== socketIdRef.current) {
            if (signal.sdp) {
                connections[icmId].setRemoteDescription(new RTCSessionDescription(signal.sdp))
                .then(() => {
                    if (signal.sdp.type === 'offer') {
                        connections[icmId].createAnswer()
                        .then((description) => {
                            connections[icmId].setLocalDescription(description)
                            .then(() => {
                                socketRef.current.emit("signal", icmId, JSON.stringify({"sdp": connections[icmId].localDescription}))
                            }).catch(e => console.log(e))
                        }).catch(e => console.log(e))
                    }else{
                        console.log("type not equal to offer" , signal.sdp.type)
                    }
                }).catch(e => console.log(e))
            }

            if(signal.ice) {
                connections[icmId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => console.log(e))
            }
        }
    }

    let addMessage = () => {

    }

    let connectToSocketServer = () => {

        socketRef.current = io.connect(server_url, {secure: false})//ref ke current me socket daaldo fir uspe socket func use kro

        socketRef.current.on("signal", gotMessageFromServer);

        socketRef.current.on("connect", () => {
            socketRef.current.emit("join-call", window.location.href)
            socketIdRef.current = socketRef.current.id

            socketRef.current.on("chat-message", addMessage)

            socketRef.current.on("user-left", (id)=>{
                setVideos((videos) => videos.filter((video) => video.socketId !== id)); //remove that video which id is == id
            })

            socketRef.current.on("user-joined", (id, clients) => {
                clients.forEach((socketListId) => {
                    connections[socketListId] = new RTCPeerConnection(peerConfigConnections) //ice fullform, set up rtc connection

                    connections[socketListId].onicecandidate = (event) => {//now via our stun servers we are creating a channel for socketid sharing to our signaling server which will send it to all the clients
                        if(event.candidate != null){
                            socketRef.current.emit("signal" , socketListId, JSON.stringify({ 'ice': event.candidate }))//explain
                        }
                    }

                    connections[socketListId].onaddStream = (event) => {//we are using localVideoRef this is why because a strem is channeled with video audio screen and it is being changed via a async type func setVideo Wagera so cant add a video via onaddstream to send it to every user so we are using localvideoref via a useref , we can also use use effect but here can't because this a function
                        let videoExists = videoRef.current.find(video => video.socketId === socketListId);
    
                        if (videoExists) {
                            setVideos(videos => {
                                const updateVideos = videos.map(video => 
                                    video.socketId === socketListId ? {...video, stream: event.stream} : video //give entire stream or just video if new user joins then add new stream or event stream but if another user then socketlistid wala then just give old video 
                                )
                                videoRef.current = updateVideos;
                                return updateVideos;
                            })
                        }else{

                            let newVideo = {
                                socketId: socketListId,
                                stream: event.stream,
                                autoplay: true,
                                playsinline: true
                            }

                            setVideos(videos => {
                                const updatedVideos = [ ...videos, newVideo];// destructure and push into it method
                                videoRef.current = updatedVideos;
                                return updatedVideos;
                            })


                        } 

                    }

                    if (window.localStream !== undefined && window.localStream !== null) { // window object is as such that you can access it anywhere like if u initialise window.example then can use it in console of browser
                        connections[socketListId].addStream(window.localStream);
                    } else {
                        let blackSilence = ( ...args) => new MediaStream([black(...args), silence()])
                        window.localStream = blackSilence();
                        connections[socketListId].addStream(window.localStream);
                    }


                })

                if (id === socketIdRef.current) {
                    for(let idnew in connections){
                        if (idnew === socketIdRef.current) continue // if already present then no need to add 
                        try {
                            connections[idnew].addStream(window.localStream); // add khudki stream for everyone
                        } catch (error) {}

                        connections[idnew].createOffer().then((description) => {
                            connections[idnew].setLocalDescription(description)
                            .then(() => {
                                socketRef.current.emit("signal", idnew, JSON.stringify({ "sdp": connections[idnew].localDescription})) //session description sdp handshake part connection establishing part
                            })
                            .catch(e => console.log(e))
                        })
                    }
                }

            })
        })
    }

  return (
    // <div>VideoMeetComponent :- {window.location.href.toLowerCase()}</div>
   
    <div>
        {askForUsername === true ?

            <div>
                <h2>Enter into Lobby</h2>
                <h2>{video.socketId}</h2>
                <TextField id="outlined-basic" value={username} label="Username" onChange={e => setUsername(e.target.value)} variant="outlined" />
                <Button variant="contained" onClick={connect}> Connect </Button>

                <div>
                    <video ref={localVideoRef} autoPlay muted></video>
                    
                </div>

            </div> : <>
            <video ref={localVideoRef} autoPlay muted></video> {/* use this otherwise after connect ref.current become empty null and give error */}
            {videos.map((video) => (
                <div key={video.socketId}>
                    <h2>{video.socketId}</h2>

                    <video 
                    data-socket={video.socketId}
                    ref= {ref => {
                        if (ref && video.stream) {
                            ref.srcObject = video.stream
                        }
                    }}
                    autoPlay
                    ></video>
                </div>
            ))}
            </>

        }
    </div>
    
  )
}
