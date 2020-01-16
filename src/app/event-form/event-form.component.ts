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
  commentOptions;

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
      private: [null, [Validators.required]],
      location: [null, [Validators.required]],
      category: [null, [Validators.required]],
      description: [null, [Validators.required]],
      max_users: [null],
      confirmed_users: [null],
      costs: [null],
      picture: [],
      creator: [null]
    });

    const data = this.route.snapshot.data;
    this.categoryOptions = data.categoryOptions;
    this.commentOptions = data.commentOptions;

    if (data.event) {
      this.eventFormGroup.patchValue(data.event);
    }
  }

  createEvent() {
    const event = this.eventFormGroup.value;
    if (event.id) {
      this.eventService.updateEvent(event)
        .subscribe(() => {
          alert('updated successfully');
        });
    } else {
      this.eventService.createEvent(event)
        .subscribe((response: any) => {
          this.router.navigate(['/event-form/' + response.id]);
        });
    }
  }
}
