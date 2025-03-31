// const person = "";

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

// let arr = [1,2,3,4,5,6,2,3];
// for (i of arr) {
//     if (i == 2) {
//         let j = arr.indexOf(i)
//         arr.splice(j , 1)
//     }
// }

// // console.log(...arr);
// let num = 287152;
// let n = 0 ;
// while(num>1) {
//    let a = Math.floor(num%10);
//     num = num/10;
//     console.log(a , num)
//     n = n + a;
// }

//  console.log(n);

// let a = Math.floor(Math.random()*6) + 1;
// console.log(a)

// const car = {
//     name: "supra",
//     model: "supra",
//     color: "black"
// };

// let arr = [23,2,4,6,8,100,43,54,89];
// let num = 69;
// function max(){

// for (let index = 0; index < arr.length; index++) {
//    if (num<arr[index]) {
//     console.log(arr[index]);
     
//    }
// }

// }

// max();

// let arr = [3 , 4, 5 , 6 ,7 ,8];
// // let k = arr.length();
// let arrayAverage = (arr) =>{
//    let avg =0;
//    for (i of arr) {
//       avg = avg + i;
//    }

//    console.log(avg/arr.length);
   
// }

// arrayAverage(arr);


// let isEven = (a) =>{
//   if (a%2 == 0) {
//    console.log("Even");
   
//   } else {
//    console.log("odd");
//   }
// }

// isEven(9741397);

// const object = {
//    message : 'Hello,World!',
   
//    logMessage() {
//       console.log(this.message);
   
//    }
// };

// setTimeout(object.logMessage, 1000);

// let length = 4;
// function callback() {
//    console.log(this.length);

// }

// const object = {
//    length: 5,
   
//    method(callback) {
//       callback();
//    },
// };

// object.method(callback);



// OOPS:-
// let arr = [1,2,3,4,5,6,7,8,9];
// console.log(Array.prototype);
// console.log(arr.__proto__);

// console.log(arr.__proto__.__proto__);
// console.log(arr.__proto__.__proto__.__proto__); // null as chaining ended


// function Person(name,age){ //constructors
//     this.name = name;
//     this.age = age;
// }

// let p1 = new Person("Zahan" , 20);
// console.log(p1.name);

class Person{
    constructor(name,age){
        this.name = name;
        this.age = age;
    }

    talk(){
        console.log("Hello");
    }

}

let p1 = new Person("Zahan" , 20);
let p2 = new Person("drishti" , 20);
p1.talk();
if(p1.talk === p2.talk){
    console.log("they are same");//because no extra copies are created only one copy is created
}

class Student extends Person{
    constructor(name,age,grade){
        super(name,age);
        this.grade = grade;
    }
    greet(){
        console.log("bless you");
    }

    talk(){
        console.log("Hello by child");
    }
}

let student1 = new Student("Zahan" , 20 , 10);
student1.greet();
student1.talk(); //if two functions have same name then the child class function will be called
console.log(student1.name);
 