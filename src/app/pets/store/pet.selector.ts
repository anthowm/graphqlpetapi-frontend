import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, selectRouterState } from '@app/core';
import { PetState } from './pets.model';
import { petAdapter } from './pets.reducer';
import * as fromPets from './pets.reducer';


export const {
  selectAll,
  selectEntities
} = petAdapter.getSelectors();
export interface State extends AppState {
  pets: PetState;
}
export const selectPets = createFeatureSelector<State, PetState>('pets');

export const selectPetsSelector = createSelector(
  selectPets,
  (state: PetState) => state
);

export const getSelectedPetId = createSelector(
  selectPetsSelector,
  fromPets.getCurrentPetId
);

export const getTotalPets = createSelector(
  selectPetsSelector,
  fromPets.getTotal,
);

export const getfilterData = createSelector(
  selectPetsSelector,
  fromPets.getFilterData,
);

export const selectAllPets = createSelector(selectPetsSelector, selectAll);

export const selectPetsEntities = createSelector(selectPetsSelector, selectEntities);

export const selectSelectedPet = createSelector(
  selectPetsEntities,
  getSelectedPetId,
  (entities, id) => id && entities[id]
);

