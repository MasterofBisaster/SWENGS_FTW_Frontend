import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {EventService} from '../service/event.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryEventListResolver implements Resolve<Observable<any>> {
  constructor(private eventService: EventService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.eventService.getEventsByCategory(route.paramMap.get('categoryId'));
  }
}
