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
  selector: 'tja-user-song-detail-form',
  templateUrl: './user-song-detail-form.component.html',
  styleUrls: ['./user-song-detail-form.component.css'],
})
export class UserSongDetailFormComponent implements OnChanges {
  //
  @Input()
  song: UserSong;

  @Output()
  submitted = new EventEmitter<UserSong>();

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
      name: this.song.keySignature,
    });
  }

  revert() {
    this.rebuildForm();
  }

  onSubmit() {
    this.song = this.prepareSaveItem();
    // this.heroService.updateHero(this.hero).subscribe(/* error handling */);
    // this.rebuildForm();
    this.submitted.emit(this.song);
  }

  prepareSaveItem(): UserSong {
    const formModel = this.form.value;

    const saveItem: UserSong = {
      id: this.song.id,
      keySignature: formModel.name as string,
    };

    return saveItem;
  }
}
