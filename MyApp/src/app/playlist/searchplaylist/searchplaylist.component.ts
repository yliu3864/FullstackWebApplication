import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import{PlaylistService} from 'src/app/shared/playlist.service';
import{ReviewService} from 'src/app/shared/review.service';
import{UserService} from 'src/app/shared/user.service';
import{Playlist}from'src/app/shared/playlist.model';

@Component({
  selector: 'app-searchplaylist',
  templateUrl: './searchplaylist.component.html',
  styleUrls: ['./searchplaylist.component.scss']
})
export class SearchplaylistComponent implements OnInit {
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
  //search the playlist by input value and get from sever
  Search(){
    if(document.getElementById('com')["value"]==""){
      this.serverErrorMessages="empty name";
      return false;
    }
    // this.play.playlistN=document.getElementById('com')["value"];
    console.log(document.getElementById('com')["value"])
    this.playlistService.searchPlaylist(document.getElementById('com')["value"]).subscribe(
      res => {
        this.playlistDetails=res;
        if(this.playlistDetails.length==0){
          this.serverErrorMessages="not found";
        }else{
        //show the success message when u success found
       this.showSucessMessage="Add success";
       this.serverErrorMessages="";
       console.log(this.newplay);
      }
      },
      err => { 
        this.serverErrorMessages="not found";
        
      }
    )



  }
}
