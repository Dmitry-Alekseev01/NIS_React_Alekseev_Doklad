import { createReducer, on } from '@ngrx/store';
import * as ProjectActions from './project.actions';
import { ProjectState } from './project.model';

export const initialState: ProjectState = {
  projects: [],
  selectedProjectId: null,
  loading: false,
  error: null
};

export const reducer = createReducer(
  initialState,
  on(ProjectActions.loadProjects, state => {
    console.log('[REDUCER] loadProjects', state);
    return { ...state, loading: true };
  }),
  on(ProjectActions.loadProjectsSuccess, (state, { projects }) => {
    console.log('[REDUCER] loadProjectsSuccess', projects);
    return { ...state, projects, loading: false, error: null };
  }),
  on(ProjectActions.loadProjectsFailure, (state, { error }) => {
    console.error('[REDUCER] loadProjectsFailure', error);
    return { ...state, loading: false, error };
  }),
  on(ProjectActions.selectProject, (state, { id }) => ({
    ...state,
    selectedProjectId: id
  })),
  on(ProjectActions.addProjectSuccess, (state, { project }) => ({
    ...state,
    projects: [...state.projects, project]
  })),
  on(ProjectActions.updateProjectSuccess, (state, { project }) => ({
    ...state,
    projects: state.projects.map(p => p.id === project.id ? project : p)
  })),
  on(ProjectActions.deleteProjectSuccess, (state, { id }) => ({
    ...state,
    projects: state.projects.filter(p => p.id !== id)
  })),
  on(ProjectActions.projectUpdatedFromSocket, (state, { project }) => ({
    ...state,
    projects: state.projects.map(p => p.id === project.id ? project : p)
  }))
);