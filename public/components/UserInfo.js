export class UserInfo {
    constructor({ userNameSelector, userDescriptionSelector }) {
        this.userNameElement = document.querySelector(userNameSelector);
        this.userDescriptionElement = document.querySelector(userDescriptionSelector);
    }
    getUserInfo() {
        return {
            name: this.userNameElement.textContent ?? "",
            about: this.userDescriptionElement.textContent ?? "",
        };
    }
    setUserInfo(data) {
        this.userNameElement.textContent = data.name;
        this.userDescriptionElement.textContent = data.about;
    }
}
