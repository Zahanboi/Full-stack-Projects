import { useState } from 'react';


export default function LikeCount() {//use state used inside component for proper re-rendering
    let [count, setCount] = useState(0);
    let [color, setColor] = useState('');

    //  or use if else react wala

    // function increment() {
    // setCount(count + 1);
    //  setColor('red');
    //     setTimeout(() => {
    //         setColor('');
    //     }, 100);
    // console.log(count);
    // colorChange();
    // }
    // function colorChange(){
    //     {let a = document.querySelector('.fa-heart')
    //                a.className = "fa-solid fa-heart";
    //                a.style.color = color
    //                 // console.log(a.style);
    //                 setTimeout(() => {
    //                    a.className = "fa-regular fa-heart";
    //                     a.style.color = color
    //                   }, 100);
    //     }
    // }
    
    
    // function colorChange(){
    //     {let a = document.querySelector('.fa-heart')
    //        a.className = "fa-solid fa-heart";
    //        a.style.color = 'red'
    //         // console.log(a.style);
    //         setTimeout(() => {
    //            a.className = "fa-regular fa-heart";
    //             a.style.color = ''
    //           }, 100);
            
    //     }
    // }

    return (
        <div>
            <i className="fa-regular fa-heart" onClick={increment} ></i>
            <h1 style={{fontSize: '15px'}}>{count}</h1>
        </div>
    )
}