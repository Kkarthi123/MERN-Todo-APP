const express = require("express")
const router = express.Router();

router.route("/create").post(function(req, res){
    res.send("create")
})

router.route("/login").post(function(req, res){
    res.send("login")
})

module.exports = router;