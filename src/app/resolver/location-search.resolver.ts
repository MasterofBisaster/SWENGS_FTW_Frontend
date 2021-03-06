import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {LocationService} from '../service/location.service';

@Injectable({
  providedIn: 'root'
})
export class LocationSearchResolver implements Resolve<Observable<any>> {
  constructor(private locationService: LocationService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.locationService.getSearchLocations(route.paramMap.get('searchString'));
  }
}
