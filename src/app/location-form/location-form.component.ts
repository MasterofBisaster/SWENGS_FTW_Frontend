import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LocationService} from '../service/location.service';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss']
})
export class LocationFormComponent implements OnInit {
  locationFormGroup;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
              private locationService: LocationService) {
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
      picture: [[]]
    });
  }

  createLocation() {
    const location = this.locationFormGroup.value;
    if (location.id) {
      this.locationService.updateLocation(location)
          .subscribe(() => {
            alert('updated successfully');
          });
    } else {
      this.locationService.createLocation(location)
          .subscribe((response: any) => {
            this.router.navigate(['/home/']);
          });
    }
  }
}
