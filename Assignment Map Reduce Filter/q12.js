let arr=[
 { name: "Mouse", price: 500 },
 { name: "Keyboard", price: 1500 }
];
let arr2=arr.filter((part)=>part.price>1000);
console.log(arr2);