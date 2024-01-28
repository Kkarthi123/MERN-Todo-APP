const express = require("express")
const router = express.Router();
const todo = require("../models/listModel")


router.route("/getall").get(async (req, res)=>{
    let data = await todo.findOne();
    if(data){
        res.send(data.todo)
    }
    else{
        res.send([])
    }
})


router.route("/create").post(async (req, res)=>{
    let checkData = await todo.find();
    console.log(req.body)
   
    if(checkData.length == 0){
        let data = new todo({
            todo: [req.body.todo]
        });
        await data.save()
        res.send("ok")
    }
    else{
        await todo.updateOne({_id: checkData[0]._id}, {$push: {todo: req.body.todo}})
        res.send("ok")
    }
})


router.route("/delete").post(async (req, res)=>{
    let checkData = await todo.find();
    let deleteItem = await todo.updateOne({_id: checkData[0]._id}, {$pull: {todo: req.body.todo}});
    res.send(deleteItem)
})


router.route("/update").put(async (req, res)=>{
    let checkData = await todo.find();
    let updatedData = await todo.updateOne({_id: checkData[0]._id, todo: req.body.oldItem}, {$set: {"todo.$": req.body.newItem}});
     res.send(updatedData)
})


module.exports = router;