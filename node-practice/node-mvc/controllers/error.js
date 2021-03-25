exports.getError=(req,res)=>{
    res.status(404).send({message:"Page not found"})
}
