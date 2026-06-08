export class FormValidator {
    constructor(config, formElement) {
        this.config = config;
        this.formElement = formElement;
        this.submitButton = this.formElement.querySelector(this.config.submitButtonSelector);
        this.inputList = Array.from(this.formElement.querySelectorAll(this.config.inputSelector));
    }
    showInputError(inputElement, errorMessage) {
        const errorElement = this.formElement.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.config.errorMessageClass);
        errorElement.classList.remove(this.config.hiddenErrorClass);
        inputElement.classList.add(this.config.inputErrorClass);
    }
    hideInputError(inputElement) {
        const errorElement = this.formElement.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = "";
        errorElement.classList.remove(this.config.errorMessageClass);
        errorElement.classList.add(this.config.hiddenErrorClass);
        inputElement.classList.remove(this.config.inputErrorClass);
    }
    checkInputValidity(inputElement) {
        if (inputElement.validity.valid) {
            this.hideInputError(inputElement);
        }
        else {
            this.showInputError(inputElement, inputElement.validationMessage);
        }
    }
    hasInvalidInput() {
        return this.inputList.some((inputElement) => !inputElement.validity.valid);
    }
    toggleButtonState() {
        if (this.hasInvalidInput()) {
            this.submitButton.disabled = true;
            this.submitButton.classList.add(this.config.inactiveButtonClass);
        }
        else {
            this.submitButton.disabled = false;
            this.submitButton.classList.remove(this.config.inactiveButtonClass);
        }
    }
    setEventListeners() {
        this.toggleButtonState();
        this.inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this.checkInputValidity(inputElement);
                this.toggleButtonState();
            });
        });
    }
    enableValidation() {
        this.formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        this.setEventListeners();
    }
    resetValidation() {
        this.inputList.forEach((inputElement) => {
            this.hideInputError(inputElement);
        });
        this.toggleButtonState();
    }
}
