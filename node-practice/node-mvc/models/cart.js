const fs=require('fs')
const path=require('path')
const rootDirectory=require('../path/path')

const fullPath=path.join(rootDirectory,"data","cart.json")

module.exports=class Cart{

    static addToCart(productId,productPrice){
        fs.readFile(fullPath,(err,fileContent)=>{
            let cart={products:[],totalPrice:0}
            if(!err){
                cart=JSON.parse(fileContent)
            }
            let prodId=cart.products.findIndex(prod=>prod.id===productId)
            let product=cart.products[prodId]
            if(product){
                let qty=cart.products[prodId].qty
                cart.products[prodId]={id:productId,qty:qty+1}
            }
            else
                cart.products.push({id:productId,qty:1})
            cart.totalPrice=cart.totalPrice + +productPrice
            fs.writeFile(fullPath,JSON.stringify(cart),(err)=>{
                console.log(err);
            })
        })

    }

    static getAllFromCart(cb){
        fs.readFile(fullPath,(err,fileContent)=>{
            let cart=[]
            if(!err)
                cart=JSON.parse(fileContent)
            cb(cart)
        })
    }

    static reduceProductCountFromCart(productId,productPrice,deleted){
        fs.readFile(fullPath,(err,fileContent)=>{
            let cart=[]
            if(!err){
                cart=JSON.parse(fileContent)
                let f=1
                let newProducts=cart.products.map(prod=>{
                    if(prod.id===productId){
                        f=0
                        const updatedProduct={
                            ...prod,
                            qty:prod.qty-1
                        }
                        return updatedProduct.qty>0?updatedProduct:null
                    }
                    else
                        return prod
                })
                newProducts=newProducts.filter(newProd=>newProd!==null)
                if(f==1){
                    deleted(false)
                    return
                }
                cart.products=[...newProducts]
                cart.totalPrice=cart.totalPrice - +productPrice
                fs.writeFile(fullPath,JSON.stringify(cart),(error)=>{
                    console.log(error);
                    deleted(true)
                })
            }
        })
    }

    static deleteProductFromCart(productId,productPrice,deleted){
        fs.readFile(fullPath,(err,fileContent)=>{
            let cart=[]
            if(!err){
                cart=JSON.parse(fileContent)
                let prod=cart.products.find(pro=>pro.id===productId)
                let newProducts=cart.products.filter(pro=>pro.id!==productId)
                if(!prod){
                    deleted(false)
                    return
                }
                cart.products=[...newProducts]
                cart.totalPrice=cart.totalPrice - ((+productPrice)*prod.qty)
                fs.writeFile(fullPath,JSON.stringify(cart),(error)=>{
                    console.log(error);
                    deleted(true)
                })
            }
        })
    }

}