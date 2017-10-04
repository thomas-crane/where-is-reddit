import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { SubredditStatSnapshot } from '../models/subreddit-stats';

@Injectable()
export class DataService {

  constructor(private db: AngularFireDatabase) { }

  /**
   * Gets an array of historical data about all of the subreddits
   * in the ApiService DEFAULT_SUBREDDITS array.
   * @returns A promise which resolves with the data or gets
   * rejected with the error.
   *
   * @example
   * getHistoricalData().then((stats) => {
   *    console.log(stats.timestamp);
   *    for (let i = 0; i < stats.length; i++) {
   *        const stat = stats[i];
   *        for (let j = 0; j < stat.data.length; j++) {
   *            const info = stat.data[j];
   *            console.log('This is data for the subreddit: ' + info.name);
   *        }
   *    }
   * }).catch((error) => {
   *    console.log(error.message);
   * });
   */
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
