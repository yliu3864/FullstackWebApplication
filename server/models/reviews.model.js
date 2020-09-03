const mongoose = require('mongoose');
var reviewsSchema = new mongoose.Schema({
    SongN:{
        type:String,
        required:true,
        
    },
    ReviewN:{
        type:String,
        required:true,
      
        
    },
    Rating:{
        type:String,
        // required:true,
      
        
    },
    Comment:{
        type:String,
        required:true,
        
        
    },
    Time:{
        type:String,
        required:true,
        
        
    },
});
mongoose.model('reviews', reviewsSchema);