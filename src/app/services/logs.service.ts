import { Observable } from 'rxjs';
import { Logs } from './../../models/log';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  private url = 'http://localhost:8085/logs';

  constructor(private http: HttpClient) { }

  Save(data: FormData) {
    return this.http.post(this.url, data);
  }
  get(id: string): Observable<Logs> {
    return this.http.get<Logs>(this.url  + id);
  }
  getContent(): Observable<Logs[]> {
    return this.http.get<Logs[]>(this.url +'/doc/error' );
  }
  getAll(): Observable<Logs[]> {
    return this.http.get<Logs[]>(this.url)
  }
}
