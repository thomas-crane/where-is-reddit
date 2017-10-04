import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import Chart from 'chart.js';
import { SubredditStats } from '../../models/subreddit-stats';

@Component({
  selector: 'wr-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, OnChanges {

  chart: Chart;

  @Input()
  chartData: SubredditStats[];

  constructor() {
    this.chartData = [];
  }

  ngOnInit() {
    const elem: any = document.getElementById('chart');
    const ctx = elem.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'Active users',
          data: [],
          backgroundColor: 'rgba(62,172,255,0.5)',
          borderColor: 'rgba(62,172,255,1)',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        responsiveAnimationDuration: 0
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.chart) {
      this.chart.data.labels = this.chartData.map(srd => srd.name);
      this.chart.data.datasets[0].data = this.chartData.map(srd => srd.active);
      this.chart.update();
    }
  }
}
