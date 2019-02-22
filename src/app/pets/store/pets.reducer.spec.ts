import { INIT_STATE, petsReducer } from './pets.reducer';

import {
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
    SetCurrentPetId,
    RemovePetConfirmDialogOpen,
    PetActionTypes,
} from './pets.actions';
import { QueryParamsPets, Pet } from './pets.model';
import { Update } from '@ngrx/entity';

describe('PetsReducer', () => {
    it('should return default state', () => {
        const action = {} as any;
        const state = petsReducer(undefined, action);
        expect(state).toBe(INIT_STATE);
    });

    it('should RetrievePets state', () => {
        const queryParamsPets: QueryParamsPets = {
            page: 1
        };
        const action = new RetrievePets(queryParamsPets);
        const state = petsReducer(undefined, action);
        expect(state).toBe(INIT_STATE);
    });

    it('should set pets state - RetrievePetsSuccess', () => {
        const pets = {
            pets:
                [
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
                        },
                        __typename: 'Pet'
                    },
                    {
                        id: '5c503d1d95ca260de0425a82',
                        name: 'Sweet',
                        type: 'Tiger',
                        imageUrls: [
                            {
                                filename: '3kw_D2xDH-cat-300572_1280.jpg',
                                path: './images/3kw_D2xDH-cat-300572_1280.jpg',
                                __typename: 'File'
                            }
                        ],
                        creator: {
                            name: 'test',
                            email: 'test@test.com',
                            __typename: 'UserPet'
                        },
                        __typename: 'Pet'
                    }],
            totalPets: 2,
            filterData:
            {
                isFilterData: false,
                currentPage: 1,
                queryParams: null,
                __typename: 'FilterDataPet'
            },
            __typename: 'PetData'
        };
        const statePets: any = {

            ids: [
                '5c503d5095ca260de0425a83',
                '5c503d1d95ca260de0425a82'
            ],
            entities: {
                '5c503d5095ca260de0425a83': {
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
                    },
                    __typename: 'Pet'
                },
                '5c503d1d95ca260de0425a82': {
                    id: '5c503d1d95ca260de0425a82',
                    name: 'Sweet',
                    type: 'Tiger',
                    imageUrls: [
                        {
                            filename: '3kw_D2xDH-cat-300572_1280.jpg',
                            path: './images/3kw_D2xDH-cat-300572_1280.jpg',
                            __typename: 'File'
                        }
                    ],
                    creator: {
                        name: 'test',
                        email: 'test@test.com',
                        __typename: 'UserPet'
                    },
                    __typename: 'Pet'
                }
            },
            currentPetId: null,
            totalPets: 2,
            filterData: {
                isFilterData: false,
                currentPage: 1,
                queryParams: null,
                __typename: 'FilterDataPet'
            }
        };
        const action = new RetrievePetsSuccess(pets);
        const state = petsReducer(undefined, action);
        expect(state.currentPetId).toEqual(null);
        expect(state.ids).toEqual(statePets.ids);
        expect(state.totalPets).toEqual(statePets.totalPets);
        expect(state.filterData).toEqual(statePets.filterData);
        expect(state.entities).toEqual(statePets.entities);
    });

    it('should RetrievePet state', () => {
        const petId = '5c503d1d95ca260de0425a82';

        const action = new RetrievePet(petId);
        const state = petsReducer(undefined, action);
        expect(state).toBe(INIT_STATE);
    });

    it('should RetrievePetSuccess state', () => {
        const pet = {
            id: '5c503d1d95ca260de0425a82',
            name: 'Sweet',
            type: 'Tiger',
            imageUrls: [
                {
                    filename: '3kw_D2xDH-cat-300572_1280.jpg',
                    path: './images/3kw_D2xDH-cat-300572_1280.jpg',
                    __typename: 'File'
                }
            ],
            creator:
            {
                name: 'test',
                email: 'test@test.com',
                __typename: 'UserPet'
            }, __typename: 'Pet'
        };

        const action = new RetrievePetSuccess(pet);
        const state = petsReducer(undefined, action);
        expect(state.currentPetId).toEqual(pet.id);
    });

    it('should AddPet state', () => {
        const createPet = {
            name: 'test',
            type: 'test',
            imageUrls: []
        };

        const action = new AddPet(createPet);
        const state = petsReducer(undefined, action);
        expect(state).toBe(INIT_STATE);
    });

    it('should AddSuccess state', () => {
        const createPet = {
            id: '5c66b741d6a31100178724cc',
            name: 'test',
            type: 'test',
            imageUrls: [
                {
                    path: './images/8XHcRFbaI-tesla-cat.jpg',
                    __typename: 'File'
                }
            ],
            creator: {
                name: 'test',
                email: 'test@test.com',
                __typename: 'UserPet'
            },
            createdAt: '2019-02-15T12:57:37.837Z',
            updatedAt: '1550235457837',
            __typename: 'Pet'
        };

        const action = new AddSuccess(createPet);
        const state = petsReducer(undefined, action);
        expect(state).toEqual({
            ...INIT_STATE,
            entities: {
                [createPet.id]: createPet
            },
            ids: [createPet.id]
        });
    });

    it('should UpdatePet state', () => {
        const updatePet = {
            index: '5c66b741d6a31100178724cc',
            updatedPet: {
                name: 'test',
                type: 'test1',
                imageUrls: []
            }
        };

        const action = new UpdatePet(updatePet);
        const state = petsReducer(undefined, action);
        expect(state).toBe(INIT_STATE);
    });

    it('should UpdateSuccess state', () => {
        const updatePet = {
            id: '5c66b741d6a31100178724cc',
            name: 'test',
            type: 'test',
            imageUrls: [
                {
                    path: './images/8XHcRFbaI-tesla-cat.jpg',
                    __typename: 'File'
                }
            ],
            creator: {
                name: 'test',
                email: 'test@test.com',
                __typename: 'UserPet'
            },
            createdAt: '2019-02-15T12:57:37.837Z',
            updatedAt: '1550235457837',
            __typename: 'Pet'
        };

        const pet: Update<Pet> = {
            id: '5c66b741d6a31100178724cc',
            changes: updatePet
        };

        const action = new UpdateSuccess(pet);
        const state = petsReducer(undefined, action);
        expect(state).toEqual(INIT_STATE);
    });

    it('should DeletePet state', () => {
        const petId = '5c66b741d6a31100178724cc';

        const action = new DeletePet(petId);
        const state = petsReducer(undefined, action);
        expect(state).toBe(INIT_STATE);
    });

    it('should DeleteSuccess state', () => {
        const petId = '5c66b741d6a31100178724cc';

        const action = new DeleteSuccess(petId);
        const state = petsReducer(undefined, action);
        expect(state.ids).not.toContain(petId);
    });

    it('should RetrieveError state', () => {
        const action = new RetrieveError(null);
        const state = petsReducer(undefined, action);
        expect(state).toBe(INIT_STATE);
    });

    it('should SetCurrentPetId state', () => {
        const petId = '5c66b741d6a31100178724cc';

        const action = new SetCurrentPetId(petId);
        const state = petsReducer(undefined, action);
        expect(state).toEqual({ ...INIT_STATE, currentPetId: petId });
    });
});
