import { Component } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  items: MenuItem[];

  ngOnInit() {
    this.items = [{
      label: 'Event',
      items: [
        {label: 'Create an event', icon: 'pi pi-fw pi-plus'},
        {label: 'List all events', icon: 'pi pi-list'}
      ]
    },
      {
        label: 'Location',
        items: [
          {label: 'Add User', icon: 'pi pi-fw pi-user-plus'},
          {label: 'Remove User', icon: 'pi pi-fw pi-user-minus'}
        ]
      }];
  }
}
