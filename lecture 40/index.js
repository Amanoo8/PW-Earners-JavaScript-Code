let btn = document.querySelector("button");
let gift=document.querySelector("#gift");
btn.addEventListener("click",()=>{
    btn.setAttribute("style","background-color:pink;");
    g.classList.remove("gift");
    g.setAttribute("style","display:visible");
})
btn.addEventListener("dblclick",()=>{
    btn.setAttribute("style","background-color:green;");
    g.classList.add("gift");
})
// btn.addEventListener("dblclick",()=>{
//     btn.setAttribute("style","background-color:black;")
// })
let products =[
    {
        name:"iphone",
        price:123432
    },
    {
        name:"iphone",
        price:123432
    },
    {
        name:"iphone",
        price:123432
    },
    {
        name:"iphone",
        price:123432
    },
    {
        name:"iphone",
        price:123432
    }
];
let productList = document.querySelector("#productList");
products.forEach((product)=>{
     let div=document.createElement("div");
     div.classList.add("singleProduct");
     let imgdiv=document.createElement("div");
     let detdiv=document.createElement("div");
     let img=document.createElement("img")
     img.setAttribute("src","https://m.media-amazon.com/images/I/61knPJtYRpL._AC_UY327_FMwebp_QL65_.jpg");
     let btnr=document.createElement("button");
     btnr.textContent="Remove";
     imgdiv.append(img);
     div.append(imgdiv);
     div.append(btnr);
     productList.append(div);
     btnr.addEventListener("click",()=>div.remove());
})