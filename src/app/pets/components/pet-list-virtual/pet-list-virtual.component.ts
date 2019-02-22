import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State, selectAllPets, getTotalPets, getfilterData } from '../../store/pet.selector';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SetCurrentPetId, RetrievePets } from '../../store/pets.actions';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { Pet, FilterDataPet } from '@app/pets/store/pets.model';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-pet-list-virtual',
  templateUrl: './pet-list-virtual.component.html',
  styleUrls: ['./pet-list-virtual.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PetListVirtualComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  pets$: Observable<Pet[]>;
  totalPets$: Observable<number>;
  filterData$: Observable<FilterDataPet>;
  perPage = 8;
  theEnd = false;
  empty = false;
  loading = false;
  searchForm: FormGroup;
  petsTrackByFn = (index: number, pet: Pet) => pet.id;
  constructor(
    public store: Store<State>,
    private router: Router,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.initSearchForm();
    this.getPets({ page: 1 });
    this.pets$ = this.store.pipe(select(selectAllPets));
    this.totalPets$ = this.store.pipe(select(getTotalPets));
    this.filterData$ = this.store.pipe(select(getfilterData));
  }

  getPets(queryParams) {
    this.store.dispatch(new RetrievePets(queryParams));
  }

  onViewPet(id: string) {
    this.store.dispatch(new SetCurrentPetId(id));
    this.router.navigate(['/pets', id]);
  }

  onCreatePet() {
    this.router.navigate(['/pets/create']);
  }

  onScroll(petsLength, totalPets, filterData) {
    if (petsLength < totalPets) {
      this.loading = true;
    }

    setTimeout(() => {
      this.fetchPetsPaginated(petsLength, totalPets, filterData);
      this.loading = false;
    }, 500);
  }

  fetchPetsPaginated(petsLength, totalPets, filterData) {
    const currentPage = filterData.currentPage;
    const maxPage = Math.ceil(totalPets / this.perPage);
    const nextPage = Math.ceil(petsLength / this.perPage);
    if (currentPage === maxPage) {
      this.empty = true;
    } else {
      if (filterData.isFilterData && !this.empty) {
        this.getPets({ ...filterData.queryParams, page: nextPage + 1 });
      } else if (!filterData.isFilterData && !this.empty) {
        this.getPets({ page: nextPage + 1 });
      }
    }
  }

  initSearchForm() {
    this.searchForm = this.fb.group({
      name: ['', []],
      type: ['', []]
    });
  }

  onSubmit() {
    this.empty = false;
    const queryParams = { ...this.searchForm.value, page: 1 };
    this.getPets(queryParams);
  }
}
