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
import { QueryParamsPets, Pet, CreatePet } from './pets.model';
import { Update } from '@ngrx/entity';
import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

describe('Pets Actions', () => {
    it('should create RetrievePets action', () => {
        const queryParamsPets: QueryParamsPets = {
            page: 1
        };
        const action = new RetrievePets(queryParamsPets);
        expect(action.type).toEqual(PetActionTypes.RETRIEVE_PETS);
        expect(action.payload).toEqual(queryParamsPets);
    });

    it('should create RetrievePetsSuccess action', () => {
        const pets: any = {
            pets: []
        };
        const action = new RetrievePetsSuccess(pets);
        expect(action.type).toEqual(PetActionTypes.RETRIEVE_PETS_SUCCESS);
        expect(action.payload).toEqual(pets);
    });

    it('should create RetrievePet action', () => {
        const petId = '123456abc';
        const action = new RetrievePet(petId);
        expect(action.type).toEqual(PetActionTypes.RETRIEVE_PET);
        expect(action.payload).toEqual(petId);
    });

    it('should create RetrievePetSuccess action', () => {
        const pet: Pet = {
        };
        const action = new RetrievePetSuccess(pet);
        expect(action.type).toEqual(PetActionTypes.RETRIEVE_PET_SUCCESS);
        expect(action.payload).toEqual(pet);
    });

    it('should create AddPet action', () => {
        const pet: CreatePet = {
            name: 'sampleCreatePet',
            type: 'sample type',
            imageUrls: [{ id: 'xxxxx', path: 'http//localhost/image/xxxxxxx', filename: 'xxxxxxx' }]
        };
        const action = new AddPet(pet);
        expect(action.type).toEqual(PetActionTypes.CREATE_PET);
        expect(action.payload).toEqual(pet);
    });

    it('should create AddSuccess action', () => {
        const pet: Pet = {
        };
        const action = new AddSuccess(pet);
        expect(action.type).toEqual(PetActionTypes.CREATE_SUCCESS);
        expect(action.payload).toEqual(pet);
    });

    it('should create UpdatePet action', () => {
        const pet: { index: string, updatedPet: Pet } = {
            index: '12345',
            updatedPet: {}
        };
        const action = new UpdatePet(pet);
        expect(action.type).toEqual(PetActionTypes.UPDATE_PET);
        expect(action.payload).toEqual(pet);
    });

    it('should create UpdateSuccess action', () => {
        const pet: Update<Pet> = {
            id: 12345,
            changes: {}
        };
        const action = new UpdateSuccess(pet);
        expect(action.type).toEqual(PetActionTypes.UPDATE_SUCCESS);
        expect(action.payload).toEqual(pet);
    });

    it('should create DeletePet action', () => {
        const petId = 'xxxxxx';
        const action = new DeletePet(petId);
        expect(action.type).toEqual(PetActionTypes.DELETE_PET);
        expect(action.payload).toEqual(petId);
    });

    it('should create DeleteSuccess action', () => {
        const petId = 'xxxxxx';
        const action = new DeleteSuccess(petId);
        expect(action.type).toEqual(PetActionTypes.DELETE_SUCCESS);
        expect(action.payload).toEqual(petId);
    });

    it('should create RetrieveError action', () => {
        const error: { error: HttpErrorResponse } = null;
        const action = new RetrieveError(null);
        expect(action.type).toEqual(PetActionTypes.RETRIEVE_ERROR);
    });

    it('should create SetCurrentPetId action', () => {
        const petId = 'xxxxxx';
        const action = new SetCurrentPetId(petId);
        expect(action.type).toEqual(PetActionTypes.SET_CURRENT_PET_ID);
        expect(action.payload).toEqual(petId);
    });

    it('should create RemovePetConfirmDialogOpen action', () => {
        const confirmDialog: {
            cancel?: Action,
            delete: Action,
            text: string,
            title: string
        } = {
            delete: null,
            text: 'test',
            title: 'test'
        };
        const action = new RemovePetConfirmDialogOpen(confirmDialog);
        expect(action.type).toEqual(PetActionTypes.REMOVE_PET_CONFIRM_DIALOG_OPEN);
        expect(action.payload).toEqual(confirmDialog);
    });
});
