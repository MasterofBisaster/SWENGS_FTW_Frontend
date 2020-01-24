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
  allLocations: any[];
  @Input() amountRows = 4;
  @Input() classCard = 'ui-g-12 ui-md-3';
  @Input() classButton = 'ui-g-12 ui-md-5';
  @Input() classButtonEdit = 'ui-g-6 ui-md-3';
  @Input() classButtonDelete = 'ui-g-6 ui-md-4';


  constructor(private locationService: LocationService, public userService: UserService, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.setLocations();

    this.route.params.subscribe((params: { filter: string }) => {
      this.setLocations();
    });
  }

  setLocations() {
    const data = this.route.snapshot.data;
    this.allLocations = data.locations;
    this.locations = this.allLocations.slice(0, this.amountRows);
  }

  deleteLocation(location: any) {
    this.locationService.deleteLocation(location)
        .subscribe(() => {
          this.setLocations();
          alert('Location deleted');
          window.location.reload();
        });
  }

  paginate(event) {
    this.locations = this.allLocations.slice(event.first, event.first + event.rows);
  }
}

