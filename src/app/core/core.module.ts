import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';
import { environment } from '@env/environment';
import { LocalStorageService } from './local-storage/local-storage.service';
import { AnimationsService } from './animations/animations.service';
import { TitleService } from './title/title.service';
import { reducers, metaReducers } from './core.state';
import { AppErrorHandler } from './error-handler/app-error-handler.service';
import { CustomSerializer } from './router/custom-serializer';
import { NotificationService } from './notifications/notification.service';
import { GoogleAnalyticsEffects } from './google-analytics/google-analytics.effects';
import { AuthEffects } from './auth/store/auth.effects';
import { AuthModule } from './auth/auth.module';
import { AuthGuardService } from './auth/auth-guard.service';
import { GraphqlModule } from './graphql/graphql.module';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { NotFoundComponent } from '@app/static/notfound/notfound.component';

@NgModule({
  imports: [
    // angular
    CommonModule,
    HttpClientModule,
    // auth
    AuthModule,
    // ngrx
    GraphqlModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([AuthEffects, GoogleAnalyticsEffects]),
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({
        name: 'Angular NgRx Material Starter'
      }),

    // 3rd party
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [],
  providers: [
    NotificationService,
    LocalStorageService,
    AuthGuardService,
    AnimationsService,
    TitleService,
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    {
      provide: HAMMER_LOADER,
      useValue: () => new Promise(() => { })
    }
  ],
  exports: [TranslateModule, NotFoundComponent]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `${environment.i18nPrefix}/assets/i18n/`,
    '.json'
  );
}
