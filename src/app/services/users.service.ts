import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { BaseService } from '../providers/base.service';
import { LogIn } from '../Models/log-in.model';
import { TokenResponse } from '../Models/token.model';
import { User } from '../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService {

  constructor(private http: HttpClient) {
    super();
   }
   confirmUser(id : number,roles : string[]) {
    return this.http.put<any>('users/confirm/'+id,roles);
}
    getUsers() : Observable<User[]>{
      return this.http.get<User[]>('users');
    }
}
