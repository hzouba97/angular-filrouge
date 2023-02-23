import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Event} from "../models/event";
import {EventInput} from "@fullcalendar/core";
import {createEventId} from "../components/planning/event-utils";



@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

  constructor(private http: HttpClient) {
  }

  TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

  fetchEvents(): Observable<EventInput[]> {
    return this.http.get<Event[]>('http://localhost:8080/api/events')
      .pipe(map((data) => {
          let events : EventInput[]=[];
          data.map(e => {
            let event: EventInput = {
              id: createEventId(),
              title: 'Timed event',
              start: this.TODAY_STR + 'T00:00:00',
              end: this.TODAY_STR + 'T03:00:00'
            };
            events.push(event);
          });
      return events;
        }
      ));
  }

  private eventsUrl = 'http://localhost:8080/api/events';
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventsUrl);
  }

  putEvents(event: any): Observable<void> {
    return this.http.put<void>(`http://localhost:8080/api/events/${event.id}`, event);
  }

}
