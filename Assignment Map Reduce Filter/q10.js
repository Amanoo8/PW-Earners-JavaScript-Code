let arr=[
 { name: "Laptop", inStock: true },
 { name: "Mouse", inStock: false }
];
let arr2=arr.filter((device)=>device.inStock===true)
console.log(arr2);
