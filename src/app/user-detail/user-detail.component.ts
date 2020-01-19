import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {CategoryService} from '../service/category.service';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../service/user.service';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
    ftwUserDetailGroup;
    newPicture;
    fileToUpload: File = null;

    constructor(private route: ActivatedRoute, private fb: FormBuilder, private http: HttpClient,
                private userService: UserService) {
    }

    ngOnInit() {

        this.ftwUserDetailGroup = this.fb.group({
            id: [null],
            picture: [null],
            user_username: [null, [Validators.required]],
            user_first_name: [null, [Validators.required]],
            user_last_name: [null, [Validators.required]],
        });

        const data = this.route.snapshot.data;

        if (data.user) {
            this.ftwUserDetailGroup.patchValue(data.user);
        }
    }

    uploadFile(event) {
        const files = event.files;
        this.fileToUpload = files.item(0);
        this.postFile(this.fileToUpload).subscribe((response: any) => {
            this.newPicture = response;
            this.ftwUserDetailGroup.get('picture').patchValue(this.newPicture.id);
            const user = this.ftwUserDetailGroup.value;
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
