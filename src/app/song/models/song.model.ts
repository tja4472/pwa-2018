export interface Song {
  readonly alsoKnownAs: string;
  readonly comment: string;
  readonly composer: string;
  readonly hasLyrics: boolean;
  readonly id: string;
  readonly keySignature: string;
  readonly lyricist: string;
  readonly style: string;
  readonly timeSignature: string;
  readonly title: string;
  readonly year: number;
}

export function newSong(): Song {
  return {
    alsoKnownAs: '',
    comment: '',
    composer: '',
    hasLyrics: false,
    id: '',
    keySignature: '',
    lyricist: '',
    style: '',
    timeSignature: '',
    title: '',
    year: 0,
  };
}
