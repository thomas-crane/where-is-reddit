import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { SubredditStatSnapshot } from '../models/subreddit-stats';

@Injectable()
export class DataService {

  constructor(private db: AngularFireDatabase) { }

  getHistoricalData(): Promise<SubredditStatSnapshot[]> {
    return new Promise((resolve, reject) => {
      const sub = this.db.list('historic', ref => ref.orderByChild('timestamp').limitToLast(12)).valueChanges();
      sub.subscribe((value) => {
        resolve(<SubredditStatSnapshot[]>value);
      }, (error) => {
        reject(error);
      });
    });
  }
}
