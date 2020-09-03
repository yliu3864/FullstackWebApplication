import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userDetails;
  showSucessMessage;
  nb;
  constructor(private userService: UserService, private router: Router,private app:AppComponent ) { }
  
  
  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.app.logged=true;
        if(this.userDetails.type=="manager")
        {
          this.nb=true;
          this.showSucessMessage="YOU ARE MANAGE WITH SUPREMED POWER";
        }
        //this.app.owner=this.userDetails.email;
        console.log(this.app.owner)
      
      },
      err => { 
        console.log(err);
        
      }
    );
  }

  onLogout(){
    this.userService.deleteToken();
    this.app.owner=this.userDetails.email;
    console.log(this.app.owner)
    this.router.navigate(['/login']);
    
  }

}
