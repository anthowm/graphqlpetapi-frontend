import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModule } from '@testing/utils';
import { SignUpComponent } from './signup.component';

describe('SignUpComponent', () => {
    let component: SignUpComponent;
    let fixture: ComponentFixture<SignUpComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestingModule],
            declarations: [SignUpComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(SignUpComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
    });

    it('should signupform invalid when empty', () => {
        expect(component.signupForm.valid).toBeFalsy();
    });

    it('check name field validity', () => {
        let errors = {};
        const name = component.signupForm.controls['name'];
        expect(name.valid).toBeFalsy();

        // name field is required
        errors = name.errors || {};
        expect(errors['required']).toBeTruthy();

        // Set name something minLenght true maxLenght false
        name.setValue('te');
        errors = name.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['minlength']).toBeTruthy();
        expect(errors['maxlength']).toBeFalsy();

        // Set name something minLenght false maxLenght true
        name.setValue('012345678901234567890123');
        errors = name.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['minlength']).toBeFalsy();
        expect(errors['maxlength']).toBeTruthy();

        // Set name to something correct
        name.setValue('test');
        errors = name.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['minlength']).toBeFalsy();
        expect(errors['maxlength']).toBeFalsy();
    });

    it('check email field validity', () => {
        let errors = {};
        const email = component.signupForm.controls['email'];
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

    it('password field validity', () => {
        let errors = {};
        const password = component.signupForm.controls['password'];

        // Email field is required
        errors = password.errors || {};
        expect(errors['required']).toBeTruthy();

        // Set email value - minLenght true maxLength false
        password.setValue('123456');
        errors = password.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['minlength']).toBeTruthy();
        expect(errors['maxlength']).toBeFalsy();
        // Set email value - minLenght false maxLength true
        password.setValue('123456789123456789123456');
        errors = password.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['minlength']).toBeFalsy();
        expect(errors['maxlength']).toBeTruthy();
        // Set email to something correct
        password.setValue('123456789');
        errors = password.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['minlength']).toBeFalsy();
        expect(errors['maxlength']).toBeFalsy();
    });

    it('should submit signupForm', () => {
        expect(component.signupForm.valid).toBeFalsy();
        component.signupForm.controls['name'].setValue('test');
        component.signupForm.controls['email'].setValue('test@test.com');
        component.signupForm.controls['password'].setValue('123456789');
        expect(component.signupForm.valid).toBeTruthy();

        component.onSignup();
        expect(component.signupForm.value.email).toBe('test@test.com');
        expect(component.signupForm.value.password).toBe('123456789');
    });
});



