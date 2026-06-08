import type { DefaultFormConfig } from "../utils/constants.js";

export class FormValidator {
  private config: DefaultFormConfig;
  private formElement: HTMLFormElement;
  private submitButton: HTMLButtonElement;
  private inputList: HTMLInputElement[];

  constructor(config: DefaultFormConfig, formElement: HTMLFormElement) {
    this.config = config;
    this.formElement = formElement;
    this.submitButton = this.formElement.querySelector(
      this.config.submitButtonSelector,
    ) as HTMLButtonElement;
    this.inputList = Array.from(
      this.formElement.querySelectorAll(this.config.inputSelector),
    ) as HTMLInputElement[];
  }

  private showInputError(
    inputElement: HTMLInputElement,
    errorMessage: string,
  ): void {
    const errorElement = this.formElement.querySelector(
      `#${inputElement.id}-error`,
    ) as HTMLElement;

    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.config.errorMessageClass);
    errorElement.classList.remove(this.config.hiddenErrorClass);
    inputElement.classList.add(this.config.inputErrorClass);
  }

  private hideInputError(inputElement: HTMLInputElement): void {
    const errorElement = this.formElement.querySelector(
      `#${inputElement.id}-error`,
    ) as HTMLElement;

    errorElement.textContent = "";
    errorElement.classList.remove(this.config.errorMessageClass);
    errorElement.classList.add(this.config.hiddenErrorClass);
    inputElement.classList.remove(this.config.inputErrorClass);
  }

  private checkInputValidity(inputElement: HTMLInputElement): void {
    if (inputElement.validity.valid) {
      this.hideInputError(inputElement);
    } else {
      this.showInputError(inputElement, inputElement.validationMessage);
    }
  }

  private hasInvalidInput(): boolean {
    return this.inputList.some((inputElement) => !inputElement.validity.valid);
  }

  private toggleButtonState(): void {
    if (this.hasInvalidInput()) {
      this.submitButton.disabled = true;
      this.submitButton.classList.add(this.config.inactiveButtonClass);
    } else {
      this.submitButton.disabled = false;
      this.submitButton.classList.remove(this.config.inactiveButtonClass);
    }
  }

  private setEventListeners(): void {
    this.toggleButtonState();

    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  public enableValidation(): void {
    this.formElement.addEventListener("submit", (evt: SubmitEvent) => {
      evt.preventDefault();
    });

    this.setEventListeners();
  }

  public resetValidation(): void {
    this.inputList.forEach((inputElement) => {
      this.hideInputError(inputElement);
    });

    this.toggleButtonState();
  }
}
