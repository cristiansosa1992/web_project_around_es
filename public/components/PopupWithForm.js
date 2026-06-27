import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this.formElement = this.popupElement.querySelector(".popup__form");
        this.submitButton = this.formElement.querySelector(".popup__button");
        this.submitButtonText = this.submitButton.textContent ?? "";
        this.inputList = Array.from(this.formElement.querySelectorAll(".popup__input"));
        this.handleFormSubmit = handleFormSubmit;
    }
    getInputValues() {
        const formValues = {};
        this.inputList.forEach((inputElement) => {
            formValues[inputElement.name] = inputElement.value;
        });
        return formValues;
    }
    setEventListeners() {
        super.setEventListeners();
        this.formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this.handleFormSubmit(this.getInputValues());
        });
    }
    close() {
        super.close();
        this.formElement.reset();
    }
    setLoading(value) {
        this.submitButton.textContent = value ? "Guardando..." : this.submitButtonText;
    }
}
