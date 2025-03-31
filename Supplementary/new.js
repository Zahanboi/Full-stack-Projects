// let url = "http://universities.hipolabs.com/search?name=";

// let btn = document.querySelector("button");

// btn.addEventListener("click" , async () => {
//     let country = document.querySelector("input").value;
//     let Colleges = await getClgs(country);
//     Showname(Colleges)
// })

// function Showname(Colleges){
//     let list = document.querySelector("#result");
//     list.innerText = "";
//     for (College of Colleges) {
//        let name = College.name;

//        let li = document.createElement("li");
//        li.innerText = name;
//        list.append(li);
//     }
   
// }

// async function getClgs(country){ 
// try {
//     let res = await axios.get(url + country);
//     console.log(res);
    
//     return res.data;
// } catch (error) {
//     console.log("Error is", error);
// } 
// }

let url = "http://universities.hipolabs.com/search?name=";

let btn = document.querySelector("button");

btn.addEventListener("click" , async () => {
    let state1 = document.querySelector("input").value;
    let states = await getClgs();
    Showname(states, state1);
})

function Showname(states ,state1){
    let list = document.querySelector("#result");
    list.innerText = "";
    for (state of states) {
        if (state["state-province"] === state1) { //Always use bracket notation for property names with special characters like '-' as in dot notation in js state-povince is taken as state subtract province
            
       let li = document.createElement("li");
       li.innerText = state.name;
       list.append(li);
        }
     
    }
   
}

async function getClgs(){ 
try {
    let res = await axios.get(url + "india");
    console.log(res);
    return res.data;
} catch (error) {
    console.log("Error is", error);
    return [];
} 
}

