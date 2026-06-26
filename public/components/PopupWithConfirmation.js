import { Popup } from "./Popup.js";
export class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this.submitButton = this.popupElement.querySelector(".popup__button");
        this.handleSubmitAction = () => { };
    }
    setSubmitAction(action) {
        this.handleSubmitAction = action;
    }
    setEventListeners() {
        super.setEventListeners();
        this.submitButton.addEventListener("click", async () => {
            await this.handleSubmitAction();
        });
    }
}
