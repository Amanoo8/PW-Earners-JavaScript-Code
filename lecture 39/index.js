// // let a = document.querySelector("h1");
// // // a.textContent="Meow";
// // console.log(a.textContent);
// // a.setAttribute("style","background-color:pink;")
// // let div = document.createElement("div");
// // div.textContent="Hello";
// // let res =document.querySelector("body");
// // res.appendChild(div);
// // console.log(div);
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
// let productList = document.querySelector("#productList");
// products.forEach((product)=>{
//     let card =document.createElement("p");
//     card.textContent=`${product.name}-${product.price}`;
//     // card.setAttribute("style","background-color:pink;");
//     productList.append(card);
// })
let productList = document.querySelector("#productList");
products.forEach((product)=>{
     let div=document.createElement("div");
     div.classList.add("singleProduct");
     let imgdiv=document.createElement("div");
     let detdiv=document.createElement("div");
     let img=document.createElement("img")
     img.setAttribute("src","https://m.media-amazon.com/images/I/61knPJtYRpL._AC_UY327_FMwebp_QL65_.jpg");
     imgdiv.append(img);
     div.append(imgdiv);
     productList.append(div);
})
