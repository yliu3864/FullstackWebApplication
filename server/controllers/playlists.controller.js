const mongoose = require('mongoose');
const playlists = mongoose.model('playlists');
Boolean:flag=true;
acc=new Array;

module.exports.addplaylists=async(req,res,next)=>{

    console.log('111');
    var playlist = new playlists();
    
    var t=Date();
    console.log(req.body);
    playlist.userN=req.body.userN;
    playlist.songN=req.body.songN;
    playlist.playlistN=req.body.playlistN;
    playlist.status=req.body.status;
    playlist.descript=req.body.descript;
    playlist.playlistTime=t;
   

  try{
  var sample = await playlists.findOne({playlistN:req.body.playlistN});

  }catch(error){
    next(error);
  }

  if(sample==null){
    await playlist.save((err,doc)=>{
      if(!err){
        res.send(doc);
      }
        else{
          return next(err);
        }
    });
  }else{
    if(sample.userN==req.body.userN){
       acc=sample.songN;
      acc.push(req.body.songN);
     
      await playlists.findOneAndUpdate({playlistN:req.body.playlistN},{$set:{songN:acc}}).then((updatedDoc) => {
        res.send(updatedDoc);

      });

    }else{
      console.log("duplicate")
      res.status(422).send(['Duplicate email adrress found.']);
    }


  }

}

module.exports.getplaylist=async(req,res,next)=>{
  all=new Array();
  try{
    console.log("okde")
    console.log(req.params.id)
    var sample = await playlists.find({userN:req.params.id});
  // console.log(sample)
  }catch(error){
    next(error);
  }
  if(sample){
  for(var i=0;i<sample.length;i++){
 
    all.push(sample[i]);
  }
  console.log(all.length)
  res.send(all);
}else{
  res.send("no playlist");
}

}

module.exports.delectsong=async(req,res,next)=>{
 newsong=new Array;
 var sample = new playlists();
try{
  sample = await playlists.findOne({playlistN:req.body.playlistN, userN:req.body.userN});
  
  console.log(sample.songN.length)
  for(j=0;j<sample.songN.length;j++){
      
    if(sample.songN[j]!=req.body.songN){
      
      newsong.push(sample.songN[j]); 
    }
  }
  console.log(newsong)
await playlists.findOneAndUpdate({playlistN:req.body.playlistN},{$set:{songN:newsong}}).then((updatedDoc) => {
    // console.log(updatedDoc)
    res.send(updatedDoc);


  });

  // console.log(req.body.songN)
  }catch(error){
    next(error);
  }


  //   for(j=0;j<sample.songN.length;j++){
      
  //     if(sample.songN[j]!=req.body.songN){
        
  //       newsong.push(sample.songN[j]); 
  //     }
  //   }
  //   console.log(newsong)
  // await playlists.findOneAndUpdate({playlistN:req.body.playlistN},{$set:{songN:newsong}}).then((updatedDoc) => {
  //     // console.log(updatedDoc)
  //     res.send(updatedDoc);


  //   });

  }



module.exports.searchplaylist=async(req,res,next)=>{
  
  var acc=new Array();
  var temp=[];
//  console.log('ins');
var word=req.params.id;
word = word.replace(/\s/g, "");
var _filter = {
$and:[{
$or: [
    { playlistN: { $regex: word, $options: '$i' } },

   
]
},{status: { $ne: 'private' } }]
}

 playlists.find(_filter, (err, playlist) =>{
  console.log('is')

    if (!playlist)
        return res.status(404).json({ status: false, message: 'song record not found.' });
    else
    for(var i=0;i<playlist.length;i++){

      acc.push(playlist[i]);
    }
        return res.status(200).send(acc);
}
)
}

module.exports.changedescript=async(req,res,next)=>{
  all=new Array();
  try{
    var sample = await playlists.findOne({playlistN:req.body.playlistN});
  
    }catch(error){
      next(error);
    }
  if(sample){
    await playlists.findOneAndUpdate({playlistN:req.body.playlistN},{$set:{descript:req.body.descript}}).then((updatedDoc) => {
      // console.log(updatedDoc)
      res.send(updatedDoc);


    });
}else{
  res.send("no playlist");
}
}
module.exports.changedtitl=async(req,res,next)=>{
  all=new Array();
  try{
    var sample = await playlists.findOneAndUpdate({playlistN:req.body.playlistN},{playlistN:req.body.newName});
  
    }catch(error){
      next(error);
    }
  if(sample){
    await playlists.findOneAndUpdate({playlistN:req.body.playlistN},{$set:{descript:req.body.descript}}).then((updatedDoc) => {
      // console.log(updatedDoc)
      res.send(updatedDoc);


    });
}else{
  res.send("no playlist");
}
}
module.exports.changedstatus=async(req,res,next)=>{
  all=new Array();
  try{
    var sample = await playlists.findOne({playlistN:req.body.playlistN});
  
    }catch(error){
      next(error);
    }
  if(sample){
    await playlists.findOneAndUpdate({playlistN:req.body.playlistN},{$set:{status:req.body.status}}).then((updatedDoc) => {
      // console.log(updatedDoc)
      res.send(updatedDoc);


    });
}else{
  res.send("no playlist");
}
}