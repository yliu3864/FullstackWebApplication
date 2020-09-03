import { Injectable } from '@angular/core';
import { Playlist } from './playlist.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  selectedPlaylist: Playlist = {
    
    userN: "",
    songN: [],
    playlistN: "",
    status: "",
    descript: "",
    playlistTime: "",
  };
//match all the uri,method with sever with paramter
  constructor(private http: HttpClient) { }
  postPlaylist(playlist: Playlist){
    return this.http.post(environment.apiBaseUrl+'/secure/addplaylists',playlist);
  }
  getPlaylist(playlist){
    return this.http.get(environment.apiBaseUrl + '/secure/getplaylist/'+playlist);
  }
  delectSong(playlist: Playlist){
    return this.http.post(environment.apiBaseUrl+'/secure/delectsong',playlist);
  }
  searchPlaylist(playlist){
    return this.http.get(environment.apiBaseUrl + '/secure/searchplaylist/'+playlist);
  }
  changedescript(playlist){
    return this.http.post(environment.apiBaseUrl+'/secure/changedescript',playlist);
  }
  changedetitle(playlist,newName){
    return this.http.post(environment.apiBaseUrl+'/secure/changetitle',{playlistN: playlist, newName: newName});
  }
  
  changedstatus(playlist){
    return this.http.post(environment.apiBaseUrl+'/secure/changedstatus',playlist);
  }
}
