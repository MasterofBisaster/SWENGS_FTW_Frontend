import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {CategoryService} from '../service/category.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  categories: any[];
  allCategories: any[];
  @Input() amountRows = 4;
  @Input() classCard = 'ui-g-12 ui-md-3';
  @Input() classButton = 'ui-g-12 ui-md-5';
  @Input() classButtonEdit = 'ui-g-12 ui-md-3';
  @Input() classButtonDelete = 'ui-g-12 ui-md-4';

  constructor(private categoryService: CategoryService, public userService: UserService, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.setCategories();
    this.route.params.subscribe((params: { filter: string }) => {
      this.setCategories();
    });
  }

  setCategories() {
    const data = this.route.snapshot.data;
    this.allCategories = data.categories;
    this.categories = this.allCategories.slice(0, this.amountRows);
  }

  deleteCategory(category: any) {
    this.categoryService.deleteCategory(category)
        .subscribe(() => {
          window.location.reload();
          this.ngOnInit();
        });
  }

  paginate(event) {
    this.categories = this.allCategories.slice(event.first, event.first + event.rows);
  }
}
