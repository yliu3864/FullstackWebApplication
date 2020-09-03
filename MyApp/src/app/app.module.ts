// built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
// components
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
//routes
import { appRoutes } from './routes';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserService } from './shared/user.service';
//other
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HomeComponent } from './home/home.component';

import{SocialLoginModule,AuthServiceConfig,GoogleLoginProvider}from 'ng4-social-login';
import { SongsComponent } from './songs/songs.component';
import { TopTenComponent } from './songs/top-ten/top-ten.component';
import { SearchSongComponent } from './songs/search-song/search-song.component';
import { CreateSongComponent } from './songs/create-song/create-song.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { AddplaylistComponent } from './playlist/addplaylist/addplaylist.component';
import { ViewplaylistComponent } from './playlist/viewplaylist/viewplaylist.component';
import { SearchplaylistComponent } from './playlist/searchplaylist/searchplaylist.component';
import { ManagerComponent } from './manager/manager.component';
import { ManageUserComponent } from './manager/manage-user/manage-user.component';
import { ManageSongComponent } from './manager/manage-song/manage-song.component';
const config=new AuthServiceConfig([
{
  id:GoogleLoginProvider.PROVIDER_ID,
  provider: new GoogleLoginProvider('184255595389-jesos6ka9rsjvmlkeatvibtgg59r5bi6.apps.googleusercontent.com'),
},

],false);

export function provideConfig(){
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    UserProfileComponent,
    SignInComponent,
    HomeComponent,
    SongsComponent,
    TopTenComponent,
    SearchSongComponent,
    CreateSongComponent,
    PlaylistComponent,
    AddplaylistComponent,
    ViewplaylistComponent,
    SearchplaylistComponent,
    ManagerComponent,
    ManageUserComponent,
    ManageSongComponent
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [
    {provide:AuthServiceConfig,useFactory :provideConfig},
    {
    provide: HTTP_INTERCEPTORS, 
    useClass: AuthInterceptor,
    multi: true
  },AuthGuard,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
