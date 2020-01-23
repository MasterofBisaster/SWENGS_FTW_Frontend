import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../service/category.service';
import {CommentService} from '../service/comment.service';
import {LocationService} from '../service/location.service';
import {UserService} from '../service/user.service';
import {EventService} from '../service/event.service';
import {HttpClient} from '@angular/common/http';


@Component({
    selector: 'app-event-form',
    templateUrl: './event-form.component.html',
    styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
    eventFormGroup;
    categoryOptions;
    locationOptions;
    newPicture;
    fileToUpload: File = null;

    constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
                private categoryService: CategoryService, private commentService: CommentService,
                private locationService: LocationService, private userService: UserService,
                private eventService: EventService, private http: HttpClient) {
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

    uploadFile(event) {
        const files = event.files;
        this.fileToUpload = files.item(0);
        this.postFile(this.fileToUpload).subscribe((response: any) => {
            this.newPicture = response;
            this.eventFormGroup.get('picture').patchValue(this.newPicture.id);
        });
    }

    postFile(fileToUpload: File) {
        const endpoint = '/api/media/upload';
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        return this.http.post(endpoint, formData);
    }
}
