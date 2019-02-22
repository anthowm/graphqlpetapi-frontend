import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StaticModule } from './static/static.module';
import { NavigationComponent } from './core/navigation/navigation.component';
import { SettingsModule } from './core/settings';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/modules/common/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    SharedModule,
    CoreModule,
    StaticModule,
    SettingsModule,
    AppRoutingModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
