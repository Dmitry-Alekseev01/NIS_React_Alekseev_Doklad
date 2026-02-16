import { Component, Input, OnChanges } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-burn-down-chart',
  standalone: true,
  imports: [NgxEchartsModule],
  template: `<div echarts [options]="chartOption" class="chart"></div>`,
  styles: ['.chart { width: 100%; height: 350px; }']
})
export class BurnDownChartComponent implements OnChanges {
  @Input() data: any;

  chartOption: EChartsOption = {};

  ngOnChanges() {
    this.buildChart();
  }

  private buildChart() {
    if (!this.data || !this.data.burndown) {
      this.chartOption = {
        title: {
          text: 'No data available',
          left: 'center',
          top: 'center'
        }
      };
      return;
    }

    this.chartOption = {
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: this.data.burndown.dates },
      yAxis: { type: 'value', name: 'Remaining Tasks' },
      series: [
        { name: 'Ideal', type: 'line', data: this.data.burndown.ideal, lineStyle: { type: 'dashed' } },
        { name: 'Actual', type: 'line', data: this.data.burndown.actual }
      ]
    };
  }
}