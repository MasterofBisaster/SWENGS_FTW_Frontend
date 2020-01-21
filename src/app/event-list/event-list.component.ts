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
  @Input() classCard = 'ui-g-12 ui-md-4';
  @Input() classButton = 'ui-g-12 ui-md-4';
  @Input() classButtonEdit = 'ui-g-12 ui-md-3';
  @Input() classButtonDelete = 'ui-g-12 ui-md-4';

  constructor(private eventService: EventService, public userService: UserService, public locationService: LocationService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    const data = this.route.snapshot.data;
    this.events = data.events;
  }

  deleteEvent(event: any) {
    this.eventService.deleteEvent(event)
      .subscribe(() => {
        this.ngOnInit();
      });
  }
  dateAsYYYYMMDDHHNNSS(date): string {

    return date.getFullYear()
      + '-' + this.leftpad(date.getMonth() + 1, 2)
      + '-' + this.leftpad(date.getDate(), 2)
      + ' ' + this.leftpad(date.getHours(), 2)
      + ':' + this.leftpad(date.getMinutes(), 2)
      + ':' + this.leftpad(date.getSeconds(), 2);
  }

  leftpad(val, resultLength = 2, leftpadChar = '0'): string {
    return (String(leftpadChar).repeat(resultLength)
      + String(val)).slice(String(val).length);
  }
}
