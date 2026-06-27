export class UserInfo {
    constructor({ userNameSelector, userDescriptionSelector, userAvatarSelector, }) {
        this.userNameElement = document.querySelector(userNameSelector);
        this.userDescriptionElement = document.querySelector(userDescriptionSelector);
        this.userAvatarElement = document.querySelector(userAvatarSelector);
    }
    getUserInfo() {
        return {
            name: this.userNameElement.textContent ?? "",
            about: this.userDescriptionElement.textContent ?? "",
            avatar: this.userAvatarElement.src,
        };
    }
    setUserInfo(data) {
        this.userNameElement.textContent = data.name;
        this.userDescriptionElement.textContent = data.about;
        this.userAvatarElement.src = data.avatar;
        this.userAvatarElement.alt = `Avatar de ${data.name}`;
    }
}
