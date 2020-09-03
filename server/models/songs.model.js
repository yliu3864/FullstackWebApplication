const mongoose = require('mongoose');

var songsSchema = new mongoose.Schema({
    Header:{
        type:String,
        required:true,
        maxlength : [3,'Password must be less than 3 character long'],
        
    },
    Title:{
        type: String,
        required:true,
        maxlength : [30,'Title must be less than 30 character long'],
    },  
    Artist:{
        type:String,
        required:true,
        maxlength : [30,'Artist must be less than 30 character long'],
    },
    Album:{
        type:String,
        required:true,
        maxlength : [30,'Album must be less than  30 character long'],
    },
    Year:{
        type:String,
        required:true,
        maxlength : [4,'Year must be less than  4 character long'],
    },
    Comment:{
        type:String,
        required:true,
        maxlength : [28,'Comment must be less than  28 character long'],
    },
    Reserve:{
        type:String,
        required:true,
      
    },
    Track:{
        type:String,
        required:true,
        
    },
    Genre:{
        type:String,
        required:true,
         
    },
    AvRate:{
        type:String,
        required:true,
        // default:0,
    },
    NumRate:{
        type:String,
        required:true,
        // default:0,
    },
    type:{
        type: String
    }

});
mongoose.model('songs', songsSchema);