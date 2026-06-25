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

/*export const initialCards: CardData[] = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];  */

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
