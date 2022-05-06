import { HttpClient } from '@angular/common/http';
import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DayPilot } from 'daypilot-pro-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  private url = 'http://localhost:8085/requestfile';

  getEvents(from: DayPilot.Date, to: DayPilot.Date): Observable<any[]> {
    return this.http.get(this.url + "/api/events?from=" + from.toString() + "&to=" + to.toString()) as Observable<any>;
  }

  getResources(): Observable<any[]> {
    return this.http.get(this.url) as Observable<any>;
  }

  createEvent(data: EventCreateParams): Observable<EventData> {
    return this.http.post(this.url + "/api/events/create", data) as Observable<any>;
  }

  moveEvent(data: EventMoveParams): Observable<EventData> {
    return this.http.post("/api/events/move", data) as Observable<any>;
  }

  deleteEvent(data: EventDeleteParams): Observable<EventData> {
    return this.http.post("/api/events/delete", data) as Observable<any>;
  }


}

@Pipe({ name: 'noSanitize' })
export class NoSanitizePipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) { }

  transform(html: string): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(html);
  }
}

export interface EventCreateParams {
  start: string;
  end: string;
  text: string;
  resource: string | number;
}

export interface EventMoveParams {
  id: string | number;
  start: string;
  end: string;
  resource: string | number;
}

export interface EventDeleteParams {
  id: string | number;
}

export interface EventData {
  id: string | number;
  start: string;
  end: string;
  text: string;
  resource: string | number;
}

