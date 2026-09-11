let inp =document.querySelector("#write");
let sp=document.querySelector("#sp");
inp.addEventListener("input",(e)=>{
    sp.textContent=`You entered:${e.target.value}`;
})