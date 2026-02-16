import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import { AppState } from '../../../../store';
import { Project } from '../../../../store/project/project.model';
import { AnalyticsData } from '../../../../store/analytics/analytics.model';
import { selectAllProjects, selectProjectsLoading } from '../../../../store/project/project.selectors';
import { selectAnalyticsData, selectAnalyticsLoading } from '../../../../store/analytics/analytics.selectors';
import { loadProjects } from '../../../../store/project/project.actions';
import { loadAnalytics } from '../../../../store/analytics/analytics.actions';
import { BurnDownChartComponent } from '../../components/burn-down-chart/burn-down-chart.component';
import { DependencyGraphComponent } from '../../components/dependency-graph/dependency-graph.component';

@Component({
  selector: 'app-analytics-page',
  standalone: true,
  imports: [CommonModule, BurnDownChartComponent, DependencyGraphComponent, TranslateModule],
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.scss']
})
export class AnalyticsPageComponent implements OnInit {
  projects$: Observable<Project[]> = this.store.select(selectAllProjects);
  projectsLoading$: Observable<boolean> = this.store.select(selectProjectsLoading);
  analyticsData$: Observable<AnalyticsData | null> = this.store.select(selectAnalyticsData);
  analyticsLoading$: Observable<boolean> = this.store.select(selectAnalyticsLoading);
  selectedProjectId: number | null = null;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(loadProjects());
  }

  onProjectChange(event: Event) {
    const projectId = Number((event.target as HTMLSelectElement).value);
    this.selectedProjectId = projectId;
    this.store.dispatch(loadAnalytics({ projectId }));
  }
}