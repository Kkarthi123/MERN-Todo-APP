const express = require("express");
const dotEnv = require("dotenv")
const connectDb = require("./db-config/db")
const todo = require("./models/listModel")
const User = require("./models/userModel")
const cors = require("cors");
const errorHanler = require("./middlewares/errorhandler");
const generateToken = require("./util/generateToken");
const authHandler = require("./middlewares/authHandler");
const path = require("path");
 

const app = express();
dotEnv.config()
connectDb()
app.use(express.json())
app.use(cors())


const PORT = process.env.PORT || 5000


// new todo creation api
app.post('/list', authHandler, async (req, res) => {

    const checkData = await todo.find({user: req.user._id});
   
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

// get all todo 
app.get("/getList", authHandler ,async (req, res)=>{
    const data = await todo.find({user: req.user._id});
    if(data.length > 0){
        res.send(data[0].todo)
    }
    else{
        res.send([])
    }
});

// delete todo
app.post("/deleteList", authHandler, async (req, res)=>{
    const deleteItem = await todo.updateOne({user: req.user._id}, {$pull: {todo: req.body.todo}});
    res.send(deleteItem)
});

// update todo
app.put('/updateItem', authHandler, async(req, res)=>{
    const updatedData = await todo.updateOne({user: req.user._id, todo: req.body.oldItem}, {$set: {"todo.$": req.body.newItem}});
    res.send(updatedData)
})

// register user
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

// login api
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

// profile update api
app.post('/api/updatepProfile', authHandler, async(req, res)=>{
    let {name, email, password} = req.body;

    const user =await User.findById(req.user._id)
    console.log(user,'userFound');

    if(user){
        user.name = name;
        user.email = email;
        if(password){
            user.password = password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            token: generateToken(updatedUser._id)
        })
    }
    else{
        res.status(400).json({
            message: "Not abel to update profile"
        });
    }

    
    
})


// --------------------------deployment------------------------------

const __dirname1 = path.resolve();
console.log(__dirname1)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/Frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "Frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------


// app.use(errorHanler)


app.listen(PORT, console.log("listening at 5000....."))