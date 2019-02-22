import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { Component, NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@app/shared/modules/common/material.module';
import { TestingModule } from '@testing/utils';

// Noop component is only a workaround to trigger change detection
@Component({
  template: ''
})
class NoopComponent { }

const TEST_DIRECTIVES = [
  NoopComponent
];

@NgModule({
  imports: [MatDialogModule, TestingModule],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES
})
class DialogTestModule { }

describe('InformationDialog', () => {
  let dialog: MatDialog;
  let overlayContainerElement: HTMLElement;

  let noop: ComponentFixture<NoopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DialogTestModule],
      providers: [
        {
          provide: OverlayContainer, useFactory: () => {
            overlayContainerElement = document.createElement('div');
            return { getContainerElement: () => overlayContainerElement };
          }
        }
      ]
    });

    dialog = TestBed.get(MatDialog);

    noop = TestBed.createComponent(NoopComponent);

  });

  it('shows information without details', () => {
    const config = {
      data: {
        title: 'Remove pet',
        details: []
      }
    };
    dialog.open(ConfirmDialogComponent, config);

    noop.detectChanges(); // Updates the dialog in the overlay

    const h1 = overlayContainerElement.querySelector('h1');
    const button = overlayContainerElement.querySelector('button');
    expect(h1.textContent).toBe('Remove pet');
    expect(button.textContent).toBe('close');
  });

  it('shows an error message with some details', () => {

    const config = {
      data: {
        title: 'Remove pet',
        text: ['Are you sure you want to remove the pet?']
      }
    };
    dialog.open(ConfirmDialogComponent, config);

    noop.detectChanges(); // Updates the dialog in the overlay

    const p = overlayContainerElement.querySelector('p');
    const actions = overlayContainerElement.querySelectorAll('.actions button');
    expect(p.textContent).toBe('Are you sure you want to remove the pet?');
    expect(actions[0].textContent).toBe('Cancel');
    expect(actions[1].textContent).toBe('Delete');
  });
});



