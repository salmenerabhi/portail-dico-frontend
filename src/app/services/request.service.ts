import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestFile } from 'src/models/RequestFile';
import { TokenService } from '../Authentification/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private url='http://localhost:8085/requestfile';

  constructor(private Token: TokenService,private http :HttpClient) { }


  Save(data: FormData) {
    return this.http.post(this.url,data);
  }
  get(id: string){
    return this.http.get(this.url +'/doc'+ id);
  }
  getAll():Observable<RequestFile[]>{
    return  this.http.get<RequestFile[]>(this.url)
   }
  }
