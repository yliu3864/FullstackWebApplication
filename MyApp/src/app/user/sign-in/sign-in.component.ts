import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { UserService } from '../../shared/user.service';
import{AuthService,SocialUser,GoogleLoginProvider} from 'ng4-social-login';
import { User } from 'src/app/shared/user.model';
import {AppComponent} from "src/app/app.component";
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private userService: UserService,private router : Router,private socialAuthService:AuthService,public app:AppComponent) { }

  model ={
    email :'',
    password:''
  };
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;
  
  ngOnInit() {
   
    if(this.userService.isLoggedIn())
    this.router.navigateByUrl('/userprofile');
    
  }
  
  onSubmit(form : NgForm){
    this.userService.login(form.value).subscribe(
      res => {
       
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/userprofile');
        // this.app.owner=this.model.email;
        // this.app.logged=true;
        // console.log(this.app.owner);
      },
      err => {
        console.log(err.error.message)
        
          if(err.error.message=="Pleser varify email"){
        
        this.userService.resendemail(form.value.email).subscribe(
          res=>{
            this.serverErrorMessages='not verfied and resend email';
          }
        )}
        this.serverErrorMessages = err.error.message;
      }
    );
  }
  public user: any=SocialUser;
  googlesignup=new User;
  googlesignin=new User;
  

  googlelogin(){
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData)=>{
      this.user=userData;
      this.googlesignup.fullName=this.user.name;
      this.googlesignup.email=this.user.email;
      this.googlesignup.password='1111';
      this.userService.postGoogle(this.googlesignup).subscribe(
        res => {
          // this.userService.setToken(res['token']);
          // this.router.navigateByUrl('/userprofile');
        },
        err => {
          this.serverErrorMessages = err.error.message;
        }
      );
   
      this.googlesignup.email=this.user.email;
      this.googlesignup.password='1111';
    
      this.userService.login(this.googlesignup).subscribe(
        res => {
          this.userService.setToken(res['token']);
          this.router.navigateByUrl('/userprofile');
      
        },
        err => {
          this.serverErrorMessages = err.error.message;
        }
      );
      
      

      
    });
  }

}
