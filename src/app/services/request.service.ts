import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestFile } from 'src/models/RequestFile';
import { UserEntity } from 'src/models/userEntity';
import { TokenService } from '../Authentification/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private url = 'http://localhost:8085/requestfile';

  constructor(private Token: TokenService, private http: HttpClient) { }


  Save(data: FormData) {
    return this.http.post(this.url, data);
  }
  get(id: string): Observable<RequestFile> {
    return this.http.get<RequestFile>(this.url + id);
  }
  getAll(): Observable<RequestFile[]> {
    return this.http.get<RequestFile[]>(this.url + '/state/fr')
  }
  getAllUS(): Observable<RequestFile[]> {
    return this.http.get<RequestFile[]>(this.url + '/state/us')
  }

  getAlll(): Observable<RequestFile[]> {
    return this.http.get<RequestFile[]>(this.url)
  }

  update(requestFile: RequestFile): Observable<RequestFile> {
    return this.http.put<RequestFile>(this.url, requestFile);
  }
  getUserName(id: string) {
    return this.http.get(this.url + '/user' + id);
  }
  download(name:string):Observable<any>{
    return  this.http.get<any>(this.url + '/download/'+name);
  }

  updateRequest(formData: FormData):Observable<RequestFile>{
    return this.http.put<RequestFile>(this.url+ '/update',formData)
  }
}
