import {Component, Input, OnInit} from '@angular/core';
import {EventService} from '../service/event.service';
import {UserService} from '../service/user.service';
import {LocationService} from '../service/location.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  events: any[];
  allEvents: any[];
  @Input() amountRows = 3;
  @Input() classCard = 'ui-g-12 ui-md-4';
  @Input() classButton = 'ui-g-12 ui-md-4';
  @Input() classButtonEdit = 'ui-g-12 ui-md-3';
  @Input() classButtonDelete = 'ui-g-12 ui-md-4';

  constructor(private eventService: EventService, public userService: UserService, public locationService: LocationService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.setEvents();

    this.route.params.subscribe((params: { filter: string }) => {
      this.setEvents();
    });
  }

  setEvents() {
    const data = this.route.snapshot.data;
    this.allEvents = data.events;
    this.events = this.allEvents.slice(0, this.amountRows);
  }

  deleteEvent(event: any) {
    this.eventService.deleteEvent(event)
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  paginate(event) {
    this.events = this.allEvents.slice(event.first, event.first + event.rows);
  }
}
