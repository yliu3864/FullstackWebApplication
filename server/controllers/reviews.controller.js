const mongoose = require('mongoose');
const reviews = mongoose.model('reviews');
const songs = mongoose.model('songs');
var newn;
var newr;
var temp;
module.exports.addreviews=async (req,res,next)=>{
  // console.log(req.params.id);
 try{
 
  var review = new reviews();
  // var time=new Date();
  // var t=time.getTime();
  var t=Date();
  // console.log(0)
  review.SongN=req.body.SongN;
  review.ReviewN=req.body.ReviewN;
  review.Rating=req.body.Rating;
  review.Comment=req.body.Comment;
  review.Time=t;
  
  
  review.save();
  res.json(review);
  //   songs.findOneAndUpdate({Header:req.params.id},{$set:{Comment:review.Comment}}).then((updatedDoc) => {
  //      this.songs.NumRate +=1;

  //            res.send(
  //         '<html><a href="http://localhost:4200/login">Back</a></html>'
  //     );
  // }
  if(req.body.Rating!=null){
  await songs.findOne({Title:req.body.SongN},(err,song)=>{
      temp=song;
        // console.log(song.Title)
        // console.log(song.NumRate)
        // console.log(parseInt(song.NumRate)+1)
       newn=String(parseInt(song.NumRate)+1);
       newr=String((parseInt(song.AvRate)*parseInt(song.NumRate)+parseInt(review.Rating))/parseInt(newn));
      //  console.log(review.Rating)
      //  console.log(song.AvRate)
       console.log(newr)
     
     
      })

    // console.log(temp)

    await songs.findOneAndUpdate({Title:req.body.SongN},{$set:{Comment:review.Comment,NumRate:newn,AvRate:newr}}).then((updatedDoc) => {
      console.log("ojbk")
      console.log(req.body.SongN)
   
      res.send(songs);
    
     }
     
     
     )
     
    
  }
    
    // await songs.findOneAndUpdate({Title:temp.Title},{$set:{NumRate:newn,AvRate:newr}}).then((updatedDoc) => {
    //     console.log("ok")
      
     
    //     res.send(songs);
      
    //    }
       
       
    //    )


      }catch(error){
      next(error);
    }

  }
    module.exports.getreviews=async (req,res,next)=>{
      // var sample = new reviews();
      var comm=new Array();
      var review = new reviews();
      console.log(req.params.id);
      
      
        reviews.find({SongN:req.params.id},(err,sample)=>{

          if(sample){
          
            for(j=0;j<sample.length;j++){
             
               
               comm.push(sample[j]); 
            
              }
   
             console.log(comm.length)
             return res.status(200).send(comm);
           }
           else{
           return res.status(400).send("no playlist");
         }




        }).sort({Time:-1});
      
          //  console.log(sample.songN.length)
       
        // console.log(req.body.songN)
       
       
    }
    
      


