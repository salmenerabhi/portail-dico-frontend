import { Notification } from '../../models/Notification';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private url='http://localhost:8085/notifications/';
  constructor(private http :HttpClient) { }


  addNotifs(info:Notification):Observable<Notification>{
    return  this.http.post<Notification>(this.url+ 'addNotif',info);
   }

   getListNotifs():Observable<Notification[]>{
    return this.http.get<Notification[]>(this.url)

  }
}
