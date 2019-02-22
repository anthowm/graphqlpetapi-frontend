import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetsComponent } from './components/pets.component';
import { ViewPetComponent } from './components/view-pet/view-pet.component';
import { CreatePetComponent } from './components/create-pet/create-pet.component';
import { EditPetComponent } from './components/edit-pet/edit-pet.component';
import { AuthGuardService } from '@app/core/auth/auth-guard.service';
import { PetListVirtualComponent } from './components/pet-list-virtual/pet-list-virtual.component';


const routes: Routes = [
  {
    path: '',
    component: PetsComponent,
    children: [
      {
        path: '',
        component: PetListVirtualComponent,
        pathMatch: 'full',
        data: { title: 'pets.menu.petlist' },
        canActivate: [AuthGuardService],
      },
      {
        path: 'create',
        component: CreatePetComponent,
        pathMatch: 'full',
        data: { title: 'pets.menu.petcreate' },
        canActivate: [AuthGuardService]
      },
      {
        path: ':id',
        component: ViewPetComponent,
        data: { title: 'pets.menu.petview' },
        pathMatch: 'full',
        canActivate: [AuthGuardService]
      },
      {
        path: ':id/edit',
        component: EditPetComponent,
        data: { title: 'pets.menu.petedit' },
        pathMatch: 'full',
        canActivate: [AuthGuardService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetsRoutingModule { }
