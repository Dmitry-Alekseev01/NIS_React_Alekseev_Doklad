import { createReducer, on } from '@ngrx/store';
import * as AnalyticsActions from './analytics.actions';
import { AnalyticsState } from './analytics.model';

export const initialState: AnalyticsState = {
  data: null,
  loading: false,
  error: null
};

export const reducer = createReducer(
  initialState,
  on(AnalyticsActions.loadAnalytics, state => ({ ...state, loading: true })),
  on(AnalyticsActions.loadAnalyticsSuccess, (state, { data }) => ({
    ...state,
    data,
    loading: false,
    error: null
  })),
  on(AnalyticsActions.loadAnalyticsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);