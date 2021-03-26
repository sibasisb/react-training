/**
 * Send error on wrong url
 * @param {*} req 
 * @param {*} res 
 */
exports.getError=(req,res)=>{
    res.status(404).send({message:"Page not found"})
}
