import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddPet, PetActionTypes, UpdateSuccess, UpdatePet } from '@app/pets/store/pets.actions';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { State, selectSelectedPet } from '@app/pets/store/pet.selector';
import { Subscription, Observable } from 'rxjs';
import { ofType } from '@ngrx/effects';
import { Router, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Pet } from '@app/pets/store/pets.model';
import { NotificationService } from '@app/core';
@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPetComponent implements OnInit, OnDestroy {
  pet$: Observable<Pet>;
  redirectSub: Subscription;
  constructor(
    public store: Store<State>,
    private actionsSubject: ActionsSubject,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.getCurrentPet();
    this.editSuccess();
  }



  getCurrentPet() {
    this.pet$ = this.store.pipe(select(selectSelectedPet));
  }

  onSubmit(event: any) {
    const pet = {
      name: event.name,
      type: event.type,
      imageUrls: event.imageUrls.files
    };
    this.store.dispatch(new UpdatePet({ index: event.id, updatedPet: pet }));
  }

  editSuccess() {
    this.redirectSub = this.actionsSubject.asObservable().pipe(
      ofType(PetActionTypes.UPDATE_SUCCESS),
      filter((action: UpdateSuccess) => {
        return action.payload.id === this.activatedRoute.snapshot.params['id'];
      })
    ).subscribe(
      (action: UpdateSuccess) => {
        this.notificationService.success('Pet updated sucessfully');
        this.router.navigate(['/pets', action.payload.id]);
      }
    );
  }

  ngOnDestroy() {
    this.redirectSub.unsubscribe();
  }
}
