let arr=[
 { name: "Mouse", price: 500, quantity: 2 },
 { name: "Keyboard", price: 1000, quantity: 1 }
];
console.log(arr.reduce((ans,part)=>ans+=part.price*part.quantity,0));