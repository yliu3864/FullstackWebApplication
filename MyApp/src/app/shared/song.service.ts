import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Song } from './song.model';


@Injectable({
  providedIn: 'root'
})
export class SongService {
  selectedSong: Song = {
    Header: '',
    Title: '',
   Artist: '',
    Album: '',
    Year: '',
   Comment: '',
    Reserve: '',
    Track: '',
    Genre: '',
    AvRate: '',
   NumRate: '',
   type:''
  };

  constructor(private http: HttpClient) { }

  getTop(){
    return this.http.get(environment.apiBaseUrl + '/open/song/rate');
  }
  searchSong(id){
    return this.http.get(environment.apiBaseUrl + '/open/song/search/'+id);
  }
  postSong(song: Song){
    return this.http.post(environment.apiBaseUrl+'/secure/addsongs',song);

  }

}
