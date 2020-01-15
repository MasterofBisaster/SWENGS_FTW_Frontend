import {Component, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {CategoryService} from '../service/category.service';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

    category: any[];

    constructor(private categoryService: CategoryService, public userService: UserService) {
    }

    ngOnInit() {
        this.categoryService.getCategories()
            .subscribe((response: any[]) => {
                this.category = response;
            });
    }

    deleteCategory(category: any) {
        this.categoryService.deleteCategory(category)
            .subscribe(() => {
                this.ngOnInit();
            });
    }
}
