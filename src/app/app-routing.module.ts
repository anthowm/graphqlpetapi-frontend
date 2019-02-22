import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsContainerComponent } from './core/settings/components/settings-container.component';
import { AuthGuardService } from './core/auth/auth-guard.service';
import { NotFoundComponent } from './static/notfound/notfound.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'settings',
    component: SettingsContainerComponent,
    data: { title: 'menu.settings' }
  },
  {
    path: 'pets',
    loadChildren: './pets/pets.module#PetsModule',
    canLoad: [AuthGuardService]
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule { }
