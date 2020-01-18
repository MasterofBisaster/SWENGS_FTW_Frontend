import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {UserService} from './service/user.service';
import {FtwWordService} from './service/ftw-word.service';
import {EventService} from './service/event.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  menuItems: MenuItem[];
  menuBarItems: MenuItem[];
  isLoggedIn = false;
  ftwPhrase;
  searchString: string;

  constructor(private userService: UserService, private ftwWordService: FtwWordService, private router: Router) {
  }


  ngOnInit() {
    this.setFTWPhrase();

    this.userService.isLoggedIn.subscribe( (isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    this.menuItems = [{
      label: 'Event',
      items: [
        {label: 'Create an event', icon: 'pi pi-fw pi-plus', routerLink: 'event-form'},
        {label: 'List all events', icon: 'pi pi-list', routerLink: 'event-list'}
      ]
    },
      {
        label: 'Location',
        items: [
          {label: 'Create a location', icon: 'pi pi-fw pi-plus', routerLink: 'location-form'},
          {label: 'List all locations', icon: 'pi pi-list', routerLink: 'location-list'}
        ]
      },
      {
        label: 'Categories',
        items: [
          {label: 'Create a category', icon: 'pi pi-fw pi-plus', routerLink: 'category-form'},
          {label: 'List all categories', icon: 'pi pi-list', routerLink: 'category-list'}
        ]
      }];

    this.menuBarItems = [
      {
        label: 'Home', icon: 'pi pi-fw pi-plus', routerLink: 'home'
        /*items: [{
          label: 'New',
          icon: 'pi pi-fw pi-plus',
          items: [
            {label: 'Project'},
            {label: 'Other'},
          ]*/
        }]; /*,
          {label: 'Open'},
          {label: 'Quit'}
        ]
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {label: 'Delete', icon: 'pi pi-fw pi-trash'},
          {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
        ]
      }
    ]; */
  }

  setFTWPhrase() {
    let ftwWords: any[];
    this.ftwWordService.getFtwWords()
      .subscribe( (response: any[]) => {
        ftwWords = this.shuffle(response);

        let fWord = '';
        let tWord = '';
        let wWord = '';

        for (const word of ftwWords) {

          switch (word.word_category) {
            case 'f': {
              fWord = word.word;
              break;
            }
            case 't': {
              tWord = word.word;
              break;
            }
            case 'w': {
              wWord = word.word;
              break;
            }
          }
          if (fWord !== '' && tWord !== '' && wWord !== '') {
            break;
          }
        }

        this.ftwPhrase = fWord + ', ' + tWord + ', ' + wWord;
    });
  }

  shuffle(arra1) {
    let ctr = arra1.length;
    let temp;
    let index;

// While there are elements in the array
    while (ctr > 0) {
// Pick a random index
      index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
      ctr--;
// And swap the last element with it
      temp = arra1[ctr];
      arra1[ctr] = arra1[index];
      arra1[index] = temp;
    }
    return arra1;
  }

  save(event) {
    this.router.navigate(['/home/' + event.target.value]);
  }
}

