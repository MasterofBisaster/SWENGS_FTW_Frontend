import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  events: any[];
  locations: any[];
  categories: any[];
  displayedColumns = ['name'];
  displayedColumns2 = ['title'];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {


    const data = this.route.snapshot.data;
    this.events = data.events;
    this.locations = data.locations;
    this.categories = data.categories;


  }

}
