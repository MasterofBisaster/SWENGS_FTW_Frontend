import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {EventService} from '../service/event.service';
import {UserService} from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class EventListResolver implements Resolve<Observable<any>> {
  constructor(private eventService: EventService, private userService: UserService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    const userId = this.userService.userId();

    if (userId == null) {
      return this.eventService.getPublicEvents();
    } else {
      return this.eventService.getPrivateEvents(userId);
    }
  }
}
