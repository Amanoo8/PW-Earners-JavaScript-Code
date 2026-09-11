let box=document.querySelector("#box");
let btn=document.querySelector("#btn");
btn.addEventListener("click",(e)=>{
    console.log("Button is clicked");
})
box.addEventListener("click",(e)=>{
    console.log("Div is clicked");
},{capture:true})