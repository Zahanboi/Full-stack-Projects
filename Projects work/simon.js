// let gameSeq = [];
// let userSeq = [];

// let btns = ["div1","div2", "div3" ,"div4"];

// let started = false;
// let level  = 0;
// let h3 = document.querySelector("h3");


// document.addEventListener("keypress" , function(e){
//   if (e.key == "Enter") {
//     if (started == false){
//     console.log("game started");
//     started = true;
//     levelUp();
//    } 
//   } 
// //    console.log(e)
// });

// function btnflash(btn){
//     btn.classList.add("flash");
//     setTimeout(function() {
//         btn.classList.remove("flash");
//     }, 400);
// }

// function btnflashuser(btn){
//     btn.classList.add("flash1");
//     setTimeout(function() {
//         btn.classList.remove("flash1");
//     }, 200);
// }

// function levelUp(){
//     userSeq = [];
//     level++;
//     h3.innerText =`Level ${level}`;
//     let rndIdx = Math.floor(Math.random()*4);
//     let rndcolour = btns[rndIdx];
//     let rndBtn = document.querySelector(`.${rndcolour}`);
//     gameSeq.push(rndcolour);
//     console.log(gameSeq);
//     btnflash(rndBtn);
// }

//  function recognize (e) {
//         // console.log(e.target); 
//         let clickedBtn = e.target.classList[0]; // class list gives index to all the class names so just use classList[0] for 1st name
//         userSeq.push(clickedBtn); 
//         let rndBtn1 = this;//document.querySelector(`.${clickedBtn}`); basically in this you passed the class using .classname and query selector chose object of that class name and send it up// can't directly pass classname as userseq.push(clickedbtn) has to pass it as class . krke query selector se or just use 'this'
//         btnflashuser(rndBtn1);
//         console.log(userSeq); 
//         sequence(userSeq.length - 1);// imp imp userSeq-1 means it will always compare userSeq -1 va element mtlb 1st to 1st 2nd to 2nd if teesra input you do then length -1 = 2nd index se game seq ka 2nd index compare hoga damnn
//     }

// let buttons = document.getElementsByClassName("btn"); 
//     for (let btn of buttons) { 
//         btn.addEventListener("click", recognize );
//     }

// function sequence(idx){
//     if (gameSeq[idx] == userSeq[idx]) {
//         if (gameSeq.length == userSeq.length) {
//        levelUp(); 
//     }
//    }else{
//     h3.innerHTML =`Game Over! Your score was <b> ${level} </b> <br> Press ENTER again to restart.`;
//     changecolour();
//     gameSeq = [];
//     userSeq = [];
//     started = false;
//     level = 0;
//    }
// } 

// function changecolour(){
//     document.querySelector("body").bgColor = "red";
//     setTimeout(function (){
//         document.querySelector("body").bgColor = "white";
//     } , 200);
// }

let gameSeq = [];
let userSeq = [];

const btns = ["div1", "div2", "div3", "div4"];
let started = false;
let level = 0;

const h3 = document.querySelector("h3");

// Event listener for keypress to start the game
document.addEventListener("keypress", function (e) {
    if (e.key === "Enter" && !started) {
        console.log("Game started");
        started = true;
        levelUp();
        start();
    }
});

// Flashing animation for the game button
function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 500);
}

// Flashing animation for the user's button press
function btnFlashUser(btn) {
    btn.classList.add("flash1");
    setTimeout(() => {
        btn.classList.remove("flash1");
    }, 120);
}

// Increases the level, generates a random button and adds it to the game sequence
function levelUp() {
    userSeq = [];
    level++;
    h3.innerText = `Level ${level}`;

    const rndIdx = Math.floor(Math.random() * 4);
    const rndColour = btns[rndIdx];
    const rndBtn = document.querySelector(`.${rndColour}`);

    gameSeq.push(rndColour);
    console.log(gameSeq);
    btnFlash(rndBtn);
}

// Handles user button clicks
function recognize(e) {
    const clickedBtn = e.target.classList[0]; // Retrieves the class name of the clicked button
    userSeq.push(clickedBtn);

    const clickedBtnElement = this; // 'this' refers to the clicked button element
    btnFlashUser(clickedBtnElement);

    console.log(userSeq);
    sequence(userSeq.length - 1); // Compare the last user input with the game sequence
}

// Add click event listeners to each button
function start(){
const buttons = document.getElementsByClassName("btn");
for (let btn of buttons) {
    btn.addEventListener("click", recognize);
}
}

// Compare user sequence with game sequence and handle game progression or game over
function sequence(idx) {
    if (gameSeq[idx] === userSeq[idx]) {
        if (gameSeq.length === userSeq.length) {
            levelUp();
        }
    } else {
        h3.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press ENTER again to restart.`;
        changeColour();
        highestScore();// put before reset game
        resetGame();
        
    }
}

// Resets game variables
function resetGame() {
    gameSeq = [];
    userSeq = [];
    started = false;
    level = 0;
    const buttons = document.getElementsByClassName("btn");
for (let btn of buttons) {
    btn.removeEventListener("click", recognize);// so that game stops if someone loses nd not keep taking inputs
}
}

// Changes the background color briefly for a "game over" effect
function changeColour() {
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(() => {
        document.querySelector("body").style.backgroundColor = "white";
    }, 200);
}

// function tu track highest score
function highestScore(){
   let HS = document.querySelector("#highestScore");
   if (level>HS.innerText) {
    HS.innerText = `${level}`;
   }
}