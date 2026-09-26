document.querySelector("#btn-1").addEventListener("click",(e)=>{
localStorage.setItem("num",18);
})
document.querySelector("#btn1").addEventListener("click",(e)=>{
    localStorage.clear();
})
document.querySelector("#btn-2").addEventListener("click",(e)=>{
sessionStorage.setItem("num",5);
})
document.querySelector("#btn2").addEventListener("click",(e)=>{
    sessionStorage.clear();
})

async function getData(username="Aman008"){
    let response =await fetch(`https://api.github.com/users/${username}`);
    let data= await response.json();
    console.log(data);
}
getData();