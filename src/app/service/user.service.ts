import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // cookieService = new CookieService;
  readonly accessTokenLocalStorageKey = 'access_token';
  isLoggedIn = new BehaviorSubject(false);

  constructor(public cookieService: CookieService, private http: HttpClient, private router: Router,
              private jwtHelperService: JwtHelperService) {
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    if (token) {
      console.log('Token expiration date: ' + this.jwtHelperService.getTokenExpirationDate(token));
      const tokenValid = !this.jwtHelperService.isTokenExpired(token);
      this.isLoggedIn.next(tokenValid);
    }
  }

  login(userData: { username: string, password: string }) {
    this.http.post('/api/api-token-auth/', userData)
      .subscribe((res: any) => {
        this.isLoggedIn.next(true);
        localStorage.setItem('access_token', res.token);
        this.router.navigate(['home']);
      }, () => {
        alert('wrong username or password');
      });
  }

  logout() {
    localStorage.removeItem(this.accessTokenLocalStorageKey);
    this.cookieService.deleteAll();
    this.isLoggedIn.next(false);
    this.router.navigate(['/login']);
  }

  hasPermission(permission) {
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    const decodeToken = this.jwtHelperService.decodeToken(token);
    if (decodeToken == null) {
      return false;
    }
    const permissions = decodeToken.permissions;
    if (permissions === undefined) {
      return false;
    }
    return permission in permissions;
  }

  userId() {
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    const decodeToken = this.jwtHelperService.decodeToken(token);
    if (decodeToken == null) {
      return null;
    }
    return decodeToken.user_id;
  }

  userName() {
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    const decodeToken = this.jwtHelperService.decodeToken(token);
    if (decodeToken == null) {
      return null;
    }
    return decodeToken.username;
  }

  createUser(user) {
    return this.http.post('/api/register/create', user);
  }

  updateUser(user) {
    return this.http.put('/api/user/' + user.id + '/update', user);
  }

  getUserDetail(id) {
    return this.http.get('/api/user/' + id + '/detail');
  }

  addOrRemoveUserAsFriend(userId, friendId) {
    return this.http.put('/api/user/add-friend/' + userId + '/' + friendId, userId, friendId);
  }
}
