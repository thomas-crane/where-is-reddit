import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubredditStats } from '../models/subreddit-stats';
import { Subject } from 'rxjs/Subject';
import { HttpErrorResponse } from '@angular/common/http';

const ENDPOINT = 'https://www.reddit.com/r/';

@Injectable()
export class ApiService {

  private _srList: string[];
  subreddits: Subject<string[]> = new Subject();

  constructor(private http: HttpClient) {
    this._srList = [
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
    this.subreddits.next(this._srList);
  }

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

  getSubreddits(): Subject<string[]> {
    return this.subreddits;
  }

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

  removeSubreddit(name: string): boolean {
    for (let i = 0; i < this._srList.length; i++) {
      const compareName = name.replace(/\/?r\//ig, '').toLowerCase();
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

  private updateSubredditList(): void {
    this.subreddits.next(this._srList);
  }

  private getEndpoint(subreddit: string): string {
    return (ENDPOINT + subreddit.trim().replace(/\/?r\//ig, '').replace(/[/\\]/ig, '') + '/about.json');
  }
}
