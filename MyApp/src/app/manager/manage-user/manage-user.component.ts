import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import{PlaylistService} from 'src/app/shared/playlist.service';
import{ReviewService} from 'src/app/shared/review.service';
import{UserService} from 'src/app/shared/user.service';
import{Playlist}from'src/app/shared/playlist.model';
import{ManagerService}from'src/app/shared/manager.service';
import { User } from 'src/app/shared/user.model';
@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
  serverErrorMessages: string;
  showSucessMessage:String;
  log;
  mag;
  us;
  play=new User;
  playlistDetails;
  newtype;
  allu;
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
        }  //if the user is manage, all the content can be shown
      },
      err => { 
        console.log(err);
        
      }
    );
    // this.serverErrorMessages="";
  }
  }


  get(){
    this.showSucessMessage=""; 　　　
  this.managerService.getallUser().subscribe(
    res => {
   
      this.allu=res;
    
     console.log(this.allu);
      
    },
    err => { 
      console.log(err);
      
    }
  );


  }
  mage(i){
    this.play.email=this.allu[i].email;
    this.play.type="manager";
    this.managerService.postUser(this.play).subscribe(
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
  deact(i){
    this.play.email=this.allu[i].email;
    this.play.type="deactivated";
    this.managerService.postUser(this.play).subscribe(
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
  user(i){
    this.play.email=this.allu[i].email;
    this.play.type="user";
    this.managerService.postUser(this.play).subscribe(
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
  // change(i){
  //   this.play.email=this.allu[i].email;
  //   if(document.getElementById('this.rate')["value"]==0){
  //     this.play.type="user";
  //   }else if(document.getElementById('rate')["value"]==1){
  //     this.play.type="deactivated";

  //   }else{
  //     this.play.type="manager";
  //   }
  //   this.managerService.postUser(this.play).subscribe(
  //     res => {
     
  //     //   this.playlistDetails=res;
      
  //     //  console.log(this.playlistDetails);
  //      this.showSucessMessage="change successfully";
        
  //     },
  //     err => { 
  //       console.log(err);
        
  //     }
  //   );
  // }




}