import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubredditStats } from '../models/subreddit-stats';

const ENDPOINT = 'https://www.reddit.com/r/';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

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

  private getEndpoint(subreddit: string): string {
    return (ENDPOINT + subreddit.trim().replace(/[/\\]/ig, '') + '/about.json');
  }
}
