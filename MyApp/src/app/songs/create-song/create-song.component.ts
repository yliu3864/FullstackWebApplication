import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SongService } from '../../shared/song.service'
import { UserService } from 'src/app/shared/user.service';
import{ReviewService} from 'src/app/shared/review.service';
import{Review} from '../../shared/review.model';
@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.scss']
})
export class CreateSongComponent implements OnInit {
  log;
  userDetails;
  serverErrorMessages: string;
  showSucessMessage:String;
  feed=new Review;
  constructor(private reviewService: ReviewService,private songService: SongService,private userService: UserService) { }

  ngOnInit() {
    if(this.userService.isLoggedIn()){
      this.log=true;
    //if not log in, can't create song 
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
       
        console.log(this.userDetails.email)
      
      },
      err => { 
        console.log(err);
        
      }
    );

  }
  }

  onSubmit(form: NgForm) {
    if(form.value.Title==""){
     
      this.serverErrorMessages="empty title input"
      return false;
    }
    if(form.value.Artist==""){
      this.serverErrorMessages="empty Artist input"
      return false;
    }
    this.songService.postSong(form.value).subscribe(
      res => {
        this.showSucessMessage="add successfully";
        console.log('yes')
      },
      err => {
       
      }
    );
    if(form.value.Comment!=""){
      this.feed.SongN=form.value.Title;
      this.feed.ReviewN= this.userDetails.email;
      this.feed.Comment=form.value.Comment;
      this.reviewService.postReview(this.feed).subscribe(
        res => {
      
          console.log('yes')
        },
        err => {
         
        }
      );
    }
}
}
//create the song method to create a new song