let arr=[
 { name: "Laptop", quantity: 1 },
 { name: "Mouse", quantity: 2 }
];
console.log(arr.reduce((ans,device)=>ans+=device.quantity,0));
