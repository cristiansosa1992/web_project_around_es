interface UserInfoSelectors {
  userNameSelector: string;
  userDescriptionSelector: string;
  userAvatarSelector: string;
}

export interface UserData {
  name: string;
  about: string;
  avatar: string;
}

export class UserInfo {
  private userNameElement: HTMLElement;
  private userDescriptionElement: HTMLElement;
  private userAvatarElement: HTMLImageElement;

  constructor({
    userNameSelector,
    userDescriptionSelector,
    userAvatarSelector,
  }: UserInfoSelectors) {
    this.userNameElement = document.querySelector(
      userNameSelector,
    ) as HTMLElement;
    this.userDescriptionElement = document.querySelector(
      userDescriptionSelector,
    ) as HTMLElement;
    this.userAvatarElement = document.querySelector(
      userAvatarSelector,
    ) as HTMLImageElement;
  }

  public getUserInfo(): UserData {
    return {
      name: this.userNameElement.textContent ?? "",
      about: this.userDescriptionElement.textContent ?? "",
      avatar: this.userAvatarElement.src,
    };
  }

  public setUserInfo(data: UserData): void {
    this.userNameElement.textContent = data.name;
    this.userDescriptionElement.textContent = data.about;
    this.userAvatarElement.src = data.avatar;
    this.userAvatarElement.alt = `Avatar de ${data.name}`;
  }
}
