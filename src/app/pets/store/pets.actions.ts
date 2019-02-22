import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { CreatePet, Pet, QueryParamsPets } from './pets.model';
import { Update } from '@ngrx/entity/src/models';

export enum PetActionTypes {
  RETRIEVE_PETS = '[PET] RETRIEVE PETS',
  RETRIEVE_PETS_SUCCESS = '[PET] RETRIEVE PETS SUCCESS',
  RETRIEVE_PET = '[PET] RETRIEVE PET',
  RETRIEVE_PET_SUCCESS = '[PET] RETRIEVE PET SUCCESS',
  CREATE_PET = '[PET] CREATE',
  CREATE_SUCCESS = '[PET] CREATE SUCCESS',
  UPDATE_PET = '[PET] UPDATE',
  UPDATE_SUCCESS = '[PET] UPDATE SUCCESS',
  DELETE_PET = '[PET] DELETE',
  DELETE_SUCCESS = '[PET] DELETE SUCCESS',
  RETRIEVE_ERROR = '[PET] RETRIEVE ERROR',
  SET_CURRENT_PET_ID = '[PET] SET CURRENT PET ID',
  REMOVE_PET_CONFIRM_DIALOG_OPEN = '[PET] REMOVE PET CONFIRM DIALOG'
}

export class RetrievePets implements Action {
  readonly type = PetActionTypes.RETRIEVE_PETS;

  constructor(readonly payload: QueryParamsPets) { }
}

export class RetrievePetsSuccess implements Action {
  readonly type = PetActionTypes.RETRIEVE_PETS_SUCCESS;

  constructor(readonly payload: any) { }
}

export class RetrievePet implements Action {
  readonly type = PetActionTypes.RETRIEVE_PET;

  constructor(readonly payload: string) { }
}

export class RetrievePetSuccess implements Action {
  readonly type = PetActionTypes.RETRIEVE_PET_SUCCESS;

  constructor(readonly payload: Pet) { }
}

export class AddPet implements Action {
  readonly type = PetActionTypes.CREATE_PET;

  constructor(readonly payload: CreatePet) { }
}

export class AddSuccess implements Action {
  readonly type = PetActionTypes.CREATE_SUCCESS;

  constructor(readonly payload: Pet) { }
}

export class UpdatePet implements Action {
  readonly type = PetActionTypes.UPDATE_PET;

  constructor(readonly payload: { index: string, updatedPet: Pet }) { }
}

export class UpdateSuccess implements Action {
  readonly type = PetActionTypes.UPDATE_SUCCESS;

  constructor(readonly payload: Update<Pet>) { }
}

export class DeletePet implements Action {
  readonly type = PetActionTypes.DELETE_PET;

  constructor(readonly payload: string) { }
}

export class DeleteSuccess implements Action {
  readonly type = PetActionTypes.DELETE_SUCCESS;

  constructor(readonly payload: string) { }
}

export class RetrieveError implements Action {
  readonly type = PetActionTypes.RETRIEVE_ERROR;

  constructor(readonly payload: { error: HttpErrorResponse }) { }
}

export class SetCurrentPetId implements Action {
  readonly type = PetActionTypes.SET_CURRENT_PET_ID;
  constructor(public payload: string) { }
}

export class RemovePetConfirmDialogOpen implements Action {
  readonly type = PetActionTypes.REMOVE_PET_CONFIRM_DIALOG_OPEN;
  constructor(public payload: {
    cancel?: Action,
    delete: Action,
    text: string,
    title: string
  }) { }
}

export type PetActions =
  RetrievePets
  | RetrievePetsSuccess
  | RetrievePet
  | RetrievePetSuccess
  | AddPet
  | AddSuccess
  | UpdatePet
  | UpdateSuccess
  | DeletePet
  | DeleteSuccess
  | RetrieveError
  | SetCurrentPetId
  | RemovePetConfirmDialogOpen;
