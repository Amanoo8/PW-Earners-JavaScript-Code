let btn=document.querySelector("#btn");
function clicked(){
    console.log("Button clicked");
}
btn.addEventListener("click",clicked,{once:true});
