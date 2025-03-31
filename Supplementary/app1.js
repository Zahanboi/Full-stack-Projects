// const person = "drishti";

// let guess = prompt("Guess my favourite person or write 'i quit'");

// while(guess!= person && guess!="i quit"){
//     guess = prompt("try again");

// }

// if(guess == person){
//     console.log("I love youuu");
// }
// else{
//     console.log("you lose");
// }

// to-do app

// let todo = [];
// let request = prompt("Please choose from the following tasks");

// while(1){
//  request = prompt("Please choose from the following tasks");

// if(request == "add"){
//     let task = prompt("Enter your task");
//     todo.push(task);
// }else if(request == "remove"){
//     task = prompt("Enter the task index you wish to remove");
//     todo.splice(task,1)
// }else if(request == "list"){
//     for (tasks of todo) {
//         console.log(tasks);
//     }
// }else if(request == "QUIT"){
//     break;
// }

// }

// console.log("app exited");

const max = prompt("enter the max number you wanna guess between");

const random = Math.floor(Math.random() * max) + 1;

let guess = prompt("guess the number");

while(true) {
    if (guess == "quit") {
        console.log("user quit");
        break;
    }

    if (guess == random) {
        console.log("you are right wowwww such a smart cutieee!!!");
        break;
    } else if(guess < random) {
        guess = prompt("hint: your guess is smol , please try again");
    } else{
        guess = prompt("hint:your guess was too large: try again")
    }
}