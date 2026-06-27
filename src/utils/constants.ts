import type { CardData } from "../components/Card.js";

export interface DefaultFormConfig {
  inputSelector: string;
  submitButtonSelector: string;
  inactiveButtonClass: string;
  inputErrorClass: string;
  errorMessageClass: string;
  hiddenErrorClass: string;
}

export const defaultFormConfig: DefaultFormConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorMessageClass: "error-visible",
  hiddenErrorClass: "error-hidden",
};



export const avatarButton = document.querySelector(
  ".profile__image",
) as HTMLImageElement;

export const editButton = document.querySelector(
  ".profile__edit-button",
) as HTMLButtonElement;

export const addCardButton = document.querySelector(
  ".profile__add-button",
) as HTMLButtonElement;

export const editProfileFormElement = document.querySelector(
  "#edit-profile-form",
) as HTMLFormElement;

export const newCardFormElement = document.querySelector(
  "#new-card-form",
) as HTMLFormElement;

export const editAvatarFormElement = document.querySelector(
  "#edit-avatar-form",
) as HTMLFormElement;
