import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AnalyticsState } from './analytics.model';
import { AppState } from '../index';

export const selectAnalyticsState = createFeatureSelector<AppState, AnalyticsState>('analytics');

export const selectAnalyticsData = createSelector(
  selectAnalyticsState,
  state => state.data
);

export const selectAnalyticsLoading = createSelector(
  selectAnalyticsState,
  state => state.loading
);

export const selectAnalyticsError = createSelector(
  selectAnalyticsState,
  state => state.error
);