import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {RxwebValidators} from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerFormGroup;

  constructor(private fb: FormBuilder) {
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


  }

}
