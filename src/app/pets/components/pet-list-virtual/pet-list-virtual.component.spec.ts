import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModule } from '@testing/utils';
import { PetListVirtualComponent } from './pet-list-virtual.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


describe('PetListVirtualComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, InfiniteScrollModule],
      declarations: [PetListVirtualComponent]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(PetListVirtualComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
