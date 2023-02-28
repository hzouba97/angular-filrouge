import { Component } from '@angular/core';
import {Event} from "../../models/event"
import {UsersService} from "../../services/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EventServiceService} from "../../services/event.service.service";
import {map, mergeMap} from "rxjs";

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent {

  event: Event = {
    id: 0,
    title:'',
    description: '',
    date: undefined,
    startTime: undefined,
    endTime: undefined
  };

  constructor(
    private eventService: EventServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        map(params => params['id']),
        mergeMap((eventId:number) => this.eventService.fetchEventbyId(eventId))
      )
      .subscribe((event:Event) => {
        this.event = event;
      });
  }


  updateEvent(): void {
    this.eventService.editEventForm(this.event).subscribe(() => {
      this.router.navigate([`/event-details/${this.event.id}`] );
    });
  }


}
