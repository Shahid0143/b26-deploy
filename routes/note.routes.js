const express= require("express")

const{NoteModel}=require("../models/note.model")

const{auth}=require("../middlewares/auth.middleware")

const noteRouter=express.Router()
 noteRouter.use(auth)


noteRouter.post("/create",async(req,res)=>{
    //logic
    try{
      const note=new NoteModel(req.body)
      await note.save()
      res.json({msg:"New note has been added",note:req.body})
    }catch(err){
      res.json({error:err.message})
    }

})

noteRouter.get("/",async(req,res)=>{
    //logic
    try{
    const notes=await NoteModel.find({userID:req.body.userID})
    res.send(notes)
    }catch{
       res.json({error:err.message})
    }
})

noteRouter.patch("/update/:noteID",async(req,res)=>{
    //logic
    //userID in the user doc === userID in the note doc
    const userIDinuserDoc=req.body.userID
     const {noteID}=req.params
     try{
    const note=await NoteModel.find({_id:noteID})
    const userIDinNoteDoc = note.userID 
    if(userIDinuserDoc===userIDinNoteDoc){
        //update
        await NoteModel.findByIdAndUpdate({_id:noteID},req.body)
        res.json({msg:`${note.title} has been updated`})
    }
    else{
       res.json({msg:"Not Authorized!"})
    }
}catch(err){
    res.json({error:err})
}
   
})

noteRouter.delete("/delete/:noteID",async(req,res)=>{
    //logic
       const userIDinuserDoc=req.body.userID
     const {noteID}=req.params
     try{
    const note=await NoteModel.find({_id:noteID})
    const userIDinNoteDoc = note.userID 
    if(userIDinuserDoc===userIDinNoteDoc){
        //update
        await NoteModel.findByIdAndDelete({_id:noteID})
        res.json({msg:`${note.title} has been updated`})
    }
    else{
       res.json({msg:"Not Authorized!"})
    }
}catch(err){
    res.json({error:err})
}
})

module.exports={
    noteRouter
}