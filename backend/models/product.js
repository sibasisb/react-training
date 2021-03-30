let products=[]

module.exports=class Product {
    constructor(id,title,description,price,imageUrl){
        this.id=id
        this.title=title
        this.description=description
        this.imageUrl=imageUrl
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
        let newProducts=products.filter(prod=>prod.id!==productId)
        if(newProducts.length===products.length)
            return false
        products=newProducts
        return true
    }

}