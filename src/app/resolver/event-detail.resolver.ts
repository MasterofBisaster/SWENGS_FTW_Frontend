import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {EventService} from '../service/event.service';

@Injectable({
  providedIn: 'root'
})
export class EventDetailResolver implements Resolve<Observable<any>> {
  constructor(private eventService: EventService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.eventService.getEventDetail(route.paramMap.get('id'));
  }
}
