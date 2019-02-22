import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../store/auth.action';
import { ROUTE_ANIMATIONS_ELEMENTS, routeAnimations } from '@app/core/animations/route.animations';
import { AppState } from '@app/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routeAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {
    routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
    signupForm: FormGroup;
    redirectSub: Subscription;
    constructor(
        private fb: FormBuilder,
        public store: Store<AppState>
    ) { }

    ngOnInit() {
        this.initSignupForm();
    }

    initSignupForm() {
        this.signupForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
        });
    }

    onSignup() {
        const signupValues = this.signupForm.value;
        this.store.dispatch(new AuthActions.Signup(signupValues));
    }

}
