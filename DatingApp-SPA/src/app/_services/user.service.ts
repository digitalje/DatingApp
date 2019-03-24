import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IUser } from '../_models/iUser';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Authorization': 'Bearer ' + localStorage.getItem('token')
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<IUser[]> {
    // return this.http.get<IUser[]>(this.baseUrl + 'users', httpOptions);
    return this.http.get<IUser[]>(this.baseUrl + 'users');
  }

  getUser(id: number): Observable<IUser> {
    // return this.http.get<IUser>(this.baseUrl + 'users/' + id, httpOptions);
    return this.http.get<IUser>(this.baseUrl + 'users/' + id);
  }

  updateUser(id: number, user: IUser) {
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }

  setMainPhoto(userId: number, id: number) {
    // Post requires that we send something in the body. We wil ladd an empty body => {}
    return this.http.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {});
  }

  deletePhoto(userId: number, id: number) {
    return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + id);
  }
}
