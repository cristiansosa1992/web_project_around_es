import { Popup } from "./Popup.js";

type SubmitAction = () => void | Promise<void>;

export class PopupWithConfirmation extends Popup {
  private submitButton: HTMLButtonElement;
  private handleSubmitAction: SubmitAction;

  constructor(popupSelector: string) {
    super(popupSelector);

    this.submitButton = this.popupElement.querySelector(
      ".popup__button",
    ) as HTMLButtonElement;
    this.handleSubmitAction = () => {};
  }

  public setSubmitAction(action: SubmitAction): void {
    this.handleSubmitAction = action;
  }

  public setEventListeners(): void {
    super.setEventListeners();

    this.submitButton.addEventListener("click", async () => {
      await this.handleSubmitAction();
    });
  }
}
