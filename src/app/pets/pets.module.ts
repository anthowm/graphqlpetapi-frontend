import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MaterialModule } from '@app/shared/modules/common/material.module';

import { petsReducer } from './store/pets.reducer';
import { PetsEffects } from './store/pets.effects';
import { PetsComponent } from './components/pets.component';
import { CreatePetComponent } from './components/create-pet/create-pet.component';
import { ViewPetComponent } from './components/view-pet/view-pet.component';
import { PetsRoutingModule } from './pets-routing.module';
import { FormPetComponent } from './components/form-pet/form-pet.component';
import { EditPetComponent } from './components/edit-pet/edit-pet.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { PetListVirtualComponent } from './components/pet-list-virtual/pet-list-virtual.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
export class MultiTranslateHttpLoader implements TranslateLoader {

  constructor(private http: HttpClient,
    public resources: { prefix: string, suffix: string }[] = [{
      prefix: '/assets/i18n/',
      suffix: '.json'
    }]) { }

  /**
   * Gets the translations from the server
   * @param lang
   * @returns {any}
   */
  public getTranslation(lang: string): any {
    return forkJoin(this.resources.map(config => {
      return this.http.get(`${config.prefix}${lang}${config.suffix}`);
    })).pipe(map(response => {
      return response.reduce((a: any, b: any) => {
        const obj: any = Object.assign(a, b);
        return obj;
      });
    }));
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: `${environment.i18nPrefix}/assets/i18n/`, suffix: '.json' },
    { prefix: `${environment.i18nPrefix}/assets/i18n/pets/`, suffix: '.json' }
  ]);
}

@NgModule({
  imports: [
    MaterialModule,
    PetsRoutingModule,
    StoreModule.forFeature('pets', petsReducer),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true
    }),
    EffectsModule.forFeature([PetsEffects]),
    InfiniteScrollModule
  ],
  declarations: [
    PetsComponent,
    CreatePetComponent,
    ViewPetComponent,
    FormPetComponent,
    EditPetComponent,
    PetListVirtualComponent
  ],
  providers: [
  ]
})
export class PetsModule { }


