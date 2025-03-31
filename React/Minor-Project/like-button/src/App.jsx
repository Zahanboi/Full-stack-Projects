import './App.css'
import Likebutton from "./likecount.jsx"
import Todo from "./todo.jsx"
import Lottery from './lottery.jsx'
import { sum } from "./helper";
import { stop } from "./helper";

function App() {

  function determine(arr){// use arr.reduce to calculate the sum of the digits paas each digit as an array element

    if(sum(arr) === 15){// passing function as a prop to the child component here function is determined in the parent component and passed as a prop to the child component similarly even n variable value is defined here and passed as prop by child
      stop(); // call it here only because it is a function that is defined in helper.js if try to call it in lottery then doomed
        return true
    }else{
        return false;
    }
  }
  return (
    <> 
      <Lottery n={3} winninCond={determine}/>
      <Todo/>
    </>
  )
}

export default App
