// =======================
// IMPORTS
// =======================
import {
  setEventListeners,
  showError,
  hideError,
  toggleButtonState
} from "./validate.js";

// =======================
// DATOS INICIALES
// =======================
const initialCards = [
  { name: "Valle de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg" },
  { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg" },
  { name: "Montañas Calvas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg" },
  { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg" },
  { name: "Parque Nacional de la Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg" },
  { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg" }
];

// =======================
// SELECTORES
// =======================
const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const newCardPopup = document.querySelector("#new-card-popup");

const imagePopup = document.querySelector("#image-popup");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

const nameInput = document.querySelector(".popup__input_type_name");
const descripcionInput = document.querySelector(".popup__input_type_description");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const formElement = document.querySelector("#edit-profile-form");
const cardFormElement = document.querySelector("#new-card-form");

const addCardButton = document.querySelector(".profile__add-button");
const cardsContainer = document.querySelector(".cards__list");

const profileInputs = formElement.querySelectorAll(".popup__input");
const profileSubmitButton = formElement.querySelector(".popup__button");

const cardInputs = cardFormElement.querySelectorAll(".popup__input");
const cardSubmitButton = cardFormElement.querySelector(".popup__button");

// =======================
// MODALES
// =======================
function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

// ESC
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) closeModal(openedPopup);
  }
});

// click fuera
document.addEventListener("click", (event) => {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (openedPopup && event.target === openedPopup) {
    closeModal(openedPopup);
  }
});

// =======================
// FUNCIÓN REUTILIZABLE 
// =======================
function setCloseListeners(modal) {
  const closeButton = modal.querySelector(".popup__close");

  closeButton.addEventListener("click", () => {
    closeModal(modal);
  });
}

//  llamar después de definir la función
setCloseListeners(editPopup);
setCloseListeners(newCardPopup);
setCloseListeners(imagePopup);

// =======================
// PERFIL
// =======================
function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descripcionInput.value = profileDescription.textContent;
}

editButton.addEventListener("click", () => {
  fillProfileForm();
  openModal(editPopup);
  toggleButtonState(formElement, profileSubmitButton);
});

formElement.addEventListener("submit", (evt) => {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descripcionInput.value;

  closeModal(editPopup);
});

// =======================
// CARDS
// =======================
function getCardElement({ name, link }) {
  const template = document.querySelector("#card-template").content;
  const cardElement = template.querySelector(".card").cloneNode(true);

  const title = cardElement.querySelector(".card__title");
  const image = cardElement.querySelector(".card__image");
  const like = cardElement.querySelector(".card__like-button");
  const del = cardElement.querySelector(".card__delete-button");

  title.textContent = name;
  image.src = link;
  image.alt = name;

  like.addEventListener("click", () => {
    like.classList.toggle("card__like-button_is-active");
  });

  del.addEventListener("click", () => cardElement.remove());

  image.addEventListener("click", () => {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openModal(imagePopup);
  });

  return cardElement;
}

function renderCard(name, link, container) {
  container.append(getCardElement({ name, link }));
}

initialCards.forEach((item) => {
  renderCard(item.name, item.link, cardsContainer);
});

// =======================
// NUEVA CARD
// =======================
addCardButton.addEventListener("click", () => openModal(newCardPopup));

cardFormElement.addEventListener("submit", (evt) => {
  evt.preventDefault();

  renderCard(
    cardFormElement.elements["place-name"].value,
    cardFormElement.elements["link"].value,
    cardsContainer
  );

  cardFormElement.reset();
  closeModal(newCardPopup);
});

// =======================
// VALIDACIÓN
// =======================
setEventListeners(formElement, profileInputs, profileSubmitButton);
setEventListeners(cardFormElement, cardInputs, cardSubmitButton);