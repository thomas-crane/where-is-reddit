import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubredditStats } from '../models/subreddit-stats';
import { Subject } from 'rxjs/Subject';
import { HttpErrorResponse } from '@angular/common/http';
import { getRawSubredditName } from '../utils/string-utils';

const ENDPOINT = 'https://www.reddit.com/r/';
const DEFAULT_SUBREDDITS = [
  'askreddit',
  'news',
  'pics',
  'worldnews',
  'funny',
  'todayilearned',
  'aww',
  'videos',
  'gaming',
  'gifs',
  'nottheonion',
  'showerthoughts',
  'movies',
  'mildlyinteresting',
  'jokes',
  'adviceanimals'
];

@Injectable()
export class ApiService {

  /**
   * The internal list of subreddits used to update the
   * public Subject subreddits.
   */
  private _srList: string[];
  /**
   * The observable list of subreddits.
   */
  subreddits: Subject<string[]> = new Subject();

  constructor(private http: HttpClient) {
    this._srList = DEFAULT_SUBREDDITS;
    this.subreddits.next(this._srList);
  }

  /**
   * Returns the default list of monitored subreddits. These are also
   * the only subreddits which currently have historical data.
   *
   * @example
   * this.subreddits = apiService.getDefaultSubreddits();
   */
  getDefaultSubreddits(): string[] {
    return DEFAULT_SUBREDDITS;
  }

  /**
   * Gets important info from the subreddit/about.json file.
   * @returns A promise which will resolve with the info
   * or be rejected with the error.
   * @param subreddit The subreddit to get stats of.
   *
   * @example
   * getStats('askreddit').then(stats => {
   *    console.log(JSON.stringify(stats));
   *    // {
   *    //    "url": "/r/askreddit",
   *    //    "active": 65023,
   *    //    "name": "r/AskReddit",
   *    //    "subscribers": "17980000"
   *    // }
   * }).catch(error => {
   *    console.log('Error: ' + error.message);
   * });
   */
  getStats(subreddit: string): Promise<SubredditStats> {
    return new Promise((resolve, reject) => {
      const url = this.getEndpoint(subreddit);
      this.http.get(url).subscribe(data => {
        resolve({
          url: data['data'].url,
          name: data['data'].display_name_prefixed,
          active: data['data'].accounts_active,
          subscribers: data['data'].subscribers
        });
      }, (error) => {
        reject(error);
      });
    });
  }

  /**
   * Checks if the subreddit is valid (doesn't return a 404).
   * @returns A promise which always resolves with either
   * true or false.
   *
   * @param subreddit The subreddit to check the validity of.
   *
   * @example
   * checkValidity('pics').then((isValid) => {
   *    if (!isValid) {
   *      return;
   *    }
   *    nextProcess();
   * });
   */
  checkValidity(subreddit: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const url = this.getEndpoint(subreddit);
      this.http.get(url).subscribe((data) => {
        resolve(true);
        return;
      }, (error: HttpErrorResponse) => {
        resolve(false);
        return;
      });
    });
  }

  /**
   * Gets a list of the subreddits currently being monitored.
   * @returns A Subject<string[]> which is observable.
   *
   * @example
   * getSubreddits().subscribe((subreddits) => {
   *    this.subreddits = subreddits;
   * });
   */
  getSubreddits(): Subject<string[]> {
    return this.subreddits;
  }

  /**
   * Adds a new subreddit to the list of monitored subreddits.
   * @returns A boolean. If the boolean is true, the subreddit
   * was added to the monitored list. If it is false, the
   * subreddit was not added.
   * @param name The subreddit to add.
   *
   * @example
   * if(!addSubreddit('television')) {
   *    showError('Could not add subreddit');
   * }
   */
  addSubreddit(name: string): boolean {
    for (let i = 0; i < this._srList.length; i++) {
      if (this._srList[i] === name) {
        return false;
      }
    }

    const newArray = this._srList.slice();
    newArray.push(name.toLowerCase());
    this._srList = newArray;
    this.updateSubredditList();
    return true;
  }

  /**
   * Removes the subreddit from the list of monitored subreddits.
   * @returns A boolean. If the boolean is true, the subreddit
   * was removed from the monitored list. If it is false, the
   * subreddit was not added.
   * @param name The subreddit to remove.
   *
   * @example
   * if(!removeSubreddit('television')) {
   *    showError('Could not remove subreddit');
   * }
   */
  removeSubreddit(name: string): boolean {
    for (let i = 0; i < this._srList.length; i++) {
      const compareName = getRawSubredditName(name);
      if (this._srList[i] === compareName) {
        const copy = this._srList.slice();
        copy.splice(i, 1);
        this._srList = copy;
        this.updateSubredditList();
        return true;
      }
    }
    this.updateSubredditList();
    return false;
  }

  /**
   * Updates the observable subreddits field with
   * the latest list of monitored subreddits.
   */
  private updateSubredditList(): void {
    this.subreddits.next(this._srList);
  }

  /**
   * Turns a subreddit into an endpoint for the about.json file.
   * Removes any leading or trailing slashes (/ and \), and prepends
   * the ENDPOINT const.
   * @param subreddit The subreddit to turn into an endpoint.
   */
  private getEndpoint(subreddit: string): string {
    return (ENDPOINT + getRawSubredditName(subreddit).replace(/[/\\]/ig, '') + '/about.json');
  }
}
