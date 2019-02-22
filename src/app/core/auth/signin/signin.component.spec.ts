import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModule } from '@testing/utils';
import { SignInComponent } from './signin.component';

describe('SignInComponent', () => {
    let component: SignInComponent;
    let fixture: ComponentFixture<SignInComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestingModule],
            declarations: [SignInComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(SignInComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
    });

    it('should signinform invalid when empty', () => {
        expect(component.signinForm.valid).toBeFalsy();
    });

    it('check email field validity', () => {
        let errors = {};
        const email = component.signinForm.controls['email'];
        expect(email.valid).toBeFalsy();

        // Email field is required
        errors = email.errors || {};
        expect(errors['required']).toBeTruthy();

        // Set email to something
        email.setValue('test');
        errors = email.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['email']).toBeTruthy();

        // Set email to something correct
        email.setValue('test@test.com');
        errors = email.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['email']).toBeFalsy();
    });

    it('check password field validity', () => {
        let errors = {};
        const password = component.signinForm.controls['password'];
        errors = password.errors || {};
        expect(errors['required']).toBeTruthy();

        // Set email value - minLenght true maxLength false
        password.setValue('123456');
        errors = password.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['minlength']).toBeTruthy();
        expect(errors['maxLength']).toBeFalsy();
        // Set email value - minLenght false maxLength true
        password.setValue('123456789123456789123456');
        errors = password.errors || {};

        expect(errors['required']).toBeFalsy();
        expect(errors['minlength']).toBeFalsy();
        expect(errors['maxlength']).toBeTruthy();
        password.setValue('123456789');
        errors = password.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['minlength']).toBeFalsy();
        expect(errors['maxlength']).toBeFalsy();
    });

    it('should submit signinForm', () => {
        expect(component.signinForm.valid).toBeFalsy();
        component.signinForm.controls['email'].setValue('test@test.com');
        component.signinForm.controls['password'].setValue('123456789');
        expect(component.signinForm.valid).toBeTruthy();

        component.onSignin();
        expect(component.signinForm.value.email).toBe('test@test.com');
        expect(component.signinForm.value.password).toBe('123456789');
    });
});
