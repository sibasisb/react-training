const fs=require('fs')
const path=require('path')
const rootDirectory=require('../path/path')

const fullPath=path.join(rootDirectory,"data","products.json")

const getProductsFromFile=cb=>{
    let products=[]
    fs.readFile(fullPath,(err,fileContent)=>{
        if(err){
            cb([])
        }
        products=JSON.parse(fileContent)
        cb(products)
    })
}

module.exports=class Product {

    constructor(title){
        this.title=title
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

}