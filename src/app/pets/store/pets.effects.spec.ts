import { TitleService } from '@app/core';
import { TranslateService } from '@ngx-translate/core';
import { ActionSettingsChangeLanguage } from '@app/core/settings';
import { Store } from '@ngrx/store';
import { Actions, getEffectsMetadata } from '@ngrx/effects';
import { cold, hot } from 'jasmine-marbles';
import { PetsEffects } from './pets.effects';
import { ActivationEnd } from '@angular/router';
import {
    PetActions,
    RetrievePets,
    RetrievePetsSuccess,
    RetrievePet,
    RetrievePetSuccess,
    AddPet,
    AddSuccess,
    UpdatePet,
    UpdateSuccess,
    DeletePet,
    DeleteSuccess
} from './pets.actions';
import { MatDialog, MatDialogModule } from '@angular/material';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { State } from './pet.selector';
import { NgModule, Component } from '@angular/core';
import { ConfirmDialogComponent } from '@app/core/confirm-dialog/confirm-dialog.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@app/shared/modules/common/material.module';
import { OverlayContainer } from '@angular/cdk/overlay';
import { GetPetsGQL, GetPetGQL } from '@app/generated/graphql';
import { UpdatePetGQL, CreatePetGQL, DeletePetGQL } from '../pet.service';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { QueryParamsPets } from './pets.model';
import { of } from 'rxjs';

// Noop component is only a workaround to trigger change detection
@Component({
    template: ''
})
class NoopComponent { }

const TEST_DIRECTIVES = [
    ConfirmDialogComponent,
    NoopComponent
];

@NgModule({
    imports: [MatDialogModule, NoopAnimationsModule, MaterialModule],
    exports: TEST_DIRECTIVES,
    declarations: TEST_DIRECTIVES,
    entryComponents: [
        ConfirmDialogComponent
    ],
})
class DialogTestModule { }

describe('PetsEffects', () => {
    let router: any;
    let titleService: jasmine.SpyObj<TitleService>;
    let translateService: jasmine.SpyObj<TranslateService>;
    let getPetsGQL: jasmine.SpyObj<GetPetsGQL>;
    let getPetGQL: jasmine.SpyObj<GetPetGQL>;
    let updatePetGQL: jasmine.SpyObj<UpdatePetGQL>;
    let createPetGQL: jasmine.SpyObj<CreatePetGQL>;
    let deletePetGQL: jasmine.SpyObj<DeletePetGQL>;
    let store: jasmine.SpyObj<Store<State>>;
    let dialog: MatDialog;
    let overlayContainerElement: HTMLElement;

    let noop: ComponentFixture<NoopComponent>;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [DialogTestModule],
            providers: [
                {
                    provide: OverlayContainer, useFactory: () => {
                        overlayContainerElement = document.createElement('div');
                        return { getContainerElement: () => overlayContainerElement };
                    }
                },
                {
                    provide: HAMMER_LOADER,
                    useValue: () => new Promise(() => { })
                }
            ]
        });
        router = {
            routerState: {
                snapshot: {
                    root: {}
                }
            },
            events: {
                pipe() { }
            }
        };


        titleService = jasmine.createSpyObj('TitleService', ['setTitle']);
        translateService = jasmine.createSpyObj('TranslateService', ['use']);
        getPetsGQL = jasmine.createSpyObj('GetPetsGQL', ['watch']);
        getPetGQL = jasmine.createSpyObj('GetPetGQL', ['watch']);
        updatePetGQL = jasmine.createSpyObj('UpdatePetGQL', ['mutate']);
        createPetGQL = jasmine.createSpyObj('CreatePetGQL', ['mutate']);
        deletePetGQL = jasmine.createSpyObj('DeletePetGQL', ['mutate']);
        store = jasmine.createSpyObj('store', ['pipe']);
        dialog = TestBed.get(MatDialog);
        noop = TestBed.createComponent(NoopComponent);
    });

    describe('setTranslateServiceLanguage', () => {
        it('should not dispatch action', function () {
            const actions = new Actions<PetActions>();
            const effect = new PetsEffects(
                actions,
                dialog,
                store,
                translateService,
                router,
                titleService,
                getPetsGQL,
                getPetGQL,
                updatePetGQL,
                createPetGQL,
                deletePetGQL
            );
            const metadata = getEffectsMetadata(effect);

            expect(metadata.setTranslateServiceLanguage).toEqual({ dispatch: false });
        });
    });

    describe('setTitle', () => {
        it('should not dispatch action', function () {
            const actions = new Actions<PetActions>();
            const effect = new PetsEffects(
                actions,
                dialog,
                store,
                translateService,
                router,
                titleService,
                getPetsGQL,
                getPetGQL,
                updatePetGQL,
                createPetGQL,
                deletePetGQL
            );
            const metadata = getEffectsMetadata(effect);

            expect(metadata.setTitle).toEqual({ dispatch: false });
        });

        it('should setTitle', function () {
            const action = new ActionSettingsChangeLanguage({ language: 'en' });
            const source = hot('-a', { a: action });
            const actions = new Actions(source);
            const routerEvent = new ActivationEnd(router.routerState.snapshot);
            router.events = cold('a', { a: routerEvent });

            const effect = new PetsEffects(
                actions,
                dialog,
                store,
                translateService,
                router,
                titleService,
                getPetsGQL,
                getPetGQL,
                updatePetGQL,
                createPetGQL,
                deletePetGQL
            );

            effect.setTitle.subscribe(() => {
                expect(titleService.setTitle).toHaveBeenCalled();
                expect(titleService.setTitle).toHaveBeenCalledWith(
                    router.routerState.snapshot.root,
                    translateService
                );
            });
        });
    });

    describe('Pet CRUD', () => {
        it('should emit RetrievePetsSuccess', () => {
            const queryParamsPets: QueryParamsPets = {
                page: 1
            };
            const data = {
                data: {
                    pets: {
                        pets: [
                            {
                                id: '5c66b741d6a31100178724cc',
                                name: 'test',
                                type: 'test1',
                                imageUrls: [
                                    {
                                        filename: 'PiNthoWCS-tesla-cat.jpg',
                                        path: './images/PiNthoWCS-tesla-cat.jpg',
                                        __typename: 'File'
                                    }
                                ],
                                creator:
                                {
                                    name: 'test',
                                    email: 'test@test.com', '__typename': 'UserPet'
                                },
                                __typename: 'Pet'
                            },
                            {
                                id: '5c503d5095ca260de0425a83',
                                name: 'arwen',
                                type: 'rabbit',
                                imageUrls: [
                                    {
                                        filename: '_GLCznd1Z-pygmy-sloth-62869_1920.jpg',
                                        path: './images/_GLCznd1Z-pygmy-sloth-62869_1920.jpg',
                                        __typename: 'File'
                                    }
                                ],
                                creator: {
                                    name: 'test',
                                    email: 'test@test.com',
                                    __typename: 'UserPet'
                                }, '__typename': 'Pet'
                            }
                        ],
                        totalPets: 2,
                        filterData: {
                            isFilterData: false,
                            currentPage: 1,
                            queryParams: null,
                            __typename: 'FilterDataPet'
                        },
                        __typename: 'PetData'
                    }
                }
            };
            const retrievePetsAction = new RetrievePets(queryParamsPets);
            const expectedValues = {
                b: new RetrievePetsSuccess(data.data.pets)
            };
            const source = cold('a', { a: retrievePetsAction });
            const expected = cold('b', expectedValues);
            const actions = new Actions(source);
            getPetsGQL.watch.and.returnValue({
                valueChanges: of(data)
            });
            const effect = new PetsEffects(
                actions,
                dialog,
                store,
                translateService,
                router,
                titleService,
                getPetsGQL,
                getPetGQL,
                updatePetGQL,
                createPetGQL,
                deletePetGQL
            );
            expect(effect.retrievePets$).toBeObservable(expected);
        });

        it('should emit RetrievePetSuccess', () => {

            const data = {
                data: {
                    pet: {
                        id: '5c503d5095ca260de0425a83',
                        name: 'arwen',
                        type: 'rabbit',
                        imageUrls: [
                            {
                                filename: '_GLCznd1Z-pygmy-sloth-62869_1920.jpg',
                                path: './images/_GLCznd1Z-pygmy-sloth-62869_1920.jpg',
                                __typename: 'File'
                            }
                        ], creator: {
                            name: 'test',
                            email: 'test@test.com',
                            __typename: 'UserPet'
                        },
                        __typename: 'Pet'
                    }
                }
            };
            const retrievePetAction = new RetrievePet('5c503d5095ca260de0425a83');
            const expectedValues = {
                b: new RetrievePetSuccess(data.data.pet)
            };
            const source = cold('a', { a: retrievePetAction });
            const expected = cold('b', expectedValues);
            const actions = new Actions(source);
            getPetGQL.watch.and.returnValue({
                valueChanges: of(data)
            });
            const effect = new PetsEffects(
                actions,
                dialog,
                store,
                translateService,
                router,
                titleService,
                getPetsGQL,
                getPetGQL,
                updatePetGQL,
                createPetGQL,
                deletePetGQL
            );
            expect(effect.retrievePet$).toBeObservable(expected);
        });

        it('should emit AddPet', () => {

            const data = {
                data:
                {
                    createPet:
                    {
                        id: '5c6aa2a1ad6cd90017b5c30c',
                        name: 'test',
                        type: 'test',
                        imageUrls: [
                            {
                                path: './images/xRt7XCJ7S-tesla-cat.jpg',
                                __typename: 'File'
                            }
                        ],
                        creator:
                        {
                            name: 'test',
                            email: 'test@test.com',
                            __typename: 'UserPet'
                        }, createdAt: '2019-02-18T12:18:41.698Z', updatedAt: '1550492321698', __typename: 'Pet'
                    }
                }
            };
            const retrievePetAction = new AddPet(data.data.createPet);
            const expectedValues = {
                b: new AddSuccess(data.data.createPet)
            };
            const source = cold('a', { a: retrievePetAction });
            const expected = cold('b', expectedValues);
            const actions = new Actions(source);
            createPetGQL.mutate.and.returnValue(of(data));
            const effect = new PetsEffects(
                actions,
                dialog,
                store,
                translateService,
                router,
                titleService,
                getPetsGQL,
                getPetGQL,
                updatePetGQL,
                createPetGQL,
                deletePetGQL
            );
            expect(effect.createPet$).toBeObservable(expected);
        });

        it('should emit UpdatePet', () => {

            const data = {
                data: {
                    updatePet:
                    {
                        id: '5c6aa2a1ad6cd90017b5c30c',
                        name: 'test',
                        type: 'test2',
                        imageUrls: [
                            {
                                path: './images/tKsC9e3Rs-tesla-cat.jpg',
                                __typename: 'File'
                            }
                        ],
                        creator:
                        {
                            name: 'test',
                            __typename: 'UserPet'
                        }, createdAt: '2019-02-18T12:18:41.698Z', updatedAt: '1550492955788', __typename: 'Pet'
                    }
                }
            };
            const retrievePetAction = new UpdatePet({ index: '5c6aa2a1ad6cd90017b5c30c', updatedPet: data.data.updatePet });
            const expectedValues = {
                b: new UpdateSuccess({ id: data.data.updatePet.id, changes: data.data.updatePet })
            };
            const source = cold('a', { a: retrievePetAction });
            const expected = cold('b', expectedValues);
            const actions = new Actions(source);
            updatePetGQL.mutate.and.returnValue(of(data));
            const effect = new PetsEffects(
                actions,
                dialog,
                store,
                translateService,
                router,
                titleService,
                getPetsGQL,
                getPetGQL,
                updatePetGQL,
                createPetGQL,
                deletePetGQL
            );
            expect(effect.updatePet$).toBeObservable(expected);
        });

        it('should emit DeletePet', () => {

            const data = {
                data: {
                    pet: {
                        id: '5c503d5095ca260de0425a83',
                        name: 'arwen',
                        type: 'rabbit',
                        imageUrls: [
                            {
                                filename: '_GLCznd1Z-pygmy-sloth-62869_1920.jpg',
                                path: './images/_GLCznd1Z-pygmy-sloth-62869_1920.jpg',
                                __typename: 'File'
                            }
                        ], creator: {
                            name: 'test',
                            email: 'test@test.com',
                            __typename: 'UserPet'
                        },
                        __typename: 'Pet'
                    }
                }
            };
            const retrievePetAction = new DeletePet('5c503d5095ca260de0425a83');
            const expectedValues = {
                b: new DeleteSuccess(data.data.pet.id)
            };
            const source = cold('a', { a: retrievePetAction });
            const expected = cold('b', expectedValues);
            const actions = new Actions(source);
            deletePetGQL.mutate.and.returnValue(of(data.data.pet.id));
            const effect = new PetsEffects(
                actions,
                dialog,
                store,
                translateService,
                router,
                titleService,
                getPetsGQL,
                getPetGQL,
                updatePetGQL,
                createPetGQL,
                deletePetGQL
            );
            expect(effect.deletePet$).toBeObservable(expected);
        });
    });
});
