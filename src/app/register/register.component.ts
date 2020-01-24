import {Component, OnInit} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormBuilder, ValidationErrors, Validators} from '@angular/forms';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

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
      username: ['', Validators.required, this.usernameValidator()],
      password: ['', Validators.required],
      confirmPassword: ['', RxwebValidators.compare({fieldName: 'password'})],
    });
  }

  createUser() {
    const user = this.registerFormGroup.value;
    this.userService.createUser(user)
      .subscribe((response: any) => {
        this.router.navigate(['/login/']);
      });
  }

  usernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return this.userService.getUsers()
        .pipe(
          map((profiles: any[]) => {
            const currentUsername = this.registerFormGroup.controls.username.value;
            const profileWithSameUsername = profiles.find((p) => {
              return p.username === currentUsername;
            });
            if (profileWithSameUsername) {
              return {
                usernameAlreadyExists: true
              };
            } else {
              return null;
            }
          })
        );
    };
  }
}
