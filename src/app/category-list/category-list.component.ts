import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {CategoryService} from '../service/category.service';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {ActivatedRoute} from '@angular/router';


@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

    categories: any[];
    @Input() classCard = 'ui-g-12 ui-md-3';
    @Input() classButton = 'ui-g-12 ui-md-5';
    constructor(private categoryService: CategoryService, public userService: UserService, private route: ActivatedRoute) {
    }

    ngOnInit() {

      const data = this.route.snapshot.data;
      this.categories = data.categories;
    }

    deleteCategory(category: any) {
        this.categoryService.deleteCategory(category)
            .subscribe(() => {
                this.ngOnInit();
            });
    }
}
