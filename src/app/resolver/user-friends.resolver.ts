import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {EventService} from '../service/event.service';
import {UserService} from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserFriendsResolver implements Resolve<Observable<any>> {
  constructor(private userService: UserService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.userService.getUserFriends(route.paramMap.get('id'));
  }
}
