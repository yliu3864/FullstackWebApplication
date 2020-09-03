import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Review } from './review.model';
@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  selectedReview: Review = {
    
    SongN:'',
    ReviewN:'',
    Rating:'',
    Comment:'',
    Time:'',
  




  };
  constructor(private http: HttpClient) { }
  postReview(review: Review){
    return this.http.post(environment.apiBaseUrl+'/secure/addreviews',review);

  }
  getReview(ss){
    return this.http.get(environment.apiBaseUrl+'/secure/getreviews/'+ss);

  }
}
//create the sever in review with all the url
