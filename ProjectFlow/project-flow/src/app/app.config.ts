import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxEchartsModule } from 'ngx-echarts'; 

import { routes } from './app.routes';
import { reducers, metaReducers } from './store';
import { ProjectEffects } from './store/project/project.effects';
import { TaskEffects } from './store/task/task.effects';
import { AnalyticsEffects } from './store/analytics/analytics.effects';
import { errorInterceptor } from './core/interceptors/http-error.interceptor';
import { environment } from '../environments/environment';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([errorInterceptor])),
    provideAnimations(),
    provideStore(reducers, { metaReducers }),
    provideEffects([ProjectEffects, TaskEffects, AnalyticsEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: environment.production }),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        },
        defaultLanguage: 'en'
      }),
      NgxEchartsModule.forRoot({
        echarts: () => import('echarts')
      })
    )
  ]
};