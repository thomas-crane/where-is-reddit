import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { SubredditStatSnapshot } from '../models/subreddit-stats';

@Injectable()
export class DataService {

  granularity = 3;
  loadCount = 24;

  constructor(private db: AngularFireDatabase) { }

  /**
   * Updates the loadCount value. This controls
   * how many SubredditStatSnapshots will be loaded.
   * The snapshots are 5 minutes apart, so a loadCount
   * of 12 would be 1 hour of data.
   * @param newCount The new loudCount value.
   */
  updateLoadCount(newCount: number): void {
    this.loadCount = newCount;
  }

  /**
   * Updates the granularity value. This controls how
   * 'fine' the data is. getHistoricalData will return all
   * data except every Nth element where N is the granularity
   * value. E.g. if the granularity is 5, every 5th element of the
   * historical data will be removed.
   * @param newGranularity The new granularity value.
   */
  updateGranularity(newGranularity: number): void {
    this.granularity = newGranularity;
  }

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
      const sub = this.db.list('historic', ref => ref.orderByChild('timestamp').limitToLast(this.loadCount)).valueChanges();
      sub.subscribe((value) => {
        if (value.length / this.granularity < 2) {
          this.granularity = (value.length / 2);
        }
        value = value.filter((element, i) => {
          return ((i + 1) % this.granularity === 0);
        });
        resolve(<SubredditStatSnapshot[]>value);
      }, (error) => {
        reject(error);
      });
    });
  }
}
