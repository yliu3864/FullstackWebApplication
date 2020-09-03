import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SongService } from '../../shared/song.service'
import { ReviewService } from '../../shared/review.service';
import{Review} from '../../shared/review.model';
import{Playlist}from'src/app/shared/playlist.model';
import { UserService } from 'src/app/shared/user.service';
import{PlaylistService} from 'src/app/shared/playlist.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-search-song',
  templateUrl: './search-song.component.html',
  styleUrls: ['./search-song.component.scss']
})
export class SearchSongComponent implements OnInit {
  songDetails;
  newplay;
  log;
  playlistDetails;
  play=new Playlist;
  show;
  userDetails;
  addsong;
  gan;
  viewcom;
  detail =new Array;
  review=new Array;
  serverErrorMessages: string;
  showSucessMessage:String;
  constructor(private router : Router,private playlistService: PlaylistService,private songService: SongService,private reviewService: ReviewService,private userService: UserService) { }

  ngOnInit() {

  }
  searchErrorMessages:String;
  onSubmit(form: NgForm) {
    // console.log(form.value.id)

    this.songService.searchSong(form.value.id).subscribe(
      res => {
        this.songDetails=res;
        if(this.songDetails.length==0){
          this.searchErrorMessages='no song found';
        }else{
        // this.songDetails=res;
        // console.log(res)
        //serach the song by form id
      console.log(this.songDetails)
        this.searchErrorMessages='';
     
        if(this.userService.isLoggedIn()){
          this.log=true;
        
        this.userService.getUserProfile().subscribe(
          res => {
            this.userDetails = res['user'];
           
            this.play.userN=this.userDetails.email
            console.log(this.userDetails.email)
          //get all the email 
          
          },
          err => { 
            console.log(err);
            
          }
        );
    
      }
      }
      },
      err => {
       
        
      }
    );

      


  }
  getdetail(i) {
    if(this.detail[i]==true){
      this.detail[i]=false;
    }else{
      this.detail[i]=true;
    }
    
  }
  addReview(i){
    this.showSucessMessage="";
    if(this.review[i]==true){
      this.review[i]=false;
    }else{
      this.review[i]=true;
    }
  }
  feed=new Review;

  addFeedback(i) {
    // console.log(document.getElementById('com')["value"]);
  
    if(document.getElementById('com')["value"]==""){
      this.serverErrorMessages = "Pls write some comment";
      return false;
      
    }else{  
      // console.log(document.getElementById('rate')["value"]);
      this.feed.Comment=document.getElementById('com')["value"];
      this.feed.Rating=document.getElementById('rate')["value"];
      this.feed.ReviewN='1';
      this.feed.SongN=this.songDetails[i].Title;
      this.reviewService.postReview(this.feed).subscribe(
      res => {
        this.showSucessMessage="feedback successfully";
      },
      err => {
        console.log(err);
      }
    );
   }
}

addplay(i){
  this.show=true;
   this.addsong=this.songDetails[i].Title;
 console.log(this.addsong);
 this.playlistService.getPlaylist(this.play.userN).subscribe(
   res => {
  
     this.playlistDetails=res;
   

     
   },
   err => { 
     console.log(err);
     
   }
 );
}

addtoplay(j){
 console.log(this.addsong);
 console.log(this.playlistDetails[j].playlistN);
 console.log(this.play.userN)
 this.play.playlistN=this.playlistDetails[j].playlistN;
 this.play.songN=this.addsong;
 this.playlistService.postPlaylist(this.play).subscribe(
   res => {
    
    this.newplay=res
    this.showSucessMessage="Add success";
    console.log(this.newplay.songN);
   
   },
   err => { 
    if(err.status === 422){
     this.serverErrorMessages = err.error.join('<br/>');
    }
     
   }
 )
}


getcomm(i){
  this.showSucessMessage="";
  this.gan=true;
var ss=this.songDetails[i].Title;
console.log(ss);
this.reviewService.getReview(ss).subscribe(
  res => {
    
    this.viewcom=res;
    console.log(this.viewcom);
  
    this.showSucessMessage="feedback successfully";
  },
  err => {
    console.log(err);
  }
);

}

createlist(){
  this.router.navigateByUrl('playlist/addplaylist');
}

}
