import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { AddPet, PetActionTypes, AddSuccess } from '@app/pets/store/pets.actions';
import { Store, ActionsSubject } from '@ngrx/store';
import { State } from '@app/pets/store/pet.selector';
import { Subscription } from 'rxjs';
import { ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { NotificationService } from '@app/core';
@Component({
  selector: 'app-create-pet',
  templateUrl: './create-pet.component.html',
  styleUrls: ['./create-pet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePetComponent implements OnInit, OnDestroy {

  redirectSub: Subscription;
  constructor(
    public store: Store<State>,
    private actionsSubject: ActionsSubject,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.createSuccess();
  }

  onSubmit(event: any) {
    const pet = {
      name: event.name,
      type: event.type,
      imageUrls: event.imageUrls.files
    };
    this.store.dispatch(new AddPet(pet));
  }

  createSuccess() {
    this.redirectSub = this.actionsSubject.asObservable().pipe(
      ofType(PetActionTypes.CREATE_SUCCESS)
    ).subscribe(
      (action: AddSuccess) => {
        this.notificationService.success('Pet created sucessfully');
        this.router.navigate(['/pets', action.payload.id]);
      }
    );
  }

  ngOnDestroy() {
    this.redirectSub.unsubscribe();
  }
}
