const Product=require('../models/product')

exports.addProduct=(req,res,next)=>{
    const uid=Math.random().toString()
    const product=new Product(req.body.title,uid)
    product.save()
    res.status(201).json({message:"Product added"})
}

exports.findProductById=(req,res,next)=>{
    const {productId}=req.params
    Product.findProductById(productId,(product)=>{
        product?
        res.status(200).json({product:product,message:"Product retrieved"}):
        res.status(404).json({message:"Product not found"})
    })
}

exports.getAllProducts=(req,res,next)=>{
    Product.getAll((products)=>{
        res.status(200).json({products:products,message:"Products retrieved"})
    })
}
