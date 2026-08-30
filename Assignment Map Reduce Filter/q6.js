let arr=[
 { name: "Laptop", price: 50000 },
 { name: "Mouse", price: 500 }
];
let arr2=arr.map((device)=>({
    ...device,
    instock:true
}))
console.log(arr2);
