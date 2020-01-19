import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../service/category.service';

@Component({
    selector: 'app-category-form',
    templateUrl: './category-form.component.html',
    styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
    categoryFormGroup;

    constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
                private categoryService: CategoryService) {
    }

    ngOnInit() {
        this.categoryFormGroup = this.fb.group({
            id: [null],
            title: ['', [Validators.required]],
            picture: [[]]
        });
    }

    createCategory() {
        const category = this.categoryFormGroup.value;
        if (category.id) {
            this.categoryService.updateCategory(category)
                .subscribe(() => {
                    alert('updated successfully');
                });
        } else {
            this.categoryService.createCategory(category)
                .subscribe((response: any) => {
                    this.router.navigate(['/home/']);
                });
        }
    }
}
