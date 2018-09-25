export interface UserSong {
  readonly id: string;
  readonly keySignature: string;
}

export function newUserSong(): UserSong {
  return {
    id: '',
    keySignature: '',
  };
}
