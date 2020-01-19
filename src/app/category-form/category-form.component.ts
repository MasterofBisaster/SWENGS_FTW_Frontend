import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../service/category.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  categoryFormGroup;
  newPicture;
  fileToUpload: File = null;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
              private categoryService: CategoryService, private http: HttpClient) {
  }

  ngOnInit() {
    this.categoryFormGroup = this.fb.group({
      id: [null],
      title: ['', [Validators.required]],
      picture: [null]
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
          this.router.navigate(['home']);
        });
    }
  }

  uploadFile(event) {
    const files = event.files;
    this.fileToUpload = files.item(0);
    this.postFile(this.fileToUpload).subscribe((response: any) => {
      this.newPicture = response;
      this.categoryFormGroup.get('picture').patchValue(this.newPicture.id);
    });
  }

  postFile(fileToUpload: File) {
    const endpoint = '/api/media/upload';
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post(endpoint, formData);
  }
}
