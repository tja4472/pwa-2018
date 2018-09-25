export interface ViewSong {
  readonly alsoKnownAs: string;
  readonly comment: string;
  readonly composer: string;
  readonly hasLyrics: boolean;
  readonly id: string;
  readonly isUserSong: boolean;
  readonly keySignature: string;
  readonly lyricist: string;
  readonly style: string;
  readonly timeSignature: string;
  readonly title: string;
  readonly userKeySignature: string;
  readonly year: number;
}

export function newViewSong(): ViewSong {
  return {
    alsoKnownAs: '',
    comment: '',
    composer: '',
    hasLyrics: false,
    id: '',
    isUserSong: false,
    keySignature: '',
    lyricist: '',
    style: '',
    timeSignature: '',
    title: '',
    userKeySignature: '',
    year: 0,
  };
}
