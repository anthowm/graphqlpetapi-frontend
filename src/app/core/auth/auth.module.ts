import { NgModule } from '@angular/core';
import { MaterialModule } from '@app/shared/modules/common/material.module';
import { AuthRoutingModule } from './auth-routing.module';
import { SignUpComponent } from './signup/signup.component';
import { SignInComponent } from './signin/signin.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { NotFoundComponent } from '@app/static/notfound/notfound.component';
@NgModule({
  imports: [
    MaterialModule,
    AuthRoutingModule,
  ],
  declarations: [
    SignUpComponent,
    SignInComponent,
    UnauthorizedComponent,
    NotFoundComponent
  ],
  exports: [
    NotFoundComponent
  ]
})
export class AuthModule { }

