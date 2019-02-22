import { Component, Inject, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Store, Action } from '@ngrx/store';
import { State } from '@app/pets/store/pet.selector';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      cancel?: Action,
      delete: Action,
      go?: Action,
      text: string,
      title: string
    },
    private mdDialogRef: MatDialogRef<ConfirmDialogComponent>,
    private store: Store<State>
  ) { }

  public cancel() {
    if (this.data.cancel !== undefined) {
      this.store.dispatch(this.data.cancel);
    }
    this.close();
  }

  public close() {
    this.mdDialogRef.close();
  }

  public delete() {
    this.store.dispatch(this.data.delete);
    if (this.data.go !== undefined) {
      this.store.dispatch(this.data.go);
    }
    this.close();
  }

  @HostListener('keydown.esc')
  public onEsc() {
    this.close();
  }

}
