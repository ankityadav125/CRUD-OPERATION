const express=require('express')
const app=express()
const path=require('path')
const userDetail=require("./models/user") //userModel


app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))


  app.get("/",(req,res)=>{
    res.render('index')
  });

//Create User Details

app.post("/create",async (req,res)=>{
    let {name,gender,age,email,address,contact}=req.body
    let createdUser=await userDetail.create({
        name:name,
        age:age,
        gender:gender,
        contact:contact,
        email:email,
        address:address,
    })
    res.redirect('/read')
})


//Read User details
app.get('/read', async (req,res)=>{
    let users=await userDetail.find();
    res.render('read',{users})
})

// Update User Details

app.get("/edit/:id", async (req,res)=>{
    let user= await userDetail.findOne({_id: req.params.id})
    res.render('edit',{user})
})


app.post('/edit/:id',async (req,res)=>{
    let {name,gender,age,email,username,address,contact}=req.body;
    let user= await userDetail.findOneAndUpdate(
    { _id :req.params.id},
    {name,gender,age,email,address,contact},
    {new:true}
    )
    res.redirect('/read')
})


// Delete User Details

app.get('/delete/:id', async (req,res)=>{
    let users=await userDetail.findOneAndDelete({_id:req.params.id})
    res.redirect('/read')
})

app.listen(3000);

