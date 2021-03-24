const express=require('express')
const app=express()

// app.use((req,res,next)=>{
//     console.log(`Requested url: ${req.url}`);
//     next()
// })

// app.use((req,res,next)=>{
//     console.log(`forwarded here`);
//     res.setHeader('Content-Type','text/html')
//     res.send("<h1>Welcome to the new World Order</h1>")
// })

app.use('/users',(req,res,next)=>{
    res.setHeader('Content-Header','text/html')
    res.send("<h1>Hello Friend</h1><br/><ul><li>User 1</li><li>User 2</li><li>User 3</li></ul>")
})

app.use('/',(req,res,next)=>{
    res.send("<h1>Hello Friend</h1>")
})

app.listen(3002)