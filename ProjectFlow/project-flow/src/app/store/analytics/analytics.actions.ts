import { createAction, props } from '@ngrx/store';
import { AnalyticsData } from './analytics.model';

export const loadAnalytics = createAction('[Analytics] Load Analytics', props<{ projectId: number }>());
export const loadAnalyticsSuccess = createAction('[Analytics] Load Analytics Success', props<{ data: AnalyticsData }>());
export const loadAnalyticsFailure = createAction('[Analytics] Load Analytics Failure', props<{ error: string }>());