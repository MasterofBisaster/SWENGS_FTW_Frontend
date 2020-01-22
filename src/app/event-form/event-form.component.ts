import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../service/category.service';
import {CommentService} from '../service/comment.service';
import {LocationService} from '../service/location.service';
import {UserService} from '../service/user.service';
import {EventService} from '../service/event.service';


@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  eventFormGroup;
  categoryOptions;
  locationOptions;
  description: string;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
              private categoryService: CategoryService, private commentService: CommentService,
              private locationService: LocationService, private userService: UserService,
              private eventService: EventService) {
  }

  ngOnInit() {

    this.eventFormGroup = this.fb.group({
      id: [null],
      name: ['', [Validators.required]],
      start_date: [null, [Validators.required]],
      end_date: [null, [Validators.required]],
      private: [false, [Validators.required]],
      location: [null, [Validators.required]],
      category: [null, [Validators.required]],
      short_description: [null, [Validators.required]],
      description: [null, [Validators.required]],
      max_users: [null],
      confirmed_users: [[]],
      costs: [null],
      picture: [],
      creator: [this.userService.userId()]
    });

    const data = this.route.snapshot.data;
    this.categoryOptions = data.categoryOptions;
    this.locationOptions = data.locationOptions;

    if (data.event) {
      this.eventFormGroup.patchValue(data.event);
    }

    // verzweifelte versuche mit dem Datum folgen

    // this.eventFormGroup.controls.start_date.value = this.eventFormGroup.controls.start_date.value | date ['MM/dd/yyyy HH:mm'];
    // this.eventFormGroup.start_date = this.datepipe.transform(this.eventFormGroup.start_date, 'MM/dd/yyyy HH:mm:ss');
    // let latest_date = this.datepipe.transform(this.eventFormGroup.start_date, 'MM/dd/yyyy HH:mm');
    // this.latestDate = this.datepipe.transform(this.eventFormGroup.start_date, 'MM/dd/yyyy HH:mm');
    // this.eventFormGroup.start_date = this.latestDate;

  }

  createEvent() {
    const event = this.eventFormGroup.value;
    event.category = event.category.id;
    event.location = event.location.id;
    event.start_date = this.dateAsYYYYMMDDHHNNSS(new Date());
    event.end_date = this.dateAsYYYYMMDDHHNNSS(new Date());
    if (event.id) {
      this.eventService.updateEvent(event)
        .subscribe(() => {
          alert('updated successfully');
        });
    } else {
      this.eventService.createEvent(event)
        .subscribe((response: any) => {
          this.router.navigate(['/event-form/' + response.id]);
          // this.router.navigate(['/home']);
        });
    }
  }

  dateAsYYYYMMDDHHNNSS(vdate): string {
    return vdate.getFullYear()
      + '-' + this.leftpad(vdate.getMonth() + 1, 2)
      + '-' + this.leftpad(vdate.getDate(), 2)
      + ' ' + this.leftpad(vdate.getHours(), 2)
      + ':' + this.leftpad(vdate.getMinutes(), 2)
      + ':' + this.leftpad(vdate.getSeconds(), 2);
  }

  leftpad(val, resultLength = 2, leftpadChar = '0'): string {
    return (String(leftpadChar).repeat(resultLength)
      + String(val)).slice(String(val).length);
  }
}
