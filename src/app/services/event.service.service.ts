import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Event} from "../models/event";

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

  constructor(private http: HttpClient) { }

  fetchEvents(): Observable<Event[]>{
    return this.http.get<Event[]>('http://localhost:8080/api/event');
  }

  createEvents(createEvents: any):Observable<void>{
    return this.http.post<void>('http://localhost:8080/api/events/add', createEvents);
  }

}
