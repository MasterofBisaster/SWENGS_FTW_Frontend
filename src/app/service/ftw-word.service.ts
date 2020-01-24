import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class FtwWordService {

    constructor(private http: HttpClient) {
    }

    getFtwWords() {
        return this.http.get('/api/ftwword/list');
    }

  getSFWFtwWords() {
    return this.http.get('/api/ftwword/list/sfw');
  }
}
