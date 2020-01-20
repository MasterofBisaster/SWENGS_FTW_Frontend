import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {LocationService} from '../service/location.service';

@Injectable({
  providedIn: 'root'
})
export class LocationResolver implements Resolve<Observable<any>> {
  constructor(private locationService: LocationService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.locationService.getLocation(route.paramMap.get('id'));
  }
}
