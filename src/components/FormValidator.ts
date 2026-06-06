import { DefaultFormConfig } from '../utils/constants.js';

export class FormValidator {
  private inputSelector: string;
  private submitButtonSelector: string;
  private inactiveButtonClass: string;
  private inputErrorClass: string;
  private errorMessageClass: string;
  private formElement: HTMLFormElement;

  constructor(data: DefaultFormConfig, formElement: HTMLFormElement) {
    this.inputSelector = data.inputSelector;
    this.submitButtonSelector = data.submitButtonSelector;
    this.inactiveButtonClass = data.inactiveButtonClass;
    this.inputErrorClass = data.inputErrorClass;
    this.errorMessageClass = data.errorMessageClass;
    this.formElement = formElement;
  }

  // ¿Qué valores toman estos métodos?
  private _showInputError(
    inputElement: HTMLInputElement,
    errorMessage: string
  ): void {

  }

  private _hideInputError(
    inputElement: HTMLInputElement
  ): void {

  }

  private _checkInputValidity(
    inputElement: HTMLInputElement
  ): void {

  }

  private _toggleButtonState(): void {

  }

  private _setEventListeners(): void {

  }

  public enableValidation(): void {
    this._setEventListeners();
  }
  public resetValidation(): void {
  const inputList = Array.from(
    this.formElement.querySelectorAll(this.inputSelector)
  ) as HTMLInputElement[];

  inputList.forEach((inputElement) => {
    this._hideInputError(inputElement);
  });

  this._toggleButtonState();
}

}