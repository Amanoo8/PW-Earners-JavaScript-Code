let form=document.querySelector("#form");
let username=document.querySelector("#name");
let p=document.querySelector("#p");
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    p.textContent=`You Entered : ${username.value}`
})