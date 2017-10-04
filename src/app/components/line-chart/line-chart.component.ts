import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import Chart from 'chart.js';
import { SubredditStats, SubredditStatSnapshot } from '../../models/subreddit-stats';
import * as moment from 'moment';

@Component({
  selector: 'wr-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, OnChanges {

  chart: Chart;

  @Input()
  chartData: SubredditStatSnapshot[];

  constructor() { }

  ngOnInit() {
    const elem: any = document.getElementById('line-chart');
    const ctx = elem.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: []
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        responsiveAnimationDuration: 0,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.chart) {
      return;
    }
    this.chart.data.labels = this.chartData.map(cd => moment(cd.timestamp).local().format('h:mm a'));

    const records = {};
    for (let i = 0; i < this.chartData.length; i++) {
      for (let n = 0; n < this.chartData[i].data.length; n++) {
        const srd = this.chartData[i].data[n];
        if (!records[srd.name]) {
          records[srd.name] = [];
        }
        records[srd.name].push(srd.active);
      }
    }

    const keys = Object.keys(records);
    for (let i = 0; i < keys.length; i++) {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      const color = 'rgba(' + r + ', ' + g + ', ' + b + ',';

      let replaced = false;
      for (let n = 0; n < this.chart.data.datasets.length; n++) {
        if (this.chart.data.datasets[n].label === keys[i]) {
          this.chart.data.datasets[n].data = records[keys[i]];
          replaced = true;
          break;
        }
      }
      if (!replaced) {
        this.chart.data.datasets.push({
          label: keys[i],
          data: records[keys[i]],
          borderColor: (color + ' .85)'),
          backgroundColor: (color + ' .1)')
        });
      }
    }

    this.chart.update();
  }
}
