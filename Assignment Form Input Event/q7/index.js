let form=document.querySelector("#form");
let username=document.querySelector("#name");
let error=document.querySelector("#error");
form.addEventListener("submit",(e)=>{
    e.preventDefault();
 
    if(username.value.trim().length==0){
     error.textContent="Name cannot be empty"
      return
    }
})
username.addEventListener("focus",(e)=>{
      username.classList.add("newBorder");
})
username.addEventListener("blur",(e)=>{
      username.classList.remove("newBorder");
})


