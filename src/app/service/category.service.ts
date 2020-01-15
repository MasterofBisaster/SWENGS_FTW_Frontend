import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  getCategories() {
    return this.http.get('/api/category/list');
  }

  createCategory(category) {
    return this.http.post('/api/category/create', category);
  }

  updateCategory(category) {
    return this.http.put('/api/category/' + category.id + '/update', location);
  }

  getCategory(id) {
    return this.http.get('/api/category/' + id + '/get');
  }

  deleteCategory(category) {
    return this.http.delete('/api/category/' + category.id + '/delete');
  }
}
