const fs=require('fs')
const path=require('path')

let products=[]

module.exports=class Product {
    constructor(id,title,description,price,imageUrl,expiryDate){
        this.id=id
        this.title=title
        this.price=price
        this.description=description
        this.imageUrl=imageUrl
        this.expiryDate=expiryDate
    }

    save(){
        if(!this.id){
            let max=-1
            products.forEach(prod=>max=max>Number(prod.id)?max:Number(prod.id))
            let uid=max+1
            this.id=uid.toString()
            products.push(this)
            return true
        }
        const product=products.find(prod=>prod.id===this.id)
        if(!product)
            return false
        const imageUrl=product.imageUrl
        if(this.imageUrl)
            clearFile(imageUrl)
        this.imageUrl=this.imageUrl?this.imageUrl:imageUrl
        products=products.map(prod=>{
            return (prod.id===this.id)?
            {...this}:
            prod
        })
        return true
    }

    static getAll(){
        return products
    }

    static findProductById(productId){
        let product=products.find(prod=>prod.id===productId)
        return product
    }

    static deleteProduct(productId){
        let productDeleted=products.find(prod=>prod.id===productId)
        let newProducts=products.filter(prod=>prod.id!==productId)
        if(newProducts.length===products.length)
            return false
        products=newProducts
        let imageUrl=productDeleted.imageUrl
        clearFile(imageUrl)
        return true
    }

}

const clearFile=filePath=>{
    filePath=path.join(__dirname,'..',filePath)
    fs.unlink(filePath,err=>console.log(err))
}