const fs=require('fs')
const path=require('path')
const rootDirectory=require('../path/path')

const fullPath=path.join(rootDirectory,"data","products.json")

const getProductsFromFile=cb=>{
    let products=[]
    fs.readFile(fullPath,(err,fileContent)=>{
        if(err){
            cb([])
            return 
        }
        products=JSON.parse(fileContent)
        cb(products)
    })
}

module.exports=class Product {

    constructor(title,id){
        this.title=title
        this.id=id
    }

    save(){
        getProductsFromFile(products=>{
            products.push(this)
            fs.writeFile(fullPath,JSON.stringify(products),(err)=>{
                console.log(err);
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

}