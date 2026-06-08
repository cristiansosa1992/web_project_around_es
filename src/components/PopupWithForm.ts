import { Popup } from "./Popup.js";

export type FormSubmitHandler = (inputValues: Record<string, string>) => void;

export class PopupWithForm extends Popup {
  private formElement: HTMLFormElement;
  private inputList: HTMLInputElement[];
  private handleFormSubmit: FormSubmitHandler;

  constructor(popupSelector: string, handleFormSubmit: FormSubmitHandler) {
    super(popupSelector);

    this.formElement = this.popupElement.querySelector(
      ".popup__form",
    ) as HTMLFormElement;
    this.inputList = Array.from(
      this.formElement.querySelectorAll(".popup__input"),
    ) as HTMLInputElement[];
    this.handleFormSubmit = handleFormSubmit;
  }

  private getInputValues(): Record<string, string> {
    const formValues: Record<string, string> = {};

    this.inputList.forEach((inputElement) => {
      formValues[inputElement.name] = inputElement.value;
    });

    return formValues;
  }

  public setEventListeners(): void {
    super.setEventListeners();

    this.formElement.addEventListener("submit", (evt: SubmitEvent) => {
      evt.preventDefault();
      this.handleFormSubmit(this.getInputValues());
    });
  }

  public close(): void {
    super.close();
    this.formElement.reset();
  }
}
