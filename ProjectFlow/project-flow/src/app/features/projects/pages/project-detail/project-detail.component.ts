import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import { AppState } from '../../../../store';
import { Project } from '../../../../store/project/project.model';
import { selectSelectedProject } from '../../../../store/project/project.selectors';
import { loadProjects, selectProject } from '../../../../store/project/project.actions';
import { DateFormatPipe } from '../../../../shared/pipes/date-format.pipe';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, DateFormatPipe],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  project$: Observable<Project | null | undefined> = this.store.select(selectSelectedProject);

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(selectProject({ id }));
    this.store.dispatch(loadProjects());
  }

  getStatusClass(status: string): string {
    return `status-${status}`;
  }
}