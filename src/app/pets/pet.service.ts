import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class CreatePetGQL extends Mutation {
  document = gql`
    mutation createPet($petInput: PetInputData) {
    createPet(petInput: $petInput) {
      id
      name
      type
      imageUrls {
        path
      }
      creator {
        name
        email
      }
      createdAt
      updatedAt
    }
  }
`;
}

@Injectable({
  providedIn: 'root',
})
export class UpdatePetGQL extends Mutation {
  document = gql`
    mutation updatePet($id: ID!,$petInput: PetInputDataUpdate) {
    updatePet(id: $id, petInput: $petInput) {
      id
      name
      type
      imageUrls {
        path
      }
      creator {
        name
      }
      createdAt
      updatedAt
    }
  }
`;
}

@Injectable({
  providedIn: 'root',
})
export class DeletePetGQL extends Mutation {
  document = gql`
    mutation deletePet($id: ID!) {
    deletePet(id: $id)
  }
`;
}
