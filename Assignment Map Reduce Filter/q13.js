let arr=[
 { name: "Rahul", isActive: true },
 { name: "Priya", isActive: false }
];
let arr2=arr.filter((user)=>user.isActive===true)
console.log(arr2);