import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EventServiceService} from "../../services/event.service.service";
import {map, mergeMap} from "rxjs";
import {Users} from "../../models/users";
import {Event} from "../../models/event";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements  OnInit {

  event!: Event;
  constructor(private eventService: EventServiceService,
              private activateRoute: ActivatedRoute,
              private router: Router) {
  }




  ngOnInit(): void {
    this.activateRoute.params
      .pipe(
        map(params => params['id']),
        mergeMap((eventId:number)=> this.eventService.fetchEventbyId(eventId))
      )
      .subscribe((event:Event) => {
        this.event = event;
      });

  }

  editEvent() {
    this.router.navigate([`/edit-event/${this.event.id}`]);
  }

  deleteEvent() {
    this.eventService.deleteEvent(this.event.id).subscribe(()=>{
      this.router.navigate(['/users/:id/planning']);
    });
  }
}
