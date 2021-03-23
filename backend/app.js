const express=require('express')
const cors=require('cors')

const authRouter=require('./routes/auth')
const PORT=process.env.port || 3001

const app=express()

app.use(cors())
app.use(express.json())
app.use('/auth',authRouter)
app.listen(PORT,()=>{
    console.log(`server listening on port ${PORT}`);
})