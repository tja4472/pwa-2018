/**
 * alpha.12
 * v4: Unexpected reactive form submit behavior
 * https://github.com/ionic-team/ionic/issues/14786#issuecomment-405809838
 *
 */

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UserSong } from '../../models/user-song.model';

@Component({
  selector: 'tja-my-key-signature-form',
  templateUrl: './my-key-signature-form.component.html',
  styleUrls: ['./my-key-signature-form.component.css'],
})
export class MyKeySignatureFormComponent implements OnChanges {
  //
  @Input()
  error: string | null;
  @Input()
  keySignature: string;

  @Output()
  submitted = new EventEmitter<string>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: '',
    });
  }

  ngOnChanges() {
    this.rebuildForm();
  }

  rebuildForm() {
    this.form.reset({
      name: this.keySignature,
    });
  }

  revert() {
    this.rebuildForm();
  }

  onSubmit(formObject) {
    console.warn(formObject);
    const formModel = formObject;
    this.keySignature = this.prepareSaveItem(formModel);

    this.rebuildForm();
    this.submitted.emit(this.keySignature);
  }

  prepareSaveItem(formModel): string {
    //
    // const formModel = this.form.value;
    return formModel.name as string;
    /*
    const saveItem: UserSong = {
      id: this.song.id,
      keySignature: formModel.name as string,
    };

    return saveItem;
    */
  }
}
