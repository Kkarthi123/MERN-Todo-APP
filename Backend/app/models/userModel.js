const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
   name:{
    type: String,
   },
   password:{
    type: String,
    unique: true
   },
   email:{
    type: String,
    lowercase: true
   }
},{
    timestamps: true
})


userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.checkPassword = async function(enterpassword){
    return await bcrypt.compare(enterpassword, this.password)
}

const User = mongoose.model("user", userSchema);

module.exports = User;