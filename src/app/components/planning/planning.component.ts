import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CalendarOptions, DateSelectArg, EventApi, EventClickArg, EventInput} from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import {createEventId, INITIAL_EVENTS} from "./event-utils";
import {Event} from "../../models/event";
import {EventServiceService} from "../../services/event.service.service";

// import { INITIAL_EVENTS, createEventId } from './event-utils';
//import {EventApiSpring} from './event-from-API'

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})


export class PlanningComponent implements OnInit{
  calendarOptions: CalendarOptions = {
    plugins: [
      dayGridPlugin,
      interactionPlugin,
      timeGridPlugin,
      listPlugin,
    ],headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
  },
    initialView: 'dayGridMonth',
    // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    initialEvents: [],
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };

  currentEvents: EventApi[] = [];

  constructor(private changeDetector: ChangeDetectorRef,
              private eventService: EventServiceService) {
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  // events?: Event[]

  // ngOnInit():void {
  //   this.eventService
  //     .fetchEvents()
  //     .subscribe(data => {
  //       this.calendarOptions.initialEvents=data;
  //
  //     });
  // }
  events: EventInput[] = [];

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(events => {
      this.events = events.map(event => ({
        title: event.title,
        start: new Date(event.date),
        end: new Date(event.date),
        description: event.description,
        id: String(event.id), // Convertir l'ID en string
      }));
    });

}
}
