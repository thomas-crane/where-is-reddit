import { Component, OnInit } from '@angular/core';
import { SubredditStats, SubredditStatSnapshot } from '../../models/subreddit-stats';
import { ChartData } from '../../models/chart-data';
import { ApiService } from '../../services/api.service';
import { DataService } from '../../services/data.service';
import { getRawSubredditName } from '../../utils/string-utils';

import Chart from 'chart.js';

@Component({
  selector: 'wr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  mostBrowsedSubredditList: SubredditStats[];

  subredditData: SubredditStats[];

  activeUsersTotal: number;

  subreddits: string[];

  lineChartData: SubredditStatSnapshot[];

  constructor(private apiService: ApiService, private dataService: DataService) {
    this.mostBrowsedSubredditList = [];
    this.subredditData = [];
    this.activeUsersTotal = 0;

    this.subreddits = this.apiService.getDefaultSubreddits();
  }

  ngOnInit() {
    this.apiService.getSubreddits().subscribe((srList) => {
      this.subreddits = srList;
      if (!this.subreddits) {
        this.subreddits = [];
      }
      this.subredditData = this.subredditData.filter(sr => srList.includes(getRawSubredditName(sr.name)));
      this.updateSubreddits();
    });
    this.updateSubreddits();
    this.dataService.getHistoricalData().then((data) => this.lineChartData = data);

    setInterval(() => {
      this.updateSubreddits();
      this.dataService.getHistoricalData().then((data) => this.lineChartData = data);
      console.log('Refreshed data.');
    }, 30000);
  }

  updateSubreddits(): void {
    if (this.subreddits.length === 0) {
      this.integrateNewData(null);
      return;
    }
    for (let i = 0; i < this.subreddits.length; i++) {
      const sr = this.subreddits[i];
      this.apiService.getStats(sr).then((data) => {
        this.integrateNewData(data);
      }).catch((error) => {
        console.log('Failed to load ' + sr);
      });
    }
  }

  integrateNewData(data: SubredditStats) {
    const all = this.subredditData.slice();
    if (data) {
      let found = false;
      for (let i = 0; i < all.length; i++) {
        if (all[i].name === data.name) {
          all[i] = data;
          found = true;
        }
      }
      if (!found) {
        all.push(data);
      }
    }

    this.activeUsersTotal = all.reduce((sum, d) => {
      return sum + d.active;
    }, 0);

    all.map((srStat) => {
      srStat['percentage_total'] = Math.round((srStat.active / this.activeUsersTotal) * 100);
    });
    this.mostBrowsedSubredditList = all.sort((a, b) => b.active - a.active).slice(0, 3);

    this.subredditData = all;
  }
}
