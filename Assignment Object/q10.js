let student={
    name:"rahul",
    rollno:5,
    email:"sherawataman46@gmail.com"
}
student.age=18;
Object.entries(student).forEach(([key,value])=>{
   console.log(`${key}:${value}`);
})