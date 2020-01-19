import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {JwtHelperService} from '@auth0/angular-jwt';
import {EventService} from '../service/event.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  eventDetailGroup;

  readonly accessTokenLocalStorageKey = 'access_token';

  decodedToken;

  constructor(private eventService: EventService, private route: ActivatedRoute, private fb: FormBuilder) {
  }

  ngOnInit() {

    this.eventDetailGroup = this.fb.group({
      id: [null],
      name: ['', [Validators.required]],
      start_date: [null, [Validators.required]],
      end_date: [null, [Validators.required]],
      private: [null, [Validators.required]],
      location_name: [null, [Validators.required]],
      location_street: [null, [Validators.required]],
      location_zip_code: [null, [Validators.required]],
      location_city: [null, [Validators.required]],
      location_country: [null, [Validators.required]],
      category: [null, [Validators.required]],
      description: [null, [Validators.required]],
      max_users: [null],
      user_name: [null, [Validators.required]],
      // confirmed_users: [null],
      costs: [null],
      // picture: [],
      creator: [null],
      picture: [null]
    });

    const data = this.route.snapshot.data;

    if (data.event) {
      this.eventDetailGroup.patchValue(data.event);
    }


    const myRawToken = localStorage.getItem(this.accessTokenLocalStorageKey);

    const helper = new JwtHelperService();

    this.decodedToken = helper.decodeToken(myRawToken);



  }

}
