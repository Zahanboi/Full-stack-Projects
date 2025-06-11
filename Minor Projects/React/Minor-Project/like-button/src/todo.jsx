import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Todo() {
    // let [task, setTask] = useState(["Sample task"])
    let [tasks, setTask] = useState([{task: "Sample task" , id: uuidv4()}])//use object to store id and task


    function addinlist(e){
    //    setTask([...task, document.querySelector('input').value])// or use a on change event to update the value passed an array as we are mapping out the array so first map out then add new value 
    setTask([...tasks, {task: document.querySelector('input').value , id: uuidv4()}])//The problem is that you are adding an array inside the task array instead of an object. To fix this, you need to add the new task object directly to the task array.
    let input = document.querySelector('input');// to make empty input field after adding task
    console.log(input);
    input.value = '';
    
    }

    function deleteTask(id){
        setTask(tasks.filter((item) => item.id !== id))
    }

    let UpperCaseAll = () => {
        setTask(tasks.map((item) => {
            return {
                ...item,
                task: item.task.toUpperCase()
            }
        }))
    }

    let UpperCaseOne = (id) => {
        setTask((prevtask) => 
            prevtask.map((item) => {
                if(item.id === id){
                    return {
                        ...item,
                        task: item.task.toUpperCase()
                    }
                }else{
                    return item;
                }
            }
        )
    )
    }
    function strikeText(task){
         return <strike>{task}</strike>
    }
    function markAsDone(id){
        setTask((prevtask) => 
            prevtask.map((item) => {
                if(item.id === id){
                    return {
                        ...item,
                        task: strikeText(item.task)
                    }
                }else{
                    return item;
                }
            }
        )
    )
    }
    function checkinput(){
        let input = document.querySelector('input').value;
        if(input.trim() === ''){
            alert('Please enter a task');
            return;
        }else{
            addinlist();
        }
    }

    return (
        <div>
            <h1>Todo</h1>
            <input 
                type="text" placeholder='Type your task here' onKeyDown={(event) => {// in input there is onchange event
                    if (event.key === 'Enter') {
                        checkinput();
                    }
                }}
            />

            &nbsp;&nbsp;&nbsp;&nbsp;

            <button onClick={addinlist}>Add a task</button>

            <ul>
                {tasks.map((item) => (
                    // <li>{item}</li>//not need to use return if use curly braces
                    <span><li key={item.id}>{item.task}  
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <button onClick={() => deleteTask(item.id) }>Delete</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <button onClick={() => UpperCaseOne(item.id) }>Uppercase</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <button onClick={() => markAsDone(item.id) }>Mark as done</button>
                    </li> <br /></span>  //use key to uniquely identify the element and cannot use map function on object so use item.task 
            )
            )}
            <br /><hr />
            <button onClick={() => UpperCaseAll() }>UppercaseAll</button>
            </ul>
        </div>
    )
}
