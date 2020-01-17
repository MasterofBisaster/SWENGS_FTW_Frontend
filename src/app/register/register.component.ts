import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    registerFormGroup;

    constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    }

    ngOnInit() {
        this.registerFormGroup = this.fb.group({
            id: [null],
            username: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', RxwebValidators.compare({fieldName: 'password'})],
        });
    }

    createUser() {
        const user = this.registerFormGroup.value;
        this.userService.createUser(user)
            .subscribe((response: any) => {
                this.router.navigate(['/event-list/']);
            });
    }
}
