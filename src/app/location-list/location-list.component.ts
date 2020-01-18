import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {ActivatedRoute} from '@angular/router';
import {LocationService} from '../service/location.service';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit {

  locations: any[];
  @Input() classCard = 'ui-g-12 ui-md-3';
  @Input() classButton = 'ui-g-12 ui-md-5';
  constructor(private locationService: LocationService, public userService: UserService, private route: ActivatedRoute) {
  }

  ngOnInit() {

    const data = this.route.snapshot.data;
    this.locations = data.locations;
  }

  deleteCategory(location: any) {
    this.locationService.deleteLocation(location)
      .subscribe(() => {
        this.ngOnInit();
      });
  }
}

