import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {EventService} from '../service/event.service';
import {LocationService} from '../service/location.service';

@Injectable({
  providedIn: 'root'
})
export class LocationListResolver implements Resolve<Observable<any>> {
  constructor(private locationService: LocationService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.locationService.getLocations();
  }
}
