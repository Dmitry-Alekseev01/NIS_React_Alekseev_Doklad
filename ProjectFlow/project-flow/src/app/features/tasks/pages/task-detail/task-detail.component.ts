import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import { AppState } from '../../../../store';
import { Task } from '../../../../store/task/task.model';
import { selectSelectedTask } from '../../../../store/task/task.selectors';
import { loadTasks, selectTask } from '../../../../store/task/task.actions';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  private mockTasks: Task[] = [
    { id: 1, projectId: 1, name: 'Design database schema', description: 'Create ERD and define tables', status: 'todo' },
    { id: 2, projectId: 1, name: 'Implement API endpoints', description: 'Build REST endpoints for projects', status: 'inProgress' },
    { id: 3, projectId: 2, name: 'Write documentation', description: 'Document the setup process', status: 'done' },
    { id: 4, projectId: 2, name: 'Create unit tests', description: 'Achieve 80% coverage', status: 'todo' }
  ];

  task$: Observable<Task | null> = this.store.select(selectSelectedTask);
  id: number;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.store.dispatch(selectTask({ id: this.id }));
    this.store.dispatch(loadTasks({}));
  }

  get currentTask(): Task | null {
    let task: Task | null = null;
    this.task$.subscribe(t => task = t).unsubscribe();
    if (task) return task;

    return this.mockTasks.find(t => t.id === this.id) || null;
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      todo: 'status-todo',
      inProgress: 'status-in-progress',
      done: 'status-done'
    };
    return map[status] || 'status-todo';
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      todo: 'To Do',
      inProgress: 'In Progress',
      done: 'Done'
    };
    return map[status] || status;
  }
}