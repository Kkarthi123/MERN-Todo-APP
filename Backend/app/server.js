const express = require("express");
const dotEnv = require("dotenv")
const connectDb = require("./db-config/db")
const todo = require("./models/listModel")
const User = require("./models/userModel")
const cors = require("cors");
const errorHanler = require("./middlewares/errorhandler");
const generateToken = require("./util/generateToken");
const authHandler = require("./middlewares/authHandler");
 

const app = express();
dotEnv.config()
connectDb()
app.use(express.json())
app.use(cors())


const PORT = process.env.PORT || 5000

app.post('/list', authHandler, async (req, res) => {

    const checkData = await todo.find({user: req.user._id});
    console.log(req.user._id, checkData)
   
    if(checkData.length == 0){
        let data = new todo({
            todo: [req.body.todo],
            user: req.user._id
        });
        await data.save()
        res.send("ok")
    }
    else{
        await todo.updateOne({user: req.user._id}, {$push: {todo: req.body.todo}})
        res.send("ok")
    }
    
})

app.get("/getList", authHandler ,async (req, res)=>{
    const data = await todo.find({user: req.user._id});
    if(data.length > 0){
        res.send(data[0].todo)
    }
    else{
        res.send([])
    }
});


app.post("/deleteList", authHandler, async (req, res)=>{
    const deleteItem = await todo.updateOne({user: req.user._id}, {$pull: {todo: req.body.todo}});
    res.send(deleteItem)
});


app.put('/updateItem', authHandler, async(req, res)=>{
    const updatedData = await todo.updateOne({user: req.user._id, todo: req.body.oldItem}, {$set: {"todo.$": req.body.newItem}});
    res.send(updatedData)
})


app.post('/api/user/create',  async(req, res, next)=>{
    const { name, email, password } = req.body;

    const userExist = await User.findOne({email});

    if(userExist){
        res.status(400).json({
            message: "User Already Exist"
        });
    }
    else{
        const userCreate = await User.create({
            name: name,
            email: email,
            password:password
        })

        if(userCreate){
            res.json({
                _id: userCreate._id,
                name: userCreate.name,
                email: userCreate.email,
                token: generateToken(userCreate._id)
            })
        }
    }

})

app.post('/api/user/login', async(req, res)=>{
    let { email, password } = req.body;

    const user = await User.findOne({email});

    
    if(user && await user.checkPassword(password)){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400).json({
            message: "Invalid email or password"
        });
    }

})

app.post('/api/updatepProfile', async(req, res)=>{
    let {email, password} = req.body;

    if(password){
        User.updateOne({email}, {password: password})
    }
    else{
        res.status(400).json({
            message: "provide password"
        })
    }
})


// app.use(errorHanler)


app.listen(PORT, console.log("listening at 5000....."))