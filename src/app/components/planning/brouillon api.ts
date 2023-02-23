// import {Component, OnInit} from '@angular/core';
// import {EventInput} from "@fullcalendar/core";
// import {EventServiceService} from "../../../services/event.service.service";
// import {Event} from  "../../../models/event";
//
// @Component({
//   selector: 'app-event-api',
//   templateUrl: './event-api.component.html',
//   styleUrls: ['./event-api.component.css']
// })
// export class EventAPIComponent implements OnInit{
//
//   events?: Event[]
//
//   constructor(private eventService: EventServiceService) {
//   }
//
//   ngOnInit():void {
//     this.eventService
//       .fetchEvents()
//       .subscribe(data => {
//         this.events = data
//       });
//   }
//
//
//
//
// }
//
// // export const EventApiSpring: EventInput[]= [
// //   {
// //     id: createEventId(),
// //     title: 'All-day event',
// //     start: TODAY_STR
// //   }
// // ];
// //
// // export function createEventId() {
// //   return String(eventGuid++);
// // }
