import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { SongsComponent } from './songs/songs.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { TopTenComponent } from './songs/top-ten/top-ten.component';
import { SearchSongComponent } from './songs/search-song/search-song.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './auth/auth.guard';
import{CreateSongComponent} from'./songs/create-song/create-song.component';
import{PlaylistComponent} from'./playlist/playlist.component';
import{AddplaylistComponent} from'./playlist/addplaylist/addplaylist.component';
import{ViewplaylistComponent} from'./playlist/viewplaylist/viewplaylist.component';
import{SearchplaylistComponent}from'./playlist/searchplaylist/searchplaylist.component';
import{ManagerComponent}from'./manager/manager.component';
import{ManageSongComponent}from'./manager/manage-song/manage-song.component';
import{ManageUserComponent}from'./manager/manage-user/manage-user.component';
import { from } from 'rxjs';
export const appRoutes: Routes = [
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: 'userprofile', component: UserProfileComponent,canActivate:[AuthGuard]
    },
    {
        path: 'home', component: HomeComponent,
    },
    {
        path: '', redirectTo: '/home', pathMatch: 'full'
    },
    {
        path: 'songs', component: SongsComponent,
    },
    {
        path: 'song/rate', component: SongsComponent,
        children: [{ path: '', component: TopTenComponent }]
    },
    {
        path: 'song/search', component: SongsComponent,
        children: [{ path: '', component: SearchSongComponent }]
    },
    {
        path: 'song/creates', component: SongsComponent,
        children: [{ path: '', component: CreateSongComponent,canActivate:[AuthGuard] }]
    },
    {
        path: 'playlist', component: PlaylistComponent,

    },
    {
        path: 'playlist/addplaylist', component: PlaylistComponent,
        children: [{ path: '', component: AddplaylistComponent }]
    },
    {
        path: 'playlist/viewplaylist', component: PlaylistComponent,
        children: [{ path: '', component: ViewplaylistComponent }]
    },
    {
        path: 'playlist/searchplaylist', component: PlaylistComponent,
        children: [{ path: '', component: SearchplaylistComponent }]
    },
    {
        path: 'manager', component: ManagerComponent,
    },
    {
        path: 'manager/managesong', component: ManagerComponent,
        children: [{ path: '', component: ManageSongComponent }]
    },
    {
        path: 'manager/manageuser', component: ManagerComponent,
        children: [{ path: '', component:ManageUserComponent }]
    },
];