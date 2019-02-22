import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ActionsSubject, Store, select } from '@ngrx/store';
import { State, selectSelectedPet } from '@app/pets/store/pet.selector';
import { ofType } from '@ngrx/effects';
import {
  PetActionTypes,
  DeleteSuccess,
  RetrievePet,
  SetCurrentPetId,
  DeletePet,
  RemovePetConfirmDialogOpen
} from '@app/pets/store/pets.actions';
import { ROUTE_ANIMATIONS_ELEMENTS, NotificationService } from '@app/core';
import { Pet } from '@app/pets/store/pets.model';
import { environment } from '@env/environment';
import { GalleryItem, GalleryConfig, ThumbnailsPosition, ImageItem, ImageSize, LoadingStrategy } from '@ngx-gallery/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
@Component({
  selector: 'app-view-pet',
  templateUrl: './view-pet.component.html',
  styleUrls: ['./view-pet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewPetComponent implements OnInit, OnDestroy {
  galleryConfig$: Observable<GalleryConfig>;
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  id: any;
  pet$: Observable<Pet>;
  redirectSub: Subscription;
  images$: Observable<GalleryItem[]>;
  constructor(
    private store: Store<State>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private actionsSubject: ActionsSubject,
    breakpointObserver: BreakpointObserver,
    private notificationService: NotificationService
  ) {
    // responsive gallery
    this.galleryConfig$ = breakpointObserver.observe([
      Breakpoints.HandsetPortrait
    ]).pipe(
      map(res => {
        if (res.matches) {
          return {
            thumbPosition: ThumbnailsPosition.Bottom,
            thumbWidth: 80,
            thumbHeight: 80,
            imageSize: ImageSize.Cover,
            loadingStrategy: LoadingStrategy.Preload,
            dots: true,
            thumb: false
          };
        }
        return {
          thumbPosition: ThumbnailsPosition.Bottom,
          thumbWidth: 120,
          thumbHeight: 90,
          imageSize: ImageSize.Cover,
          loadingStrategy: LoadingStrategy.Preload,
          dots: true,
          thumb: false
        };
      })
    );
  }

  ngOnInit() {

    this.pet$ = this.store.pipe(
      select(selectSelectedPet)
    );

    // If the destroy effect fires, we check if the current id is the one being viewed, and redirect to index
    this.redirectSub = this.actionsSubject.pipe(
      ofType(PetActionTypes.DELETE_SUCCESS),
      filter((action: DeleteSuccess) =>
        action.payload === this.activatedRoute.snapshot.params['id'])
    ).subscribe(_ => {
      this.notificationService.success('Pet deleted sucessfully');
      this.router.navigate(['/pets']);
    });

    this.redirectSub = this.actionsSubject.pipe(
      filter(action => action.type === PetActionTypes.DELETE_SUCCESS),
    ).subscribe(
      _ => this.router.navigate(['/pets'])
    );


    this.activatedRoute.params.subscribe(params => {
      // update our id from the backend in case it was modified by another client
      this.store.dispatch(new RetrievePet(params['id']));
    });
    this.initPetGallery();
  }

  initPetGallery() {
    this.images$ = this.pet$.pipe(
      map(res => {
        let images;
        if (res) {
          images = res.imageUrls.map((element) => {
            const imageUrl = `https://graphql-petapi.herokuapp.com/${element.path}`;
            return new ImageItem({ src: imageUrl, thumb: imageUrl });
          });
        }
        return images;
      }
      )
    );
  }


  onEditPet(pet: Pet) {
    this.store.dispatch(new SetCurrentPetId(pet.id));

    this.router.navigate(['/pets', pet.id, 'edit']);

  }

  onDeletePet(pet: Pet) {
    this.store.dispatch(new RemovePetConfirmDialogOpen({
      delete: new DeletePet(pet.id),
      text: `Are you sure you want to remove the pet <em>${pet.name}</em> from the pet list?`,
      title: 'REMOVE PET'
    }));
  }

  ngOnDestroy() {
    this.redirectSub.unsubscribe();
  }


}


