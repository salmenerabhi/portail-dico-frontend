import { nbrMarqueFamilleStats } from './../../models/nbrMarqueFamilleStats';
import { requestfileUsersStat } from './../../models/requestfileUsersStat';
import { StatTarget } from './../../models/StatTarget';
import { Target } from '../../models/RequestFile';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand, RequestFile } from 'src/models/RequestFile';
import { UserEntity } from 'src/models/userEntity';
import { TokenService } from '../Authentification/services/token.service';
import { StatRequestFiles } from 'src/models/StatRequestFiles';

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

  getFileByUser(id: string):Observable<RequestFile[]> {
    return this.http.get<RequestFile[]>(this.url+ '/filebyuser/' + id )
  }

  getFileByTl(id: string):Observable<RequestFile[]> {
    return this.http.get<RequestFile[]>(this.url+ '/filebytl/' + id )
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
  launchScript(requestFile: RequestFile) : Observable<RequestFile>  {
    return this.http.post<RequestFile>(this.url+ '/write' ,  requestFile);
  }
  launchScriptDecoup() {
    return this.http.get(this.url+ '/launchDecoup');
  }
  updateRequest(formData: FormData):Observable<RequestFile>{
    return this.http.put<RequestFile>(this.url+ '/update',formData)
  }

  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.url + '/brand')
  }

  getTargets(): Observable<Target[]> {
    return this.http.get<Target[]>(this.url + '/target')
  }

  addBrand(info:Brand):Observable<Brand>{
    return  this.http.post<Brand>(this.url + '/addbrand',info);
   }

   addTarget(info:Target):Observable<Target>{
    return  this.http.post<Target>(this.url + '/addtarget' ,info);
   }

   deleteBrand(id :number){
    return this.http.delete(this.url+ '/brand/' +id);
  }
  deleteTarget(id :number){
    return this.http.delete(this.url+ '/target/'+id);
  }

  getStatRf() :Observable<StatRequestFiles>{
    return this.http.get<StatRequestFiles>(this.url+'/stat');
  }
  getRfperUser(id :string) :Observable<StatRequestFiles>{
    return this.http.get<StatRequestFiles>(this.url+'/statnbr/'+ id);
  }
  getRejectedperUser(id :string) :Observable<StatRequestFiles>{
    return this.http.get<StatRequestFiles>(this.url+'/statnbr1/'+ id);
  }
  getStattarget(year :number) :Observable<StatTarget[]>{
    return this.http.get<StatTarget[]>(this.url+'/statTarget/'+ year);
  }
  getrejectedUsers() :Observable<requestfileUsersStat[]>{
    return this.http.get<requestfileUsersStat[]>(this.url+'/users/rejected/');
  }
  getfinishedUsers() :Observable<requestfileUsersStat[]>{
    return this.http.get<requestfileUsersStat[]>(this.url+'/users/finished/');
  }
  getStatnbrMarqueFamille() :Observable<nbrMarqueFamilleStats[]>{
    return this.http.get<nbrMarqueFamilleStats[]>(this.url+'/nbrmarquefamille');
  }
  gettreatment() :Observable<requestfileUsersStat[]>{
    return this.http.get<requestfileUsersStat[]>(this.url+'/treatment');
  }
}
