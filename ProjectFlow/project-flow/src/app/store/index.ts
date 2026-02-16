import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromProject from './project/project.reducer';
import * as fromTask from './task/task.reducer';
import * as fromAnalytics from './analytics/analytics.reducer';
import { ProjectState } from './project/project.model';
import { TaskState } from './task/task.model';
import { AnalyticsState } from './analytics/analytics.model';

export interface AppState {
  projects: ProjectState;
  tasks: TaskState;
  analytics: AnalyticsState;
}

export const reducers: ActionReducerMap<AppState> = {
  projects: fromProject.reducer,
  tasks: fromTask.reducer,
  analytics: fromAnalytics.reducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];