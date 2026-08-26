let products ={
    name :"aman",
   rate() {
     console.log("5Star");
    }
}
// // products.rate()
// let a =[1,2];
// let b=[2,3];
// let c =[...a ,...b]
// console.log(c);
// let arr1 =[1,2,2,3,3,4,5,6];
// arr1.splice(5,0,"aman");
// console.log(arr1);
// let a=arr1.slice(1,5);
// console.log(a);
// console.log(arr1.indexOf(2));
// console.log(arr1.find((value)=>{
//    return value===5;
// }));
// let originalPrices =[1500,500,1000];
// const discountedPrices = originalPrices.map((value)=> value*0.9);
// console.log(discountedPrices);
// let students=[
//   {
//     name:"aman",
//     age:18,
//   },
//   {
//     name:"nishant",
//     age:25,
//   }
// ];
// let upgradedMarks = students.map((student)=>{
//   return {...student,age: student.age+1}
// })
// console.log(upgradedMarks);
// let belowTwenty0 = students.map((student)=>student.age<20);
// let belowTwenty = students.filter((student)=>student.age<20).map((student)=>student.name);
// console.log(belowTwenty0);
// console.log(belowTwenty);
let arr=[1,2,3,4,4,4,7];
console.log(arr.reduce((acummulator,num)=>acummulator+=num,0));
