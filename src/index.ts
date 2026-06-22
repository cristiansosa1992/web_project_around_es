import { Card } from "./components/Card.js";
import type { CardData } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { Section } from "./components/Section.js";
import { UserInfo } from "./components/UserInfo.js";
import {
  addCardButton,
  defaultFormConfig,
  editButton,
  editProfileFormElement,
  initialCards,
  newCardFormElement,
} from "./utils/constants.js";

import{Api}from"./api.js";

const userInfo = new UserInfo({
  userNameSelector: ".profile__title",
  userDescriptionSelector: ".profile__description",
});

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const createCard = (data: CardData): HTMLElement => {
  const card = new Card(data, "#card-template", (cardData) => {
    imagePopup.open(cardData);
  });

  return card.generateCard();
};

const cardSection = new Section<CardData>(
  {
   
    renderer: (item) => {
      cardSection.addItem(createCard(item));
    },
  },
  ".cards__list",
);



const editProfileValidator = new FormValidator(
  defaultFormConfig,
  editProfileFormElement,
);
editProfileValidator.enableValidation();

const newCardValidator = new FormValidator(
  defaultFormConfig,
  newCardFormElement,
);
newCardValidator.enableValidation();

const editProfilePopup = new PopupWithForm(
  "#edit-popup",
 async (inputValues) => {
    const formData =  {
      name: inputValues.name,
      about: inputValues.description,
    }

    const data = await api.editUser(formData)
    userInfo.setUserInfo(data);
    editProfilePopup.close();
  },
);

editProfilePopup.setEventListeners();

const newCardPopup = new PopupWithForm(
  "#new-card-popup",
  (inputValues) => {
    const cardElement = createCard({
      name: inputValues["place-name"],
      link: inputValues.link,
    });

    cardSection.addItem(cardElement);
    newCardPopup.close();
  },
);

newCardPopup.setEventListeners();

editButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  const nameInput = editProfileFormElement.elements.namedItem(
    "name",
  ) as HTMLInputElement;
  const descriptionInput = editProfileFormElement.elements.namedItem(
    "description",
  ) as HTMLInputElement;

  nameInput.value = currentUserInfo.name;
  descriptionInput.value = currentUserInfo.about;

  editProfileValidator.resetValidation();
  editProfilePopup.open();
});

addCardButton.addEventListener("click", () => {
  newCardValidator.resetValidation();
  newCardPopup.open();
});

//creacion API

// 1. Creamos la instancia de la API configurando la URL base y el token
const api = new Api({
  baseUrl: 'https://around-api.es.tripleten-services.com/v1',
  headers: {
    authorization: '33edc9a1-01c9-44d0-b7d0-a56b0a4c478b',
    'Content-Type': 'application/json'
  }
});

//prueba de conexion
async function user() {
  try {
    const data = await api.getUser();
    userInfo.setUserInfo(data);
    console.log("Información del usuario recibida:", data);
  } catch (err) {
    console.error("Error al traer usuario:", err);
  }
}


async function card() {
  try {
    const data = await api.getInitialCards();
    cardSection.renderItems(data);
    console.log("Tarjetas iniciales recibidas:", data);
  } catch (err) {
    console.error("Error al traer tarjetas:", err);
  }
}




user();
card();