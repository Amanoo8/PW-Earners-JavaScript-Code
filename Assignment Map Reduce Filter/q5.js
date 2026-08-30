let arr=[
 { name: "Rahul", role: "student" },
 { name: "Priya", role: "student" }
]
let arr2=arr.map(student=>({
    ...student,
    role:"developer"}))
console.log(arr2);