import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProjectState } from './project.model';
import { AppState } from '../index';

export const selectProjectState = createFeatureSelector<AppState, ProjectState>('projects');

export const selectAllProjects = createSelector(
  selectProjectState,
  state => state.projects
);

export const selectSelectedProjectId = createSelector(
  selectProjectState,
  state => state.selectedProjectId
);

export const selectSelectedProject = createSelector(
  selectAllProjects,
  selectSelectedProjectId,
  (projects, id) => id ? projects.find(p => p.id === id) : null
);

export const selectProjectsLoading = createSelector(
  selectProjectState,
  state => state.loading
);

export const selectProjectsError = createSelector(
  selectProjectState,
  state => state.error
);