const mongoose = require("mongoose")

const listSchema = new mongoose.Schema({
    todo:[{type:String}],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
},{
    timestamps: true
})

const list = mongoose.model("list", listSchema);

module.exports = list;