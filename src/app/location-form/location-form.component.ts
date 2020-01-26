import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LocationService} from '../service/location.service';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-location-form',
    templateUrl: './location-form.component.html',
    styleUrls: ['./location-form.component.scss']
})
export class LocationFormComponent implements OnInit {
    locationFormGroup;
    newPicture;
    fileToUpload: File = null;

    constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
                private locationService: LocationService, private http: HttpClient) {
    }

    ngOnInit() {
        this.locationFormGroup = this.fb.group({
            id: [null],
            name: ['', [Validators.required]],
            street: [null],
            city: [null],
            zip_code: [],
            country: [null],
            max_user: [null],
            picture: [null]
        });
        const data = this.route.snapshot.data;

        if (data.location) {
            this.locationFormGroup.patchValue(data.location);
        }
    }

    createLocation() {
        const location = this.locationFormGroup.value;
        if (location.id) {
            this.locationService.updateLocation(location)
                .subscribe(() => {
                    this.router.navigate(['location-list']);
                });
        } else {
            this.locationService.createLocation(location)
                .subscribe((response: any) => {
                  this.router.navigate(['location-list']);
                });
        }
    }

    uploadFile(event) {
        const files = event.files;
        this.fileToUpload = files.item(0);
        this.postFile(this.fileToUpload).subscribe((response: any) => {
            this.newPicture = response;
            this.locationFormGroup.get('picture').patchValue(this.newPicture.id);
        });
    }

    postFile(fileToUpload: File) {
        const endpoint = '/api/media/upload';
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        return this.http.post(endpoint, formData);
    }
}
