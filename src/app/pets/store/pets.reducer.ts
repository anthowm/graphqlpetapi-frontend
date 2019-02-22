
import { createEntityAdapter } from '@ngrx/entity';

import {
  PetActionTypes,
  PetActions as AllPetsActions
} from './pets.actions';
import { PetState, Pet } from './pets.model';

export const petAdapter = createEntityAdapter<Pet>({
  selectId: (pet: Pet) => pet.id,
  sortComparer: false
});



export const INIT_STATE: PetState = petAdapter.getInitialState({
  currentPetId: null,
  totalPets: null,
  filterData: null
});




export function petsReducer(state: PetState = INIT_STATE, action: AllPetsActions): PetState {

  switch (action.type) {

    case PetActionTypes.SET_CURRENT_PET_ID: {
      return {
        ...state,
        currentPetId: action.payload
      };
    }
    case PetActionTypes.RETRIEVE_PETS_SUCCESS: {
      const filterDataCurrent = action.payload.filterData;
      const filterDataState = state.filterData;
      let mergePets = [];
      const pets = action.payload.pets;
      if (
        filterDataState &&
        filterDataCurrent.isFilterData === filterDataState.isFilterData &&
        filterDataCurrent.currentPage > filterDataState.currentPage &&
        JSON.stringify(filterDataCurrent.queryParams) === JSON.stringify(filterDataState.queryParams) &&
        state.ids.length < action.payload.totalPets
      ) {
        mergePets = [...Object.keys(state.entities).map(key => state.entities[key]).concat(pets)];
      } else {
        if (filterDataState && JSON.stringify(filterDataCurrent.queryParams) !== JSON.stringify(filterDataState.queryParams)
          || state.ids.length < action.payload.totalPets) {
          mergePets = [...pets];
        }

      }

      if (mergePets.length === 0) {
        return { ...state };
      }
      return petAdapter.addAll(mergePets, {
        ...state,
        totalPets: action.payload.totalPets,
        filterData: action.payload.filterData
      });
    }

    case PetActionTypes.RETRIEVE_PET_SUCCESS: {
      return petAdapter.addOne(action.payload, {
        ...state,
        currentPetId: action.payload.id
      });
    }

    case PetActionTypes.CREATE_SUCCESS: {
      return petAdapter.addOne(action.payload, {
        ...state
      });
    }

    case PetActionTypes.UPDATE_SUCCESS: {
      return petAdapter.updateOne(action.payload, { ...state });
    }

    case PetActionTypes.DELETE_SUCCESS: {
      return petAdapter.removeOne(action.payload, { ...state });
    }

    default:
      return state;

  }
}

export const getCurrentPetId = (state: PetState) => state.currentPetId;
export const getTotal = (state: PetState) => state.totalPets;
export const getFilterData = (state: PetState) => state.filterData;
