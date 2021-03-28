const fs=require('fs')
const path=require('path')
const rootDirectory=require('../path/path')
const Cart = require('./cart')

const fullPath=path.join(rootDirectory,"data","products.json")

const getProductsFromFile=prod=>{
    let products=[]
    fs.readFile(fullPath,(err,fileContent)=>{
        if(err){
            prod([])
            return 
        }
        products=JSON.parse(fileContent)
        prod(products)
    })
}

module.exports=class Product {

    constructor(title,id,price){
        this.title=title
        this.id=id
        this.price=price
    }

    save(productAdded){
        getProductsFromFile(products=>{
            if(!this.id){
                this.id=Math.random().toString()
                products.push(this)
            }
            else
                products=products.map(prod=>{
                    return prod.id===this.id?this:prod
                })
            fs.writeFile(fullPath,JSON.stringify(products),(err)=>{
                if(!err){
                    productAdded(true)
                    return 
                }
                console.log(err);
                productAdded(false)
            })
        })
    }

    static getAll(cb){
        getProductsFromFile(cb)
    }

    static findProductById(productId,cb){
        getProductsFromFile((products)=>{
            const product=products.find(p=>p.id===productId)
            cb(product)
        })
    }

    static deleteProduct(id,result){
        getProductsFromFile((products)=>{
            let prod=products.find(pro=>pro.id===id)
            let newProducts=products.filter(prod=>prod.id!==id)
            if(newProducts.length===products.length){
                result(false)
                return
            }
            products=[...newProducts]
            fs.writeFile(fullPath,JSON.stringify(products),(err)=>{
                console.log(err);
                console.log(prod);
                Cart.deleteProductFromCart(id,prod.price,(deleted)=>{
                    deleted?result(true):result(false)
                })
            })
        })
    }

}