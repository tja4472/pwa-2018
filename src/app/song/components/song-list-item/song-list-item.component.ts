import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tja-song-list-item',
  templateUrl: './song-list-item.component.html',
  styleUrls: ['./song-list-item.component.css'],
})
export class SongListItemComponent {
  //
  @Input()
  label: string;
  @Input()
  data: string;
  @Input()
  lineWrap: boolean = false;

  constructor() {}
}
