import { NgModule } from '@angular/core';
import { ConfirmDialogComponent } from '@app/core/confirm-dialog/confirm-dialog.component';
import { MaterialModule } from './material.module';

@NgModule({
    entryComponents: [
        ConfirmDialogComponent
    ],
    declarations: [
        ConfirmDialogComponent
    ],
    imports: [
        MaterialModule
    ],
    exports: [
        MaterialModule
    ]
})
export class SharedModule { }
