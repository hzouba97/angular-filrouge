import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {Event} from "../models/event";
import {EventInput} from "@fullcalendar/core";
import {createEventId} from "../components/planning/event-utils";
import * as moment from 'moment';
import {environment} from "@ng-bootstrap/ng-bootstrap/environment";
import {Users} from "../models/users";




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

  fetchEventbyId(id: number): Observable<Event>{
    return this.http.get<Event>(`http://localhost:8080/api/events/${id}`);
  }


  editEvent(event: Event): Observable<Event> {
    const start = event.startTime ? moment(event.startTime).local().format("HH:mm:ss") : null;
    const end = event.endTime ? moment(event.endTime).local().format("HH:mm:ss") : null;

    const data: any = {
      title: event.title,
      date: moment(event.date).local().format("YYYY-MM-DD"),
      description: event.description || '',
      startTime: start,
      endTime: end
    };
    return this.http.put<Event>(`http://localhost:8080/api/events/${event.id}`, data);
  }

  editUserForm(event: Event): Observable<Event>{

    const data: Event = {
      id: event.id,
      title: event.title,
      description: event.title,
      date:  event.date,
      startTime:  event.startTime,
      endTime:  event.endTime,


    }
    return this.http.put<Event>(`http://localhost:8080/api/events/${event.id}`, data);
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
