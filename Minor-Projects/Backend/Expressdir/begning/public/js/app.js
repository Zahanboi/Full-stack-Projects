
const btns = document.querySelectorAll("button");

for(let btn of btns){
   btn.addEventListener("click" , () => {
      console.log("clicked");
      
      if (btn.innerText === "Message cats") {
          alert("Meow!");
      }else if(btn.innerText === "Message dogs"){
         alert("Woof!");
      } else{
          alert("Request Sent!");  
         }
   });
}