import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {
  }

  getComments() {
    return this.http.get('/api/comment/list');
  }

  createComment(comment) {
    return this.http.post('/api/comment/create', comment);
  }

  updateComment(comment) {
    return this.http.put('/api/comment/' + comment.id + '/update', location);
  }

  getComment(id) {
    return this.http.get('/api/comment/' + id + '/get');
  }

  deleteComment(comment) {
    return this.http.delete('/api/comment/' + comment.id + '/delete');
  }
}
