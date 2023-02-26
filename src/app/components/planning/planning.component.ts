import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {
  CalendarOptions,
  DateInput,
  DateSelectArg,
  EventApi,
  EventChangeArg,
  EventClickArg,
  EventInput
} from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import {createEventId, INITIAL_EVENTS} from "./event-utils";
import {Event} from "../../models/event";
import {EventServiceService} from "../../services/event.service.service";
import * as moment from "moment";
import tippy from "tippy.js";
import {Router} from "@angular/router";



// import { INITIAL_EVENTS, createEventId } from './event-utils';
//import {EventApiSpring} from './event-from-API'

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})


export class PlanningComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [
      dayGridPlugin,
      interactionPlugin,
      timeGridPlugin,
      listPlugin,
    ], headerToolbar: {
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
    eventsSet: this.handleEvents.bind(this),
    eventChange: this.handleEventChange.bind(this),

    eventMouseEnter: (info) => {
      console.log(info)
      tippy(info.el, {
        content: `

      <div class="card" style="width: 18rem;">

  <div class="card-body">
    <h5 class="card-title"> <center> ${info.event.title} </center>  </h5>
    <p class="card-text">${info.event.extendedProps['description']} </p>
    <p class="card-text">${info.event._instance?.range['start']} </p>
    <p class="card-text">${info.event._instance?.range['end']} </p>
  </div>

</div>
    `,
        allowHTML: true,
        interactive: true,
        placement: 'top',
        theme: 'light',
      });
    },
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };

  currentEvents: EventApi[] = [];

  constructor(private changeDetector: ChangeDetectorRef,
              private eventService: EventServiceService,
              private router: Router) {
  }

  handleDateSelect(selectInfo: DateSelectArg) {
   
    const date = selectInfo.startStr;
    this.router.navigate(['add-event'], { queryParams: { date: date } });

  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
      const eventId = parseInt(clickInfo.event.id, 10); // conversion en nombre
      this.eventService.deleteEvent(eventId).subscribe(() => {
        this.currentEvents = this.currentEvents.filter(event => event.id !== clickInfo.event.id);
      });
    }
  }


  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }


  handleEventChange(changeInfo: EventChangeArg) {
    const event = changeInfo.event;
    const start = event.start;
    const end = event.end;
    const eventId = parseInt(event.id, 10);

    if (!start || !end) {
      return;
    }

    const formattedStart = start.toISOString().substring(0, 10);
    const formattedStartTime = start.toISOString().substring(11, 19);

    let formattedEndTime = '';
    if (end) {
      formattedEndTime = end.toISOString().substring(11, 19);
    }

    const editedEvent: Event = {
      id: eventId,
      title: event.title,
      date: new Date(formattedStart),
      startTime: new Date(`1970-01-01T${formattedStartTime}Z`),
      endTime: formattedEndTime ? new Date(`1970-01-01T${formattedEndTime}Z`) : undefined,
      description: event.extendedProps['description'] || ''
    };

    this.eventService.editEvent(editedEvent).subscribe({
      next: data => {
        const index = this.currentEvents.findIndex(e => e.id === event.id);
        if (index >= 0) {
          this.currentEvents[index].setDates(start, end);
        }
      },
      error: error => {
        console.log(error);
      }
    });
    location.reload();
  }












  events: EventInput[] = [];

  ngOnInit(): void {
    this.eventService.fetchEvents().subscribe(data => {
      this.events = data;
      this.calendarOptions.initialEvents = data;
    });
  }



  // events: EventInput[] = [];
  //
  // ngOnInit(): void {
  //   this.eventService.getEvents().subscribe(events => {
  //     this.events = events.map(event => ({
  //       title: event.title,
  //       start: new Date(event.date),
  //       end: new Date(event.date),
  //       description: event.description,
  //       id: String(event.id), // Convertir l'ID en string
//   //     }));
//   //   });
//
// }
}
