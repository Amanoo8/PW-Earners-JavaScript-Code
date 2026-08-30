let arr=[
 { amount: 500 },
 { amount: 1000 },
 { amount: 750 }
];
console.log(arr.reduce((ans,am)=>ans+=am.amount,0));