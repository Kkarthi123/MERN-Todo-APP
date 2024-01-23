const errorHanler = (err,req,res,next)=>{
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        messsage: err.messsage
    })
}

module.exports = errorHanler;