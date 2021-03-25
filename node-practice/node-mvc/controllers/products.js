const Product=require('../models/product')

exports.addProduct=(req,res,next)=>{
    const product=new Product(req.body.title)
    console.log(req.body.title);
    product.save()
    res.status(201).json({message:"Product added"})
}

exports.getAllProducts=(req,res,next)=>{
    Product.getAll((products)=>{
        res.status(200).json({products:products,message:"Products retrieved"})
    })
}
