import { useState } from 'react';

import { generateTic, start} from "./helper";

export default function Lottery({n , winninCond}) {
    let [value, setValue] = useState(generateTic(n));
    let winning = winninCond(value);
    function generate() {
       setValue(generateTic(n));
    }

    
    return (
        <div>
            {winning ? (
                <h1>you won less goooo!! <br /> Generate another</h1>
            ) : (
                <h1>Generate a Lottery</h1>
            )}
            
            <h2>Lottery Ticket = {value}</h2>
            <button onClick={generate}>Get New Ticket</button>
           <br /> <button className='button2' onClick={start}>Restart</button>
        </div>
    )
}
