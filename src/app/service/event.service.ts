import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) {
  }

  getEvents() {
    return this.http.get('/api/event/list');
  }

  getSearchEvents(searchString) {
    return this.http.get('/api/event/list/search/' + searchString);
  }

  createEvent(event) {
    return this.http.post('/api/event/create', event);
  }

  updateEvent(event) {
    return this.http.put('/api/event/' + event.id + '/update', event);
  }

  getEvent(id) {
    return this.http.get('/api/event/' + id + '/get');
  }

  getEventDetail(id) {
    return this.http.get('/api/event/' + id + '/detail');
  }

    deleteEvent(event) {
        return this.http.delete('/api/event/' + event + '/delete');
    }

    getEventsByUser(userId) {
      return this.http.get('api/user/event/' + userId);
    }

    attendOrNotToEvent(eventId, userId) {
        return this.http.put('/api/event/add-user/' + eventId + '/' + userId, eventId, userId);
    }

  getEventsByLocation(locationId) {
    return this.http.get('api/event/list/location/' + locationId);
  }

  getEventsByCategory(categoryId) {
    return this.http.get('api/event/list/category/' + categoryId);
  }
}
