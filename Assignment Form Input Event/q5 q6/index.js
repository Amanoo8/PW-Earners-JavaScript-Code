let form=document.querySelector("#form");
let username=document.querySelector("#name");
form.addEventListener("submit",(e)=>{
    e.preventDefault();
 console.log("Form Submitted Succesfully");
})
username.addEventListener("focus",(e)=>{
      username.classList.add("newBorder");
})
username.addEventListener("blur",(e)=>{
      username.classList.remove("newBorder");
})

