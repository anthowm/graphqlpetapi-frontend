export type Maybe<T> = T | null;

export interface UserInputData {
  email: string;

  name: string;

  password: string;
}

// ====================================================
// Documents
// ====================================================

export namespace GetPets {
  export type Variables = {
    page?: Maybe<number>;
    name?: Maybe<string>;
    type?: Maybe<string>;
  };

  export type Query = {
    __typename?: "Query";

    pets: Pets;
  };

  export type Pets = {
    __typename?: "PetData";

    pets: _Pets[];

    totalPets: number;

    filterData: FilterData;
  };

  export type _Pets = {
    __typename?: "Pet";

    id: string;

    name: string;

    type: string;

    imageUrls: ImageUrls[];

    creator: Creator;
  };

  export type ImageUrls = {
    __typename?: "File";

    filename: string;

    path: string;
  };

  export type Creator = {
    __typename?: "UserPet";

    name: string;

    email: string;
  };

  export type FilterData = {
    __typename?: "FilterDataPet";

    isFilterData: boolean;

    currentPage: number;

    queryParams: Maybe<QueryParams>;
  };

  export type QueryParams = {
    __typename?: "QueryParamsPet";

    name: Maybe<string>;

    type: Maybe<string>;
  };
}

export namespace GetPet {
  export type Variables = {
    id: string;
  };

  export type Query = {
    __typename?: "Query";

    pet: Pet;
  };

  export type Pet = {
    __typename?: "Pet";

    id: string;

    name: string;

    type: string;

    imageUrls: ImageUrls[];

    creator: Creator;
  };

  export type ImageUrls = {
    __typename?: "File";

    filename: string;

    path: string;
  };

  export type Creator = {
    __typename?: "UserPet";

    name: string;

    email: string;
  };
}

export namespace CreateUser {
  export type Variables = {
    userInput?: Maybe<UserInputData>;
  };

  export type Mutation = {
    __typename?: "Mutation";

    createUser: CreateUser;
  };

  export type CreateUser = {
    __typename?: "User";

    id: string;

    name: string;

    email: string;
  };
}

export namespace SignIn {
  export type Variables = {
    email: string;
    password: string;
  };

  export type Query = {
    __typename?: "Query";

    login: Login;
  };

  export type Login = {
    __typename?: "AuthData";

    token: string;

    userId: string;
  };
}

// ====================================================
// START: Apollo Angular template
// ====================================================

import { Injectable } from "@angular/core";
import * as Apollo from "apollo-angular";

import gql from "graphql-tag";

// ====================================================
// Apollo Services
// ====================================================

@Injectable({
  providedIn: "root"
})
export class GetPetsGQL extends Apollo.Query<GetPets.Query, GetPets.Variables> {
  document: any = gql`
    query GetPets($page: Int, $name: String, $type: String) {
      pets(page: $page, name: $name, type: $type) {
        pets {
          id
          name
          type
          imageUrls {
            filename
            path
          }
          creator {
            name
            email
          }
        }
        totalPets
        filterData {
          isFilterData
          currentPage
          queryParams {
            name
            type
          }
        }
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class GetPetGQL extends Apollo.Query<GetPet.Query, GetPet.Variables> {
  document: any = gql`
    query GetPet($id: ID!) {
      pet(id: $id) {
        id
        name
        type
        imageUrls {
          filename
          path
        }
        creator {
          name
          email
        }
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class CreateUserGQL extends Apollo.Mutation<
  CreateUser.Mutation,
  CreateUser.Variables
> {
  document: any = gql`
    mutation createUser($userInput: UserInputData) {
      createUser(userInput: $userInput) {
        id
        name
        email
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class SignInGQL extends Apollo.Query<SignIn.Query, SignIn.Variables> {
  document: any = gql`
    query SignIn($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        userId
      }
    }
  `;
}

// ====================================================
// END: Apollo Angular template
// ====================================================
