function callhi(){
 console.log("HII Kya Haal Hai");
} 
function calculator(num1,num2,operator){
   switch(operator){
    case "+":
        console.log(`${num1} ${operator} ${num2} :`,num1+num2);
        break;
    case "-":
        console.log(`${num1} ${operator} ${num2} :`,num1-num2);
        break;
    case "*":
        console.log(`${num1} ${operator} ${num2} :`,num1*num2);
        break;
    case "/":
        console.log(`${num1} ${operator} ${num2} :`,num1/num2);
        break;    
   }
}
calculator(2,3,"*")