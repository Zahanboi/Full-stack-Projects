import express from 'express';
import sum from './sum.js'
const app = express();

app.listen(3008, ()=>{
    console.log("Server is running on port 3008");
})

app.get('/', (req,res)=>{
    res.json({ message: "Hello World" });
});

app.get('/sum/:a/:b', async(req,res) => {
    const {a,b} = req.params; //parseInt bcoz query se string m hoga toh convert it into int
    res.json({ ans: sum(parseInt(a) , parseInt(b)) });
});

app.get('/about', (req,res)=>{
    res.json({ message: "About Us" });
});