let lang=document.querySelector("#lang");
let p=document.querySelector("#p");
lang.addEventListener("change",(e)=>{
      p.textContent=`${e.target.value} is selected`
})