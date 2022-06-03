import { calendarEvents } from './../../models/calendarEvents';
import { NbrRejectedRCDateStats } from './../../models/NbrRejectedRCDateStats';
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
import { nbrMarqueSiteStats } from 'src/models/nbrMarqueSiteStats';

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

  getStatnbrMarqueSite() :Observable<nbrMarqueSiteStats[]>{
    return this.http.get<nbrMarqueSiteStats[]>(this.url+'/nbrmarquesite');
  }
  getStatnbrMarqueSiteweek() :Observable<nbrMarqueSiteStats[]>{
    return this.http.get<nbrMarqueSiteStats[]>(this.url+'/nbrmarquesiteweek');
  }
  getStatnbrMarqueSitemonth() :Observable<nbrMarqueSiteStats[]>{
    return this.http.get<nbrMarqueSiteStats[]>(this.url+'/nbrmarquesitemonth');
  }
  getStatnbrMarqueSiteyear() :Observable<nbrMarqueSiteStats[]>{
    return this.http.get<nbrMarqueSiteStats[]>(this.url+'/nbrmarquesiteyear');
  }
  getStatnbrMarqueSitecible() :Observable<nbrMarqueSiteStats[]>{
    return this.http.get<nbrMarqueSiteStats[]>(this.url+'/nbrmarquesitecible');
  }
  getStatnbrRejectedRCday() :Observable<NbrRejectedRCDateStats[]>{
    return this.http.get<NbrRejectedRCDateStats[]>(this.url+'/nbrrejectedrcday');
  } 
  getStatnbrRejectedRCweek() :Observable<NbrRejectedRCDateStats[]>{
    return this.http.get<NbrRejectedRCDateStats[]>(this.url+'/nbrrejectedrcweek');
  }
  getStatnbrRejectedRCmonth() :Observable<NbrRejectedRCDateStats[]>{
    return this.http.get<NbrRejectedRCDateStats[]>(this.url+'/nbrrejectedrcmonth');
  }
  getStatnbrRejectedRCyear() :Observable<NbrRejectedRCDateStats[]>{
    return this.http.get<NbrRejectedRCDateStats[]>(this.url+'/nbrrejectedrcyear');
  }
  getStatnbrRejectedRCcible() :Observable<NbrRejectedRCDateStats[]>{
    return this.http.get<NbrRejectedRCDateStats[]>(this.url+'/nbrrejectedrccible');
  }
  getStatnbrMarque() :Observable<requestfileUsersStat[]>{
    return this.http.get<requestfileUsersStat[]>(this.url+'/nbrbymarque');
  }
  getStatnbrRejectedMarque() :Observable<requestfileUsersStat[]>{
    return this.http.get<requestfileUsersStat[]>(this.url+'/nbrrejectedbymarque');
  }
  gettreatment() :Observable<requestfileUsersStat[]>{
    return this.http.get<requestfileUsersStat[]>(this.url+'/treatment');
  }
  getevents() :Observable<calendarEvents[]>{
    return this.http.get<calendarEvents[]>(this.url+'/events');
  }
}
