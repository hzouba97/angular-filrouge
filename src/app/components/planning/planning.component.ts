import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CalendarOptions, DateSelectArg, EventApi, EventChangeArg, EventClickArg, EventInput} from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import {Event} from "../../models/event";
import {EventServiceService} from "../../services/event.service.service";
import tippy from "tippy.js";
import {Router} from "@angular/router";

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
    <hr>
    <h6>Description:</h6>
    <p class="card-text">${info.event.extendedProps['description']} </p>
    <br>
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
    if (confirm(`Do you want to create event ?`)) {
      const date = selectInfo.startStr;
      this.router.navigate(['add-event'], {queryParams: {date: date}});
    }
  }

  //TODO: on click: route sur event details. Dans event details: deux boutons: 1 del et 1 edit.

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Do you wanna see the event details ?'${clickInfo.event.title}'`)) {
      this.router.navigate([`event-details/${clickInfo.event.id}`]);
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

}
