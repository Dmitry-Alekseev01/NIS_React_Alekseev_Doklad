import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { AppState } from '../../../../store';
import { Task } from '../../../../store/task/task.model';
import { addTask, updateTask } from '../../../../store/task/task.actions';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  task: Partial<Task> = {
    name: '',
    description: '',
    status: 'todo',
    assignedTo: [],
    dueDate: undefined
  };
  isEdit = false;
  taskId?: number;
  projectId?: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.projectId = Number(this.route.snapshot.queryParamMap.get('projectId'));
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.taskId = Number(id);
      this.task = {
        name: 'Sample Task',
        description: 'This is a sample task for editing',
        status: 'inProgress',
        assignedTo: ['User1'],
        dueDate: new Date()
      };
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;
    const taskData = { ...this.task, projectId: this.projectId };
    if (this.isEdit && this.taskId) {
      this.store.dispatch(updateTask({ id: this.taskId, changes: taskData }));
    } else {
      this.store.dispatch(addTask({ task: taskData }));
    }
    this.router.navigate(['/tasks']);
  }

  cancel() {
    this.router.navigate(['/tasks']);
  }
}