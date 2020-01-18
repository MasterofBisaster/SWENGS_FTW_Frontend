import {Component, Input, OnInit} from '@angular/core';
import {EventService} from '../service/event.service';
import {UserService} from '../service/user.service';
import {LocationService} from '../service/location.service';

@Component({
    selector: 'app-event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
    events: any[];
    @Input() classCard = 'ui-g-12 ui-md-6';
    @Input() classButton = 'ui-g-12 ui-md-5';

    constructor(private eventService: EventService, public userService: UserService, public locationService: LocationService) {
    }

    ngOnInit() {
        this.eventService.getEvents()
            .subscribe((response: any[]) => {
                this.events = response;
            });
    }

    deleteEvent(event: any) {
        this.eventService.deleteEvent(event)
            .subscribe(() => {
                this.ngOnInit();
            });
    }
}
