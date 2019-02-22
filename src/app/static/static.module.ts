import { NgModule } from '@angular/core';
import { StaticRoutingModule } from './static-routing.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../shared/modules/common/material.module';
import { FeaturesComponent } from './features/features.component';

@NgModule({
  imports: [MaterialModule, StaticRoutingModule],
  declarations: [HomeComponent, FeaturesComponent]
})
export class StaticModule { }
