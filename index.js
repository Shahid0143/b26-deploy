const express=require("express")



const{connection}=require("./db")

const{ userRouter}=require("./routes/user.routes")

const {noteRouter}=require("./routes/note.routes")

const cors=require("cors")

require("dotenv").config()


const app= express()
app.use(cors())
//middleware////////////////////
app.use(express.json())

app.use("/users",userRouter)

app.use("/notes",noteRouter)



app.listen(process.env.port,async()=>{
    try {
        await connection 
      console.log("connected to DB")
      console.log(`server is running at port ${process.env.port}`)
    } catch (err) {
        console.log(err)
        console.log("Something went wrong!!")
    }
})