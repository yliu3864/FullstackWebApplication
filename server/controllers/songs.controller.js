const mongoose = require('mongoose');
const songs = mongoose.model('songs');

module.exports.addsongs=async(req,res,next)=>{
    // console.log('inside');
    var song = new songs();
    song.Header = req.body.Header;
    song.Title = req.body.Title;
    song.Artist = req.body.Artist;
    song.Album = req.body.Album;
    song.Year = req.body.Year;
    song.Comment = " ";
    song.Reserve = req.body.Reserve;
    song.Track = req.body.Track;
    song.Genre = req.body.Genre;
    song.AvRate = 0;
    song.NumRate = 0;
    song.type="public";
  try{
    song.save();
    res.json(song);
  }catch(err){
      res.json({message:err});
  }
}

module.exports.songsearch=async(req,res,next)=>{
  var acc=new Array();
    var temp=[];
//  console.log('ins');
 var word=req.params.id;
 word = word.replace(/\s/g, "");
var _filter = {
  $and:[{
  $or: [
      { Title: { $regex: word, $options: '$i' } },
      { Artist: { $regex: word, $options: '$i' } },
      { Album: { $regex: word, $options: '$i' } },
      { Year: { $regex: word, $options: '$i' } },
      { Comments: { $regex: word, $options: '$i' } },
      { Reserved: { $regex: word, $options: '$i' } },
      { Track: { $regex: word, $options: '$i' } },
      { Genre: { $regex: word, $options: '$i' } }
  ]
},{type: { $ne: 'hidden' } }]
}

await songs.find(_filter, (err, song) =>{
  // console.log('is')
  
      if (!song)
          return res.status(404).json({ status: false, message: 'song record not found.' });
      else
      for(var i=0;i<song.length;i++){
 
        acc.push(song[i]);
      }
          return res.status(200).send(acc);
  }
)
}


module.exports.songrate=async(req,res,next)=>{
    // console.log('is');
    var arr=new Array();
    var temp=[];
    
    // res.send(MEANStackDB.songs.find().sort({"AvRate":-1}))
   await songs.find({type:{$ne:'hidden'}}).sort({"AvRate":-1}).limit(10).then((song)=>{
      // return res.status(200).send(song);
      // console.log((song[1].Header))
      for(var i=0;i<song.length;i++){
 
        arr.push(song[i]);
      }
      // console.log(arr.length)
        return res.status(200).send(arr);

    })

}
