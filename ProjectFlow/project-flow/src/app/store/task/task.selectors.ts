import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TaskState } from './task.model';
import { AppState } from '../index';

export const selectTaskState = createFeatureSelector<AppState, TaskState>('tasks');

export const selectAllTasks = createSelector(
  selectTaskState,
  state => state.tasks
);

export const selectSelectedTaskId = createSelector(
  selectTaskState,
  state => state.selectedTaskId
);

export const selectSelectedTask = createSelector(
  selectAllTasks,
  selectSelectedTaskId,
  (tasks, id) => id ? tasks.find(t => t.id === id) ?? null : null
);

export const selectTasksLoading = createSelector(
  selectTaskState,
  state => state.loading
);

export const selectTasksError = createSelector(
  selectTaskState,
  state => state.error
);