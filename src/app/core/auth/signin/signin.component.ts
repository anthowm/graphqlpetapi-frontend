import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { routeAnimations, ROUTE_ANIMATIONS_ELEMENTS } from '@app/core/animations/route.animations';
import * as AuthActions from '../store/auth.action';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
    animations: [routeAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent implements OnInit {
    routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
    signinForm: FormGroup;
    redirectSub: Subscription;
    constructor(
        private fb: FormBuilder,
        public store: Store<AppState>
    ) { }

    ngOnInit() {
        this.initSigninForm();
    }

    initSigninForm() {
        this.signinForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
        });
    }

    onSignin() {
        const signinValues = this.signinForm.value;
        this.store.dispatch(new AuthActions.Signin(signinValues));
    }

}
