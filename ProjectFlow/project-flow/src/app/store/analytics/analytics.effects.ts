import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ApiService } from '../../core/services/api.service';
import * as AnalyticsActions from './analytics.actions';

@Injectable()
export class AnalyticsEffects {
  constructor(
    private actions$: Actions,
    private api: ApiService
  ) {}

  loadAnalytics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnalyticsActions.loadAnalytics),
      mergeMap(action =>
        this.api.getAnalytics(action.projectId).pipe(
          map(data => AnalyticsActions.loadAnalyticsSuccess({ data })),
          catchError(error => of(AnalyticsActions.loadAnalyticsFailure({ error: error.message })))
        )
      )
    )
  );
}