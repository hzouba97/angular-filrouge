import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    // insertion d'event en dur
    // dateClick: this.handleDateClick.bind(this), // MUST ensure `this` context is maintained


    // events: [
    //   { title: 'event 1', date: '2023-03-05' },
    //   { title: 'event 2', date: '2023-03-06' }
    // ]
  };

  // handleDateClick(arg) {
  //   alert('date click! ' + arg.dateStr)
  // }
}
