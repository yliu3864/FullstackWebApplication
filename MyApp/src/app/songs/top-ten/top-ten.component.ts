import { Component, OnInit } from '@angular/core';

import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import{Playlist}from'src/app/shared/playlist.model';
import { UserService } from 'src/app/shared/user.service';
import { SongService } from 'src/app/shared/song.service';
import {AppComponent} from "src/app/app.component";
import { ReviewService } from '../../shared/review.service';
import{Review} from '../../shared/review.model';
import{PlaylistService} from 'src/app/shared/playlist.service';
@Component({
  selector: 'app-top-ten',
  templateUrl: './top-ten.component.html',
  styleUrls: ['./top-ten.component.scss']
})
export class TopTenComponent implements OnInit {
  songDetails;
  userDetails;
  newplay;
  log;
  playlistDetails;
  play=new Playlist;
  show;
  gan;
  viewcom;
  vwReview=new Array;
  detail =new Array;
  review=new Array;
  serverErrorMessages: string;
  showSucessMessage:String;
  addsong;
  constructor(private playlistService: PlaylistService,private songService: SongService,private router : Router,public app:AppComponent,private reviewService: ReviewService,private userService: UserService) { }
  
  ngOnInit() {
    this.songService.getTop().subscribe(
      res => {
     
        this.songDetails=res;
        this.detail.length=this.songDetails.length;
      //  console.log(this.app.owner);
        
      },
      err => { 
        console.log(err);
        
      }
    );
   

    if(this.userService.isLoggedIn()){
      this.log=true;
    
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.play.userN=this.userDetails.email
        console.log(this.userDetails.email)
      
      },
      err => { 
        console.log(err);
        
      }
    );

  }

  }
  
//get all the method in the model and top ten info
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
      this.feed.ReviewN=this.userDetails.email;
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

}
