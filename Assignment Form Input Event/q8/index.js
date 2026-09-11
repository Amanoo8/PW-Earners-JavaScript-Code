let form=document.querySelector("#form");
let email=document.querySelector("#email");
let error=document.querySelector("#error");
form.addEventListener("submit",(e)=>{
    e.preventDefault();
 
    if(email.value.trim().length==0){
     error.textContent="email cannot be empty"
      return
    }
})
email.addEventListener("focus",(e)=>{
      email.classList.add("newBorder");
})
email.addEventListener("blur",(e)=>{
      email.classList.remove("newBorder");
})


