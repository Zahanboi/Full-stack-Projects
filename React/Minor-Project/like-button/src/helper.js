function generateTic(n) {
    let arr = new Array(n);
        for (let j = 0; j <n ; j++) {
            arr[j] = Math.floor(Math.random() * 10);
            }
            return arr;
           
        }
    

function sum(arr){
   return arr.reduce((acc, item) => acc + item, 0);// returns the sum of the array
}

let stop = () => {
    
    let button = document.querySelector('button');
    button.disabled = true;
    button.style.backgroundColor = 'rgb(104, 94, 94)';
    
}//add  a button to stop the lottery when won and add a restart button to restart the lottery

let start = () => {

    let button = document.querySelector('button');
    button.disabled = false;
    button.style.backgroundColor = '#1a1a1a';
    // let h1 = document.querySelector('h1');
    // h1.innerText = "Generate Another"
}

export {generateTic, sum, stop , start};