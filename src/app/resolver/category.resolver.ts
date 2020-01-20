import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {CategoryService} from '../service/category.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryResolver implements Resolve<Observable<any>> {
  constructor(private categoryService: CategoryService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.categoryService.getCategory(route.paramMap.get('id'));
  }
}
