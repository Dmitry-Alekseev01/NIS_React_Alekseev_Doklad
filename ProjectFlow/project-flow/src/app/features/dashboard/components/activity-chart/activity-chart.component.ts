import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { Project } from '../../../../store/project/project.model';
import { format, subDays } from 'date-fns';

@Component({
  selector: 'app-activity-chart',
  standalone: true,
  imports: [NgxEchartsModule],
  template: `<div echarts [options]="chartOption" class="chart"></div>`,
  styles: [`
    .chart {
      width: 100%;
      height: 350px;
    }
  `]
})
export class ActivityChartComponent implements OnChanges {
  @Input() projects: Project[] | null = [];

  chartOption: EChartsOption = {};

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ActivityChartComponent projects received:', this.projects);
    if (this.projects) {
      this.buildChart();
    }
  }

  private buildChart(): void {
    const dates = Array.from({ length: 7 }, (_, i) => format(subDays(new Date(), i), 'MMM dd')).reverse();
    let activityData: number[];
    if (this.projects && this.projects.length > 0) {
      activityData = dates.map(() => Math.floor(Math.random() * (this.projects!.length + 2)) + 1);
    } else {
      activityData = dates.map(() => Math.floor(Math.random() * 5) + 1);
    }

    this.chartOption = {
      title: {
        text: 'Project Activity',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'normal', color: '#334155' }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '5%',
        top: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: dates,
        axisLabel: { color: '#64748b' },
        axisLine: { show: false },
        axisTick: { show: false }
      },
      yAxis: {
        type: 'value',
        splitLine: { lineStyle: { color: '#e2e8f0', type: 'dashed' } },
        axisLabel: { color: '#64748b' }
      },
      series: [
        {
          name: 'Activity',
          type: 'bar',
          data: activityData,
          itemStyle: {
            borderRadius: [4, 4, 0, 0],
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: '#3b82f6' },
                { offset: 1, color: '#8b5cf6' }
              ]
            }
          },
          barWidth: '60%'
        }
      ]
    };
  }
}