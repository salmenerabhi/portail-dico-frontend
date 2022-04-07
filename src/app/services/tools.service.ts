import { Tool } from './../../Models/Tool';
import { FileDB } from './../../Models/FileDB';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {TokenService} from "../Authentification/services/token.service";
import {environment} from '../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  private url='http://localhost:8085/tool';

  constructor(private Token: TokenService,private http :HttpClient) { }


  Save(data: FormData) {
    return this.http.post(this.url,data);
  }
  get(id: string){
    return this.http.get(this.url +'/doc'+ id);
  }
  
  getListTools():Observable<Tool[]>{
    return this.http.get<Tool[]>(this.url)
  }
  }

