const form=document.querySelector("#form");
const username=document.querySelector("#username");
const email=document.querySelector("#email");
const password=document.querySelector("#password");
const btn=document.querySelector("#btn");
const passHint=document.querySelector("#passHint");
const remaining=document.querySelector("#remaining");
const bio=document.querySelector("#bio");
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    // console.log("hii");
    if(username.value.trim().length==0){
        console.log("Please Enter Username");
        alert("Please enter name")
        return;
    }
    if(username.value.trim().length<3){
        alert("Name should have atleast three characters")
    }
})
password.addEventListener("focus",(e)=>{
    passHint.classList.remove("hidden");
})
password.addEventListener("blur",(e)=>{
    passHint.classList.add("hidden");
})
let limit=200;
bio.addEventListener("input",(e)=>{
    let r=limit-bio.value.length;
    remaining.textContent=`${r} Characters Remaining`
})