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

  createEvents(createEvents: any): Observable<void> {
    return this.http.post<void>('http://localhost:8080/api/events/add', createEvents);
  }


  fetchEvents(): Observable<EventInput[]> {
    return this.http.get<Event[]>('http://localhost:8080/api/events')
      .pipe(map((data) => {
          let events : EventInput[]=[];
          data.map(e => {
            let event: EventInput = {
              title: e.title,
                    start: new Date(e.date),
                    end: new Date(e.date),
                    description: e.description,
                    id: String(e.id), // Convertir l'ID en string
            };
            events.push(event);
          });
      return events;
        }
      ));
  }

  editEvent(event: EventInput): Observable<EventInput> {
    return this.http.put<EventInput>(`http://localhost:8080/api/events/${event.id}`, {
      title: event.title,
      date: event.start,
      description: event['description']
    });
  }



  // private eventsUrl = 'http://localhost:8080/api/events';
  // getEvents(): Observable<Event[]> {
  //   return this.http.get<Event[]>(this.eventsUrl);
  // }

  putEvents(event: any): Observable<void> {
    return this.http.put<void>(`http://localhost:8080/api/events/${event.id}`, event);
  }

 // deleteEvent(): Observable<EventInput>

}
