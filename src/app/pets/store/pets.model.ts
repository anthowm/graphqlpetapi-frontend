import { EntityState } from '@ngrx/entity';

export interface PetsResponse {
  pets: Pet[];
  message: string;
  totalItems: number;
}

export interface PetResponse {
  pet: Pet;
  message: string;
}

export interface CreatePet {
  name: string;
  type: string;
  imageUrls?: ImageUrl[];
}

export interface ImageUrl {
  id?: string;
  path?: string;
  filename?: string;
}

export interface Creator {
  pets?: any[];
  id?: string;
  email?: string;
  name?: string;
}

export interface Pet {
  id?: string;
  name?: string;
  type?: string;
  imageUrls?: ImageUrl[];
  creator?: Creator;
  createdAt?: string;
  updatedAt?: string;
}

export interface QueryParamsPets {
  page?: number;
  name?: string;
  type?: string;
}

export interface FilterDataPet {
  isFilterData: boolean;
  currentPage: number;
  queryParams: { name?: string, type?: string };
}


export interface PetState extends EntityState<Pet> {
  currentPetId?: string;
  totalPets?: number;
  filterData?: FilterDataPet;
}
