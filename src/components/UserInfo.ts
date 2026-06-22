interface UserInfoSelectors {
  userNameSelector: string;
  userDescriptionSelector: string;
}

export interface UserData {
  name: string;
  about: string;
}

export class UserInfo {
  private userNameElement: HTMLElement;
  private userDescriptionElement: HTMLElement;

  constructor({ userNameSelector, userDescriptionSelector }: UserInfoSelectors) {
    this.userNameElement = document.querySelector(
      userNameSelector,
    ) as HTMLElement;
    this.userDescriptionElement = document.querySelector(
      userDescriptionSelector,
    ) as HTMLElement;
  }

  public getUserInfo(): UserData {
    return {
      name: this.userNameElement.textContent ?? "",
      about: this.userDescriptionElement.textContent ?? "",
    };
  }

  public setUserInfo(data: UserData): void {
    this.userNameElement.textContent = data.name;
    this.userDescriptionElement.textContent = data.about;
  }
}
