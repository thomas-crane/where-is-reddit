import { Component, OnInit } from '@angular/core';
import { SubredditStats } from '../../models/subreddit-stats';
import { ChartData } from '../../models/chart-data';
import { ApiService } from '../../services/api.service';

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

  chartData: ChartData;

  constructor(private apiService: ApiService) {
    this.mostBrowsedSubredditList = [];
    this.subredditData = [];
    this.activeUsersTotal = 0;
    this.chartData = {
      datasets: [{
        label: 'Loading',
        data: [0],
        backgroundColor: 'rgba(62,172,255,0.5)',
        borderColor: 'rgba(62,172,255,1)',
        borderWidth: 2
      }],
      labels: [
        'Loading'
      ]
    }

    this.subreddits = [];
    this.apiService.getSubreddits().subscribe((srList) => {
      console.log('Subscription fired!');
      this.subreddits = srList;
      if (!this.subreddits) {
        this.subreddits = [];
      }
      this.subredditData = this.subredditData.filter(sr => srList.includes(sr.name));
      console.log(this.subredditData);
      this.updateSubreddits();
    });
  }

  ngOnInit() {

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

    this.chartData = {
      datasets: [{
        label: 'Active users',
        data: all.map(srd => srd.active),
        backgroundColor: 'rgba(62,172,255,0.5)',
        borderColor: 'rgba(62,172,255,1)',
        borderWidth: 2
      }],
      labels: all.map(srd => srd.name),
    };

    this.subredditData = all;
  }
}
