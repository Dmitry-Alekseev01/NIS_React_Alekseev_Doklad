import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../../../store/task/task.model';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent {
  @Input() tasks: Task[] = [];

  get todoTasks() {
    return this.tasks.filter(t => t.status === 'todo');
  }

  get inProgressTasks() {
    return this.tasks.filter(t => t.status === 'inProgress');
  }

  get doneTasks() {
    return this.tasks.filter(t => t.status === 'done');
  }
}