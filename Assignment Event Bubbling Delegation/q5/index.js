let div=document.querySelector("#div");
div.addEventListener("mousemove",(e)=>{
    let x=e.clientX;
    let y=e.clientY;
    console.log(`${x},${y}`);
})