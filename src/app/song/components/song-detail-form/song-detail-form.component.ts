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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Song } from '../../models/song.model';

interface FormModel {
  alsoKnownAs: any;
  comment: any;
  composer: any;
  hasLyrics: any;
  keySignature: any;
  lyricist: any;
  style: any;
  timeSignature: any;
  title: any;
  year: any;
}

@Component({
  selector: 'tja-song-detail-form',
  templateUrl: './song-detail-form.component.html',
  styleUrls: ['./song-detail-form.component.css'],
})
export class SongDetailFormComponent implements OnChanges {
  //
  @Input()
  song: Song;

  @Output()
  readonly submitted = new EventEmitter<Song>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    // tslint:disable-next-line:no-object-literal-type-assertion
    this.form = this.fb.group({
      alsoKnownAs: '',
      comment: '',
      composer: '',
      hasLyrics: false,
      keySignature: '',
      lyricist: '',
      style: '',
      timeSignature: '',
      title: ['', Validators.required],
      year: 0,
    } as FormModel);
  }

  ngOnChanges() {
    this.rebuildForm();
  }

  rebuildForm() {
    const formModel: FormModel = {
      alsoKnownAs: this.song.alsoKnownAs,
      comment: this.song.comment,
      composer: this.song.composer,
      hasLyrics: this.song.hasLyrics,
      keySignature: this.song.keySignature,
      lyricist: this.song.lyricist,
      style: this.song.style,
      timeSignature: this.song.timeSignature,
      title: this.song.title,
      year: this.song.year,
    };

    this.form.reset(formModel);
    /*
    this.form.reset({
      title: this.song.title,
    });
    */
  }

  revert() {
    this.rebuildForm();
  }

  onSubmit(formObject) {
    console.warn(formObject);
    const formModel: FormModel = formObject;

    this.song = this.prepareSaveItem(formModel);
    // this.rebuildForm();
    this.submitted.emit(this.song);
  }

  prepareSaveItem(formModel: FormModel): Song {
    //
    // const formModel: FormModel = this.form.value;

    const saveItem: Song = {
      alsoKnownAs: formModel.alsoKnownAs as string,
      comment: formModel.comment as string,
      composer: formModel.composer as string,
      hasLyrics: formModel.hasLyrics as boolean,
      id: this.song.id,
      keySignature: formModel.keySignature as string,
      lyricist: formModel.lyricist as string,
      style: formModel.style as string,
      timeSignature: formModel.timeSignature as string,
      title: formModel.title as string,
      year: formModel.year as number,
    };

    return saveItem;
  }
}
