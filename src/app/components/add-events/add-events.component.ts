import { Component } from '@angular/core';
import {EventServiceService} from "../../services/event.service.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-events',
  templateUrl: './add-events.component.html',
  styleUrls: ['./add-events.component.css']
})
export class AddEventsComponent {

  events = {
    id: '',
    date: '',
    description: '',
    title: '',
    startTime: '',
    endTime: '',
  };

  constructor(private eventService:EventServiceService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    const selectedDate = this.route.snapshot.queryParams['date'];
    if (selectedDate) {
      this.events.date = selectedDate;
    }
  }




  addEvent(){
    this.eventService
      .createEvents(this.events)
      .subscribe(ok => {alert('ok')})
    this.router.navigate(['users/:id/planning']);
  }

}
