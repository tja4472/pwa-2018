export interface ViewUserSong {
  readonly keySignature: string;
  readonly songId: string;
  readonly songTitle: string;
  readonly songKeySignature: string;
}

export function newViewUserSong(): ViewUserSong {
  return {
    keySignature: '',
    songId: '',
    songKeySignature: '',
    songTitle: '',
  };
}
