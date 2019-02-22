import { Injectable } from '@angular/core';
import { Observable, of, merge, EMPTY } from 'rxjs';
import { Action, Store, select } from '@ngrx/store';

import {
    PetActionTypes,
    RetrievePets,
    RetrievePetsSuccess,
    RetrievePet,
    RetrievePetSuccess,
    AddPet,
    AddSuccess,
    UpdatePet,
    UpdateSuccess,
    DeletePet,
    DeleteSuccess,
    RetrieveError,
    RemovePetConfirmDialogOpen,
} from './pets.actions';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, distinctUntilChanged, tap, filter } from 'rxjs/operators';
import { ConfirmDialogComponent } from '@app/core/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import {
    State
} from '../../core/settings/settings.model';
import { Router, ActivationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TitleService } from '@app/core';
import { selectSettingsState, SettingsActionTypes } from '@app/core/settings';
import { GetPetsGQL, GetPetGQL } from '@app/generated/graphql';
import { CreatePetGQL, UpdatePetGQL, DeletePetGQL } from '../pet.service';
import { QueryParamsPets } from './pets.model';

@Injectable()
export class PetsEffects {
    createPet: any;
    @Effect()
    retrievePets$: Observable<Action> = this.actions$.pipe(
        ofType(PetActionTypes.RETRIEVE_PETS),
        map((action: RetrievePets) => action.payload),
        switchMap((queryParams: QueryParamsPets) => {
            return this.getPetsGQL.watch(queryParams).valueChanges;
        }),
        map(({ data }) => {
            const pets = data.pets;
            return new RetrievePetsSuccess(pets);
        }),
        catchError(err => {
            return of(new RetrieveError({ error: err }));
        })
    );

    @Effect()
    retrievePet$: Observable<Action> = this.actions$.pipe(
        ofType(PetActionTypes.RETRIEVE_PET),
        map((action: RetrievePet) => action.payload),
        switchMap((id) => this.getPetGQL.watch({ id: id }).valueChanges),
        map(({ data }) => {
            return new RetrievePetSuccess(data.pet);
        }),
        catchError(err => {
            return of(new RetrieveError({ error: err }));
        })
    );

    @Effect()
    createPet$: Observable<Action> = this.actions$.pipe(
        ofType(PetActionTypes.CREATE_PET),
        map((action: AddPet) => action.payload),
        switchMap((pet: any) => {
            return this.createPetGQL.mutate({
                petInput: {
                    name: pet.name,
                    type: pet.type,
                    imageUrls: pet.imageUrls
                }
            });
        }),
        map((res: any) => {
            const createdPet = res.data.createPet;
            return new AddSuccess(createdPet);
        }),
        catchError(err => {
            return of(new RetrieveError({ error: err }));
        })
    );

    @Effect()
    updatePet$: Observable<Action> = this.actions$.pipe(
        ofType(PetActionTypes.UPDATE_PET),
        map((action: UpdatePet) => action.payload),
        switchMap((pet: any) => {
            return this.updatePetGQL.mutate({
                id: pet.index,
                petInput: {
                    name: pet.updatedPet.name,
                    type: pet.updatedPet.type,
                    imageUrls: pet.updatedPet.imageUrls
                }
            });
        }),
        map(({ data }: any) => {
            console.log(JSON.stringify(data));
            const petUpdated = data.updatePet;
            return new UpdateSuccess({ id: petUpdated.id, changes: petUpdated });
        }
        ),
        catchError(err => {
            return of(new RetrieveError({ error: err }));
        })
    );


    @Effect()
    deletePet$: Observable<Action> = this.actions$.pipe(
        ofType(PetActionTypes.DELETE_PET),
        map((action: DeletePet) => action.payload),
        switchMap((id) => {
            return this.deletePetGQL.mutate({
                id: id
            }).pipe(
                map(() => new DeleteSuccess(id))
            );
        }),
        catchError(err => {
            return of(new RetrieveError({ error: err }));
        })
    );

    @Effect()
    removeConfirmDialogOpen$: Observable<Action> = this.actions$.pipe(
        ofType(PetActionTypes.REMOVE_PET_CONFIRM_DIALOG_OPEN),
        map((action: RemovePetConfirmDialogOpen) => action.payload),
        switchMap(payload => {
            this.mdDialog.open(ConfirmDialogComponent, {
                data: payload
            });
            return EMPTY;
        })
    );

    @Effect({ dispatch: false })
    setTranslateServiceLanguage = this.store.pipe(
        select(selectSettingsState),
        map(settings => settings.language),
        distinctUntilChanged(),
        tap(language => this.translateService.use(language))
    );

    @Effect({ dispatch: false })
    setTitle = merge(
        this.actions$.pipe(ofType(SettingsActionTypes.CHANGE_LANGUAGE)),
        this.router.events.pipe(filter(event => event instanceof ActivationEnd))
    ).pipe(
        tap(() => {
            this.titleService.setTitle(
                this.router.routerState.snapshot.root,
                this.translateService
            );
        })
    );


    constructor(
        private actions$: Actions,
        private mdDialog: MatDialog,
        private store: Store<State>,
        private translateService: TranslateService,
        private router: Router,
        private titleService: TitleService,
        private getPetsGQL: GetPetsGQL,
        private getPetGQL: GetPetGQL,
        private updatePetGQL: UpdatePetGQL,
        private createPetGQL: CreatePetGQL,
        private deletePetGQL: DeletePetGQL
    ) { }

}
