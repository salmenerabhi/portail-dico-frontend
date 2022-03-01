import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from "rxjs";
import {FaqItem} from "../../models/faq.item";


@Injectable({
  providedIn: 'root'
})
export class FaqService {
  private url='http://localhost:8085/faq/';
  constructor(private http :HttpClient) { }


  addFaq(info:FaqItem):Observable<FaqItem>{
    return  this.http.post<FaqItem>(this.url,info);
   }

   getListFaqs():Observable<FaqItem[]>{
    return this.http.get<FaqItem[]>(this.url)

  }

}
