import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {Event} from "../models/event";
import {EventInput} from "@fullcalendar/core";
import {createEventId} from "../components/planning/event-utils";
import * as moment from 'moment';
import {environment} from "@ng-bootstrap/ng-bootstrap/environment";




@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

  constructor(private http: HttpClient) {
  }

  createEvents(createEvents: any): Observable<void> {
    return this.http.post<void>('http://localhost:8080/api/events/add', createEvents);
  }


  fetchEvents(): Observable<EventInput[]> {
    return this.http.get<Event[]>('http://localhost:8080/api/events').pipe(
      map((data) => {
        const events: EventInput[] = [];
        data.map((e) => {
          const start = moment(`${e.date}T${e.startTime}`).toDate();
          const end = moment(`${e.date}T${e.endTime}`).toDate();
          const event: EventInput = {
            title: e.title,
            start: start,
            end: end,
            description: e.description,
            id: String(e.id),
          };
          events.push(event);
        });
        return events;
      })
    );
  }




  editEvent(eventInput: EventInput): Observable<EventInput> {
    let event: Event = {
      id: Number(eventInput.id),
      title: String(eventInput.title),
      description: eventInput['description'],
      date: typeof eventInput.date === 'string' ? new Date(eventInput.date.replace(/-/g, '/')) : Array.isArray(eventInput.date) ? undefined : eventInput.date ? new Date(Number(eventInput.date)) : undefined,
      startTime: eventInput['startTime'] ? new Date(`1970-01-01T${eventInput['startTime']}Z`) : undefined,
      endTime: eventInput['endTime'] ? new Date(`1970-01-01T${eventInput['endTime']}Z`) : undefined,
    };
    console.log('EVENT avant envoi:', JSON.stringify(event));
    return this.http.put<EventInput>(`http://localhost:8080/api/events/${event.id}`,event);
  }









  // private eventsUrl = 'http://localhost:8080/api/events';
  // getEvents(): Observable<Event[]> {
  //   return this.http.get<Event[]>(this.eventsUrl);
  // }

  putEvents(event: any): Observable<void> {
    return this.http.put<void>(`http://localhost:8080/api/events/${event.id}`, event);
  }

  deleteEvent(eventid: number): Observable<EventInput>{
    return this.http.delete<EventInput>(`http://localhost:8080/api/events/${eventid}`);
  }

}
