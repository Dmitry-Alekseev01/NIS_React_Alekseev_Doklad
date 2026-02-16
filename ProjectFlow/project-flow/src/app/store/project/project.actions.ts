import { createAction, props } from '@ngrx/store';
import { Project } from './project.model';

export const loadProjects = createAction('[Project] Load Projects');
export const loadProjectsSuccess = createAction('[Project] Load Projects Success', props<{ projects: Project[] }>());
export const loadProjectsFailure = createAction('[Project] Load Projects Failure', props<{ error: string }>());
export const selectProject = createAction('[Project] Select Project', props<{ id: number }>());
export const addProject = createAction('[Project] Add Project', props<{ project: Partial<Project> }>());
export const addProjectSuccess = createAction('[Project] Add Project Success', props<{ project: Project }>());
export const addProjectFailure = createAction('[Project] Add Project Failure', props<{ error: string }>());
export const updateProject = createAction('[Project] Update Project', props<{ id: number; changes: Partial<Project> }>());
export const updateProjectSuccess = createAction('[Project] Update Project Success', props<{ project: Project }>());
export const updateProjectFailure = createAction('[Project] Update Project Failure', props<{ error: string }>());
export const deleteProject = createAction('[Project] Delete Project', props<{ id: number }>());
export const deleteProjectSuccess = createAction('[Project] Delete Project Success', props<{ id: number }>());
export const deleteProjectFailure = createAction('[Project] Delete Project Failure', props<{ error: string }>());
export const projectUpdatedFromSocket = createAction('[Project] Updated From Socket', props<{ project: Project }>());