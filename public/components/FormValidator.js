// Duda,
export class FormValidator {
    constructor(data, formElement) {
        this.inputSelector = data.inputSelector;
        this.submitButtonSelector = data.submitButtonSelector;
        this.inactiveButtonClass = data.inactiveButtonClass;
        this.inputErrorClass = data.inputErrorClass;
        this.errorMessageClass = data.errorMessageClass;
    }
    // TODO: Agregar las funcinoes que están en validate.js
    showInputErro() { }
    hideInputError() {
    }
    setEventListeners() { }
}
