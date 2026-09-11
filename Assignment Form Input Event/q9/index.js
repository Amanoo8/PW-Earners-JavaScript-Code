let form=document.querySelector("#form");
let password=document.querySelector("#password");
let error=document.querySelector("#error");
form.addEventListener("submit",(e)=>{
    e.preventDefault();
 
    if(password.value.trim().length<6){
     error.textContent="password has atleast 6 characters"
      return
    }
})
password.addEventListener("focus",(e)=>{
      password.classList.add("newBorder");
})
password.addEventListener("blur",(e)=>{
      password.classList.remove("newBorder");
})


