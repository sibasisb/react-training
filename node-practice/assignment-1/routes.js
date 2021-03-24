
const handleRequest=(req,res)=>{
    const url=req.url
    if(url==="/" && req.method==="GET"){
        res.setHeader("Content-Type","text/html")
        res.write("<h1>Hello friend</h1>")
        res.write('<form action="/create-user" method="POST">')
        res.write('<input type="text" name="username" /><br/><input type="submit" value="Add"/>')
        res.write("</form>")
        return res.end()
    }

    if(url==="/users" && req.method==="GET"){
        res.setHeader("Content-Type","text/html")
        res.write("<ul><li>User 1</li><li>User 2</li><li>User 3</li></ul>")
        return res.end()
    }

    if(url==="/create-user" && req.method==="POST"){
        const body=[]
        req.on("data",(chunk)=>{
            body.push(chunk)
        })
        req.on("end",()=>{
            const ans=Buffer.concat(body).toString().split("=")[1]
            console.log(ans);
            res.setHeader('Content-Type','text/html')
            res.statusCode=302
            res.setHeader('Location','/')
            res.end()
        })
    }
    
}

module.exports=handleRequest