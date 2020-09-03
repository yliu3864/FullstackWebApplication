const mongoose = require('mongoose');
var playlistsSchema = new mongoose.Schema({
    userN:{
        type:String,
        required:true,
        
    },
    playlistN:{
        type:String,
        required:true,
        
    },
    songN:{
        type: Array,
        // required:true,
        
    },
    status:{
        type:String,
        required:true,
        
    },
    descript:{
        type:String,
        // required:true,
        
    },
    playlistTime:{
        type:String,
        required:true,
    },

})
mongoose.model('playlists', playlistsSchema);