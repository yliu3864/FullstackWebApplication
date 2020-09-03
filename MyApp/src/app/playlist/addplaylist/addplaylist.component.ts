import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import{PlaylistService} from 'src/app/shared/playlist.service';
import{ReviewService} from 'src/app/shared/review.service';
import{UserService} from 'src/app/shared/user.service';
import{Playlist}from'src/app/shared/playlist.model';
@Component({
  selector: 'app-addplaylist',
  templateUrl: './addplaylist.component.html',
  styleUrls: ['./addplaylist.component.scss']
})
export class AddplaylistComponent implements OnInit {
  serverErrorMessages: string;
  showSucessMessage:String;
  log;
  st;
  play=new Playlist;
  playlistDetails;
  newplay
  songDetails;
  public userDetails;
  constructor(private playlistService: PlaylistService,private router : Router,private reviewService: ReviewService,private userService: UserService) { }

  ngOnInit() {
    if(this.userService.isLoggedIn()){
      this.log=true;
    //if no user logged in, can;t show  the page
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.play.userN=this.userDetails.email
        console.log(this.play.userN)
      
      },
      err => { 
        console.log(err);
        
      }
    );
    // this.serverErrorMessages="";
  }
  }
  Create(){
    if(document.getElementById('com')["value"]==""){
      this.serverErrorMessages="empty name";
      return false;
    }
    this.play.playlistN=document.getElementById('com')["value"];
    this.play.descript=document.getElementById('des')["value"];
    if(document.getElementById('rate')["value"]==0){
      this.play.status="private";
    }else{
      this.play.status="public";
    }
    
//creat a new playlist by user input value in different attibube
    this.playlistService.postPlaylist(this.play).subscribe(
      res => {
     
       this.newplay=res
       this.showSucessMessage="Add success";
       this.serverErrorMessages="";
       console.log(this.newplay.songN);
        //post the created info om playlist and sent to sever 
      },
      err => { 
        this.serverErrorMessages="duplicate playlistname";
        
      }
    )




  }


  

}
