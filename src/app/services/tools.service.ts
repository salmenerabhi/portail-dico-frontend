import { FileDB } from './../../Models/FileDB';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {TokenService} from "../Authentification/services/token.service";


@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  private loggedIn = new BehaviorSubject<boolean>(this.Token.loggedIn());
  authStatus = this.loggedIn.asObservable();
  private url='http://localhost:8085/user/';
  constructor(private Token: TokenService,private http :HttpClient) { }


  store(formData:FormData):Observable<FileDB>{
   
      return  this.http.post<FileDB>(this.url+'register',formData);
     }
  }

