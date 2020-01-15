import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) {
  }

  getLocations() {
    return this.http.get('/api/location/list');
  }

  createLocation(location) {
    return this.http.post('/api/location/create', location);
  }

  updateLocation(location) {
    return this.http.put('/api/location/' + location.id + '/update', location);
  }

  getLocation(id) {
    return this.http.get('/api/location/' + id + '/get');
  }

  deleteLocation(location) {
    return this.http.delete('/api/location/' + location.id + '/delete');
  }
}
