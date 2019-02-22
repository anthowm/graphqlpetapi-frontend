import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from '@app/pets/store/pet.selector';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { FileValidator } from 'ngx-material-file-input';
import { FileTypeValidator } from '@app/shared/modules/validators/mimetype-validator';
@Component({
  selector: 'app-form-pet',
  templateUrl: './form-pet.component.html',
  styleUrls: ['./form-pet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormPetComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  @Input() title: string;
  @Input() sendButtonName: string;
  @Input() pet: any;
  @Input() mode = 'create';
  readonly MAX_SIZE = 10485760;

  @Output() save = new EventEmitter<any>();
  petForm: FormGroup;
  constructor(
    public store: Store<State>,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initPetForm();
  }

  initPetForm() {
    if (this.mode === 'create') {
      this.petForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        type: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
        imageUrls: ['', [Validators.required, FileValidator.maxContentSize(this.MAX_SIZE), FileTypeValidator.validateMimeType]]
      });
    } else if (this.mode === 'edit') {
      this.petForm = this.fb.group({
        name: [this.pet.name, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        type: [this.pet.type, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
        imageUrls: ['', [FileValidator.maxContentSize(this.MAX_SIZE), FileTypeValidator.validateMimeType]]
      });
      const petFormated = {
        id: this.pet.id,
        name: this.pet.name,
        type: this.pet.type
      };
      this.petForm.patchValue({ ...petFormated });
    }
  }

  onSubmit() {
    if (this.petForm.valid) {
      if (this.mode === 'edit') {
        this.save.emit({ ...this.petForm.value, id: this.pet.id });
      } else {
        this.save.emit(this.petForm.value);
      }
    }

  }

}
