import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import { AppState } from '../../../../store';
import { Task } from '../../../../store/task/task.model';
import { selectAllTasks, selectTasksLoading } from '../../../../store/task/task.selectors';
import { loadTasks } from '../../../../store/task/task.actions';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  mockTasks: Task[] = [
    { id: 1, projectId: 1, name: 'Design database schema', description: 'Create ERD and define tables', status: 'todo' },
    { id: 2, projectId: 1, name: 'Implement API endpoints', description: 'Build REST endpoints for projects', status: 'inProgress' },
    { id: 3, projectId: 2, name: 'Write documentation', description: 'Document the setup process', status: 'done' },
    { id: 4, projectId: 2, name: 'Create unit tests', description: 'Achieve 80% coverage', status: 'todo' }
  ];

  tasks$: Observable<Task[]> = this.store.select(selectAllTasks);
  loading$: Observable<boolean> = this.store.select(selectTasksLoading);

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(loadTasks({})); 
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