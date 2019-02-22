import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FeaturesComponent } from './features/features.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'menu.home' }
  },
  {
    path: 'features',
    component: FeaturesComponent,
    data: { title: 'menu.features' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticRoutingModule { }
