export interface UserInfo {
  readonly todoListId: string;
}

export function newUserInfo(): UserInfo {
  return {
    todoListId: 'default-list',
  };
}
