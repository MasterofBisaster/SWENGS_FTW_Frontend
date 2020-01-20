import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
    userFormGroup;
    newPicture;
    fileToUpload: File = null;
    picture;

    constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
                private userService: UserService, private http: HttpClient) {
    }

    ngOnInit() {
        this.userFormGroup = this.fb.group({
            id: [null],
            picture: [null],
            first_name: [null],
            last_name: [null],
            user_username: [null, [Validators.required]]
        });

        const data = this.route.snapshot.data;

        if (data.user) {
            this.userFormGroup.patchValue(data.user);
        }
    }

    createUser() {
        const user = this.userFormGroup.value;
        if (user.id) {
            this.userService.updateUser(user)
                .subscribe(() => {
                    alert('updated successfully');
                });

        }
    }


    uploadFile(event) {
        const files = event.files;
        this.fileToUpload = files.item(0);
        this.postFile(this.fileToUpload).subscribe((response: any) => {
            this.newPicture = response;
            this.userFormGroup.get('picture').patchValue(this.newPicture.id);
            const user = this.userFormGroup.value;
            this.userService.updateUser(user)
                .subscribe(() => {
                    window.location.reload();
                });
        });
    }

    postFile(fileToUpload: File) {
        const endpoint = '/api/media/upload';
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        return this.http.post(endpoint, formData);
    }
}
