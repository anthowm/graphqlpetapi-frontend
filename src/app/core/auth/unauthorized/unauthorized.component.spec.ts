import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModule } from '@testing/utils';
import { UnauthorizedComponent } from './unauthorized.component';

describe('UnauthorizedComponent', () => {
    let component: UnauthorizedComponent;
    let fixture: ComponentFixture<UnauthorizedComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestingModule],
            declarations: [UnauthorizedComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(UnauthorizedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
