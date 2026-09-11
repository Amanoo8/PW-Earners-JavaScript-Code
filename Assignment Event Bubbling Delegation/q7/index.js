let btn=document.querySelector("#btn");
function clicked(){
    console.log("Button clicked");
}
btn.addEventListener("click",clicked)
function removebtnEvent(){
  btn.removeEventListener("click",clicked);
}
removebtnEvent();