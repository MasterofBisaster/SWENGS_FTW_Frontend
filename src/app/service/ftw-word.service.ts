import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FtwWordService {

  ftwWords = {
    f: 'f',
    t: 't',
    w: 'w'
  };

  constructor() {
  }
}
