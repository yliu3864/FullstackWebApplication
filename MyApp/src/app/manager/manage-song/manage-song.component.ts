import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import{PlaylistService} from 'src/app/shared/playlist.service';
import{ReviewService} from 'src/app/shared/review.service';
import{UserService} from 'src/app/shared/user.service';
import{Playlist}from'src/app/shared/playlist.model';
import{ManagerService}from'src/app/shared/manager.service';
import { Song } from 'src/app/shared/song.model';
@Component({
  selector: 'app-manage-song',
  templateUrl: './manage-song.component.html',
  styleUrls: ['./manage-song.component.scss']
})
export class ManageSongComponent implements OnInit {
  serverErrorMessages: string;
  showSucessMessage:String;
  log;
  mag;
  us;
  play=new Song;
  playlistDetails;
  addsong;
  newtype;
  allu;
  ca=new Array();
  songDetails;
  public userDetails;

  constructor(private managerService: ManagerService,private router : Router,private reviewService: ReviewService,private userService: UserService) { }

  ngOnInit() {
    this.us=true;
    if(this.userService.isLoggedIn()){
      this.log=true;
    //if not login can't show content in this page
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        // this.play.userN=this.userDetails.email
        console.log(this.userDetails.type)
        if(this.userDetails.type=='manager'){
          this.us=false;
          this.mag=true;
          //if the user is manage, all the content can be shown
        }
      },
      err => { 
        console.log(err);
        
      }
    );
    // this.serverErrorMessages="";
  }
  }


  get(){
//print all the songs and modify    　　　
  this.managerService.getallSong().subscribe(
    res => {
   
      this.songDetails=res;
    
     console.log(this.songDetails);
      
    },
    err => { 
      console.log(err);
      
    }
  );


  }

  change(i){
    //change the type of song by particular song
    // this.addsong=this.songDetails[i]
    
    this.play.Title=this.songDetails[i].Title
    console.log(this.play.Title);
   if(this.songDetails[i].type=="public"){
    this.play.type="hidden";

   }else{
    this.play.type="public"
   }
    
    this.managerService.postSong(this.play).subscribe(
      res => {
     
      //   this.playlistDetails=res;
      
       console.log(this.play.type);
       this.showSucessMessage="change successfully";
        
      },
      err => { 
        console.log(err);
        
      }
    );
  }




}