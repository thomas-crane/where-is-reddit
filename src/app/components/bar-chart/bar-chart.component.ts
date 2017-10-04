import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import Chart from 'chart.js';
import { ChartData } from '../../models/chart-data';

@Component({
  selector: 'wr-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, OnChanges {

  @Input()
  chartData: ChartData;
  chart: Chart;

  constructor() {
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
    this.chart = null;
  }

  ngOnInit() {
    const elem: any = document.getElementById('chart');
    const ctx = elem.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: this.chartData,
      options: {
        responsive: true,
        maintainAspectRatio: true,
        responsiveAnimationDuration: 0
      }
    });
    this.updateChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.chartData.currentValue !== changes.chartData.previousValue) {
      this.updateChart();
    }
  }

  private updateChart() {
    if (this.chart) {
      this.chart.data = this.chartData;
      this.chart.update();
    }
  }

}
