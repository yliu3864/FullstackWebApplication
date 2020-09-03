import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import{Playlist}from'src/app/shared/playlist.model';
import{PlaylistService} from 'src/app/shared/playlist.service';
import{ReviewService} from 'src/app/shared/review.service';
import{UserService} from 'src/app/shared/user.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-viewplaylist',
  templateUrl: './viewplaylist.component.html',
  styleUrls: ['./viewplaylist.component.scss']
})
export class ViewplaylistComponent implements OnInit {
  serverErrorMessages: string;
  showSucessMessage:String;
  log;
  show;
  temp;
  playlistDetails;
  songDetails;
  Playlist;
  des;
  tit;
  public userDetails;
  play=new Playlist;
  newName;
  constructor(private playlistService: PlaylistService,private router : Router,private reviewService: ReviewService,private userService: UserService) { }
  
  ngOnInit() {
    
    // if(this.userService.isLoggedIn()){
    //   this.log=true;
    
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.play.userN=this.userDetails.email
        console.log(this.userDetails.email)
        console.log(this.play.userN)
      },
      err => { 
        console.log(err);
        
      }
    );
  　}


   get(){
    　　　console.log(this.play.userN);
  this.playlistService.getPlaylist(this.play.userN).subscribe(
    res => {
   
      this.playlistDetails=res;
    
     console.log(this.playlistDetails);
      
    },
    err => { 
      console.log(err);
      
    }
  );


  }
  changest(i){
    
    this.play.playlistN=this.playlistDetails[i].playlistN;
    if(this.play.status=="private"){

      this.play.status="public";
    }else{
      this.play.status="private";
    }
    console.log(this.play.status)
    this.playlistService.changedstatus(this.play).subscribe(
      res => {
       //if no user logged in, can;t show  the page
      //   this.playlistDetails=res;
      
      //  console.log(this.playlistDetails);
       this.showSucessMessage="change successfully";
        
      },
      err => { 
        console.log(err);
        
      }
    );
  }
  
  delectsong(i){
    this.show=true;

    // console.log(this.playlistDetails[i]);
    this.play.playlistN=this.playlistDetails[i].playlistN;
    this.temp=this.playlistDetails[i].songN;
     console.log(this.temp.length);
    console.log(this.temp);
  }
  delecttoplay(j){
    // console.log(this.temp[j]);
    // console.log(this.play.userN);
    // console.log(this.play.playlistN);
    this.play.songN=this.temp[j];
    this.playlistService.delectSong(this.play).subscribe(
      res => {
       //if no user logged in, can;t show  the page
      //   this.playlistDetails=res;
      
      //  console.log(this.playlistDetails);
       this.showSucessMessage="change successfully";
        
      },
      err => { 
        console.log(err);
        
      }
    );
  }
  //change the descript when u input the des and click the sumbit
  changedescript(i){
    this.des=true;
  
    this.play.playlistN=this.playlistDetails[i].playlistN;

    
  }

  changetitle(i){
    this.tit=true;
  
    this.play.playlistN=this.playlistDetails[i].playlistN;

  }
  
  changedes(){
    console.log(document.getElementById('com')["value"])
    if(document.getElementById('com')["value"]==""){
      this.serverErrorMessages="empty name";
      return false;
    }
    this.play.descript=document.getElementById('com')["value"];
    this.playlistService.changedescript(this.play).subscribe(
      res => {
     
      //   this.playlistDetails=res;
      
      //  console.log(this.playlistDetails);
       this.showSucessMessage="change successfully";
        
      },
      err => { 
        console.log(err);
        
      }
    );
  }

  changetit(){
    console.log(document.getElementById('tt')["value"])
    if(document.getElementById('tt')["value"]==""){
      this.serverErrorMessages="empty name";
      return false;
    }

    this.newName=document.getElementById('tt')["value"];
    this.playlistService.changedetitle(this.play.playlistN, this.newName).subscribe(
      res => {
     
      //   this.playlistDetails=res;
      
      //  console.log(this.playlistDetails);
       this.showSucessMessage="change successfully";
        
      },
      err => { 
        console.log(err);
        
      }
    );
  }

}


