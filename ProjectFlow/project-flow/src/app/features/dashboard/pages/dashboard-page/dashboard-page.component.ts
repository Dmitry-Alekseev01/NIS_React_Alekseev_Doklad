import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import { ProjectSummaryComponent } from '../../components/project-summary/project-summary.component';
import { ActivityChartComponent } from '../../components/activity-chart/activity-chart.component';
import { AppState } from '../../../../store';
import { selectAllProjects, selectProjectsLoading } from '../../../../store/project/project.selectors';
import { loadProjects } from '../../../../store/project/project.actions';
import { Project } from '../../../../store/project/project.model';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, ProjectSummaryComponent, ActivityChartComponent, TranslateModule],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  projects$: Observable<Project[]> = this.store.select(selectAllProjects);
  loading$: Observable<boolean> = this.store.select(selectProjectsLoading);

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(loadProjects());
  }
}