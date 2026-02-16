import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import { AppState } from '../../../../store';
import { Project } from '../../../../store/project/project.model';
import { selectAllProjects, selectProjectsLoading } from '../../../../store/project/project.selectors';
import { loadProjects } from '../../../../store/project/project.actions';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects$: Observable<Project[]> = this.store.select(selectAllProjects);
  loading$: Observable<boolean> = this.store.select(selectProjectsLoading);

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(loadProjects());
  }

  getStatusClass(status: string): string {
    return `status-${status}`;
  }
}