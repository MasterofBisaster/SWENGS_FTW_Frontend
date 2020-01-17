import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {EventService} from '../service/event.service';
import {LocationService} from '../service/location.service';
import {CategoryService} from '../service/category.service';

@Injectable({
  providedIn: 'root'
})
export class CategorySearchResolver implements Resolve<Observable<any>> {
  constructor(private categoryService: CategoryService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.categoryService.getSearchCategories(route.paramMap.get('searchString'));
  }
}
