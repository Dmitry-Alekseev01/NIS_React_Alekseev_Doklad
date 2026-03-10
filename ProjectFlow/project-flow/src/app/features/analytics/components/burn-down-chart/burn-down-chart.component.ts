// import { Component, Input, OnChanges } from '@angular/core';
// import { NgxEchartsModule } from 'ngx-echarts';
// import { EChartsOption } from 'echarts';

// @Component({
//   selector: 'app-burn-down-chart',
//   standalone: true,
//   imports: [NgxEchartsModule],
//   template: `<div echarts [options]="chartOption" class="chart"></div>`,
//   styles: ['.chart { width: 100%; height: 350px; }']
// })
// export class BurnDownChartComponent implements OnChanges {
//   @Input() data: any;

//   chartOption: EChartsOption = {};

//   ngOnChanges() {
//     this.buildChart();
//   }

//   private buildChart() {
//     if (!this.data || !this.data.burndown) {
//       this.chartOption = {
//         title: {
//           text: 'No data available',
//           left: 'center',
//           top: 'center'
//         }
//       };
//       return;
//     }

//     this.chartOption = {
//       tooltip: { trigger: 'axis' },
//       xAxis: { type: 'category', data: this.data.burndown.dates },
//       yAxis: { type: 'value', name: 'Remaining Tasks' },
//       series: [
//         { name: 'Ideal', type: 'line', data: this.data.burndown.ideal, lineStyle: { type: 'dashed' } },
//         { name: 'Actual', type: 'line', data: this.data.burndown.actual }
//       ]
//     };
//   }
// }


import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-burn-down-chart',
  standalone: true,
  imports: [NgxEchartsModule],
  template: `<div echarts [options]="chartOption" class="chart"></div>`,
  styles: ['.chart { width: 100%; height: 350px; }']
})
export class BurnDownChartComponent implements OnChanges, OnDestroy {
  @Input() data: any;
  chartOption: EChartsOption = {};
  private destroy$ = new Subject<void>();

  constructor(private translate: TranslateService) {
    // Перерисовываем при смене языка
    this.translate.onLangChange
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.buildChart());
  }

  ngOnChanges() {
    this.buildChart();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private buildChart() {
    if (!this.data || !this.data.burndown) {
      this.chartOption = {
        title: {
          text: this.translate.instant('noData'),
          left: 'center',
          top: 'center'
        }
      };
      return;
    }

    this.chartOption = {
      title: {
        text: this.translate.instant('burndownChart'),
        left: 'center'
      },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: this.data.burndown.dates,
        axisLabel: { color: '#64748b' }
      },
      yAxis: {
        type: 'value',
        name: this.translate.instant('remainingTasks'),
        nameTextStyle: { color: '#334155' },
        axisLabel: { color: '#64748b' }
      },
      series: [
        {
          name: this.translate.instant('ideal'),
          type: 'line',
          data: this.data.burndown.ideal,
          lineStyle: { type: 'dashed', color: '#94a3b8' }
        },
        {
          name: this.translate.instant('actual'),
          type: 'line',
          data: this.data.burndown.actual,
          lineStyle: { color: '#3b82f6' }
        }
      ]
    };
  }
}