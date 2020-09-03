import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.model';
import { Song } from './song.model';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ManagerService {
//create the url to to post the serve with parameters
  constructor(private http: HttpClient) { }
  postUser(playlist: User){
    return this.http.post(environment.apiBaseUrl+'/secure/manager/setType',playlist);
  }
  postSong(playlist: Song){
    return this.http.post(environment.apiBaseUrl+'/secure/manager/setSong',playlist);
  }
  getallUser(){
    return this.http.get(environment.apiBaseUrl + '/secure/manager/getAllusers');
  }
  getallSong(){
    return this.http.get(environment.apiBaseUrl + '/secure/manager/getAllsongs');
  }
}
