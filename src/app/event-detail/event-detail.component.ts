import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {EventService} from '../service/event.service';
import {UserService} from '../service/user.service';

@Component({
    selector: 'app-event-detail',
    templateUrl: './event-detail.component.html',
    styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

    eventDetailGroup;
    attendEvent: boolean;

    constructor(private eventService: EventService, private route: ActivatedRoute,
                private fb: FormBuilder, private userService: UserService) {
    }

    ngOnInit() {

        this.eventDetailGroup = this.fb.group({
            id: [null],
            name: ['', [Validators.required]],
            start_date: [null, [Validators.required]],
            end_date: [null, [Validators.required]],
            private: [null, [Validators.required]],
            confirmed_users: [null, [Validators.required]],
            location_name: [null, [Validators.required]],
            location_street: [null, [Validators.required]],
            location_zip_code: [null, [Validators.required]],
            location_city: [null, [Validators.required]],
            location_country: [null, [Validators.required]],
            category: [null, [Validators.required]],
            description: [null, [Validators.required]],
            max_users: [null],
            user_name: [null, [Validators.required]],
            costs: [null],
            creator: [null],
            picture: [null]
        });

        this.setEvent();

        this.route.params.subscribe((params: { filter: string }) => {
            this.setEvent();
        });
    }

    setEvent() {
        const data = this.route.snapshot.data;

        if (data.event) {
            this.eventDetailGroup.patchValue(data.event);
        }
    }

    attendToEvent() {
        this.eventService.attendOrNotToEvent(this.eventDetailGroup.controls.id.value, this.userService.userId())
            .subscribe(() => {
                alert('Successfully changed your attendance information!');
                window.location.reload();
            });
    }

    userAttendEvent() {
        if (this.userService.userId() in this.eventDetailGroup.controls.confirmed_users.value) {
            return false;
        } else {
            return true;
        }
    }

    userUnattendEvent() {
        if (this.userService.userId() in this.eventDetailGroup.controls.confirmed_users.value) {
            return true;
        } else {
            return false;
        }
    }
}
