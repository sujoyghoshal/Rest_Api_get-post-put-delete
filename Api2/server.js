const express=require('express');
const app=express();
const port=process.env.port||3000;

app.use(express.json());
const student=require('./student');

app.get('/',(req,res)=>{
   res.json({message:"api is working.."});
})
//*using get
app.get('/api/student',(req,res)=>{
    res.json(student)
})
//*using post
app.post('/api/student',(req,res)=>{
    if(!req.body.email){
        res.status(200)
        return res.json({message:"email is required......"});
    }
    const user={
        id:student.length+1,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        gender:req.body.gender,
        ip_address:req.body.ip_address
    }
    student.push(user);
    res.json(user);
}) 
//*Edit Api using put method ....
app.put('/api/student/:id', (req, res) => {
 
    let id = req.params.id;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let email = req.body.email;
    let gender = req.body.gender;
    let ip_address = req.body.ip_address;

    const index = student.findIndex((item) => {
        return item.id === Number.parseInt(id);
    });

    if (index >= 0) {
        const std = student[index];
        std.first_name = first_name;
        std.last_name = last_name;
        std.email = email;
        std.gender = gender;
        std.ip_address = ip_address;

        res.json(std);
    } else {
        res.status(400).send("Student not found");
    }
});

//*delete Api
app.delete('/api/student/:id',(req,res)=>{
    let id=req.params.id;
    const index = student.findIndex((item) => {
        return item.id === Number.parseInt(id);
    });
    if(index>=0){
    let std=student[index];
    student.splice(index,1);
    res.json(std);
    }
    else{
        res.status(400).send("Student not found");
        res.end();
    }
})

app.listen(port,()=>{
    console.log(`Running the port no ${port}`);
})