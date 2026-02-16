import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { ApiService } from '../../core/services/api.service';
import * as ProjectActions from './project.actions';

@Injectable()
export class ProjectEffects {
  constructor(
    private actions$: Actions,
    private api: ApiService
  ) {
    console.log('ProjectEffects CONSTRUCTOR CALLED');
  }

  loadProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.loadProjects),
      tap(() => console.log('EFFECT: loadProjects action caught')),
      mergeMap(() =>
        this.api.getProjects().pipe(
          tap(projects => console.log('API getProjects result:', projects)),
          map(projects => {
            console.log('EFFECT: dispatching loadProjectsSuccess');
            return ProjectActions.loadProjectsSuccess({ projects });
          }),
          catchError(error => {
            console.error('EFFECT: API error', error);
            return of(ProjectActions.loadProjectsFailure({ error: error.message }));
          })
        )
      )
    )
  );
}