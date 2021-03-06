import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {EventService} from '../service/event.service';
import {UserService} from '../service/user.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
  providers: [MessageService]
})
export class EventDetailComponent implements OnInit {

  eventDetailGroup;
  attendEventBool;

  constructor(private eventService: EventService, private route: ActivatedRoute,
              private fb: FormBuilder, private userService: UserService, private messageService: MessageService) {
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
    this.eventService.checkIfUserAttendsEvent(this.eventDetailGroup.controls.id.value).subscribe((response) => {
      if (typeof response === 'string') {
        this.attendEventBool = Boolean(JSON.parse(response));
      }
    });
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
        if (this.attendEventBool) {
          this.messageService.add({severity: 'success', summary: 'Attendance changed!', detail: 'You are now attending this event!'});
        } else {
          this.messageService.add({severity: 'success', summary: 'Attendance changed!', detail: 'You are now unattending this event!'});
        }
      });
  }
}
