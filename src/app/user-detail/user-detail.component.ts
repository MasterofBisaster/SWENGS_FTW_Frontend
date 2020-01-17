import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
    ftwUserDetailGroup;

    constructor(private route: ActivatedRoute, private fb: FormBuilder) {
    }

    ngOnInit() {

        this.ftwUserDetailGroup = this.fb.group({
            id: [null],
            user: ['', [Validators.required]],
            picture: [],
            user_username: [null, [Validators.required]],
            user_first_name: [null, [Validators.required]],
            user_last_name: [null, [Validators.required]],
            last_login: [null, [Validators.required]],
        });

        const data = this.route.snapshot.data;

        if (data.user) {
            this.ftwUserDetailGroup.patchValue(data.event);
        }
    }

}
