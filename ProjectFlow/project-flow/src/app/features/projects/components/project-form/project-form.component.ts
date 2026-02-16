import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { AppState } from '../../../../store';
import { Project } from '../../../../store/project/project.model';
import { addProject, updateProject } from '../../../../store/project/project.actions';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  project: Partial<Project> = {
    name: '',
    description: '',
    status: 'active',
    progress: 0,
    team: []
  };
  isEdit = false;
  projectId?: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.projectId = Number(id);
      this.project = {
        name: 'Sample Project',
        description: 'This is a sample project for editing',
        status: 'active',
        progress: 50,
        team: ['Alice', 'Bob']
      };
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    if (this.isEdit && this.projectId) {
      this.store.dispatch(updateProject({ id: this.projectId, changes: this.project }));
    } else {
      this.store.dispatch(addProject({ project: this.project }));
    }
    this.router.navigate(['/projects']);
  }

  cancel() {
    this.router.navigate(['/projects']);
  }
}