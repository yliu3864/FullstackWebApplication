const mongoose = require('mongoose');
const User = mongoose.model('User');
const songs = mongoose.model('songs');


//all the method should be async to make sure the store and find process done
module.exports.setType=async(req,res,next)=>{
    var email=req.body.email;
    var type=req.body.type;
    await User.findOneAndUpdate({email:email},{$set:{type:type}}).then((updatedDoc) => {
      
      console.log(updatedDoc)
   
      res.send(updatedDoc);
    
     }
     
     
     );
} 


module.exports.setSong=async(req,res,next)=>{
    var Title=req.body.Title;
    var type=req.body.type;
    await songs.findOneAndUpdate({Title:Title},{$set:{type:type}}).then((updatedDoc) => {
      
      console.log(type)
     
   
      res.send(updatedDoc);
    
     }
     
     
     );
} 


module.exports.getAllsongs=async(req,res,next)=>{
   try{
       var all=await songs.find();
   
   if(!all){
    return res.status(404).json({ status: false, message: 'song record not found.' });
   }else{
       var allsong=new Array();
       for(var i=0;i<all.length;i++){
 
        allsong.push(all[i]);
      }
      console.log(allsong.length)
      return res.status(200).send(allsong);
   }
    }catch(err){
        res.json({message:err});
    }
  
}
module.exports.getAllusers=async(req,res,next)=>{
    try{
        var all=await User.find();
    
    if(!all){
     return res.status(404).json({ status: false, message: 'song record not found.' });
    }else{
        var allsong=new Array();
        for(var i=0;i<all.length;i++){
  
         allsong.push(all[i]);
       }
       console.log(allsong.length)
       return res.status(200).send(allsong);
    }
     }catch(err){
         res.json({message:err});
     }
   
 }