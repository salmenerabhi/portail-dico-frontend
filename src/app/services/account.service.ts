import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {TokenService} from "../Authentification/services/token.service";
import {UserEntity} from "../../models/userEntity";
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private loggedIn = new BehaviorSubject<boolean>(this.Token.loggedIn());
  authStatus = this.loggedIn.asObservable();
  private url='http://localhost:8085/user/';

  constructor(private Token: TokenService,private http :HttpClient) { }

  changeAuthStatus(value: boolean) {
    this.loggedIn.next(value);
  }

  get(id: string):Observable<UserEntity>{
    return this.http.get<UserEntity>(`${environment.baseUrl}` + id);
  }
  getUserByEmail(id: string):Observable<UserEntity>{
    return this.http.get<UserEntity>(this.url+id)
  }
  getImages(imageName):Observable<any>{
    return this.http.get<any>(this.url + imageName);
  }
  updateUser(formData: FormData):Observable<UserEntity>{
    return this.http.put<UserEntity>(this.url,formData)
  }
  getAllUsers():Observable<UserEntity[]>{
   return  this.http.get<UserEntity[]>(this.url)
  }
  addUser(formData:FormData):Observable<UserEntity>{
   return  this.http.post<UserEntity>(this.url+'register',formData);
  }
  addUserWithoutImage(user:UserEntity):Observable<UserEntity>{
    return  this.http.post<UserEntity>(this.url+'add',user);
  }
  updateUserWithoutImage(user:UserEntity):Observable<UserEntity>{
    return  this.http.put<UserEntity>(this.url+'update',user);
  }
  deleteUser(id :number){
    return this.http.delete(this.url+id);
  }

resetPassword(id:string,password:string):Observable<any>{
    return this.http.post<any>(this.url+id,password)
}

getAllTL(): Observable<UserEntity[]> {
  return this.http.get<UserEntity[]>(this.url + 'tl')
}
}