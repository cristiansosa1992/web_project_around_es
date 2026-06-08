import { defaultFormConfig, initialCards } from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
const editProfile = document.querySelector(".profile");
const editProfileButton = editProfile.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const editPopupCloseButton = editPopup.querySelector(".popup__close");
let profileFormSubmit = editPopup.querySelector("#edit-profile-form");
// const cardTemplate = document.querySelector("#card-template");
const cardContainer = document.querySelector(".cards__list");
const addCardButton = editProfile.querySelector(".profile__add-button");
const newCardPopup = document.querySelector("#new-card-popup");
const newCardPopupCloseButton = newCardPopup.querySelector(".popup__close");
let cardFormSubmit = newCardPopup.querySelector("#new-card-form");
const cardImagePopup = document.querySelector("#image-popup");
const imagePopup = cardImagePopup.querySelector(".popup__image");
const imagePopupCaption = cardImagePopup.querySelector(".popup__caption");
const imagePopupCloseButton = cardImagePopup.querySelector(".popup__close");
const popups = document.querySelectorAll(".popup");
//
const editProfileFormValidator = new FormValidator(defaultFormConfig, profileFormSubmit);
//
const cardFormValidator = new FormValidator(defaultFormConfig, cardFormSubmit);
editProfileFormValidator.enableValidation();
cardFormValidator.enableValidation();
imagePopupCloseButton.addEventListener("click", () => {
    closePopup(cardImagePopup);
});
//
const cardSection = new Section({
    items: initialCards,
    renderer: (item) => {
        const newCard = new Card(item, "#card-template", () => {
            imagePopup.src = item.link;
            imagePopup.alt = item.name;
            imagePopupCaption.textContent = item.name;
            openPopup(cardImagePopup);
        });
        const cardRenderer = newCard.getCardElement();
        cardSection.addItem(cardRenderer);
    },
}, ".cards__list");
cardSection.renderItems();
const popupImage = new PopupWithImage("#image-popup");
popupImage.setEventListeners();
function openPopup(popup) {
    popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", handleEscClose);
}
function closePopup(popup) {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", handleEscClose);
}
function fillProfileForm() {
    const profileTitle = editProfile.querySelector(".profile__title");
    const profileDescription = editProfile.querySelector(".profile__description");
    const currentTitle = profileTitle.textContent;
    const currentDescription = profileDescription.textContent;
    const titleInput = editPopup.querySelector(".popup__input_type_name");
    const descriptionInput = editPopup.querySelector(".popup__input_type_description");
    titleInput.value = currentTitle;
    descriptionInput.value = currentDescription;
}
function handleOpenEditModal() {
    fillProfileForm();
    openPopup(editPopup);
}
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    let nameInput = editPopup.querySelector(".popup__input_type_name");
    let jobInput = editPopup.querySelector(".popup__input_type_description");
    const newTitle = nameInput.value;
    const newDescription = jobInput.value;
    const newTitleInput = editProfile.querySelector(".profile__title");
    const newDescriptionInput = editProfile.querySelector(".profile__description");
    newTitleInput.textContent = newTitle;
    newDescriptionInput.textContent = newDescription;
}
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const nameCard = newCardPopup.querySelector(".popup__input_type_card-name");
    const linkCard = newCardPopup.querySelector(".popup__input_type_url");
    const newCardData = {
        name: nameCard.value,
        link: linkCard.value,
    };
    renderCard(newCardData.name, newCardData.link, cardContainer);
    closePopup(newCardPopup);
}
const closePopupByOverlay = (evt) => {
    const overlayClicked = evt.target.classList.contains("popup_is-opened");
    if (overlayClicked) {
        closePopup(evt.target);
    }
};
const handleEscClose = (evt) => {
    if (evt.key !== "Escape")
        return;
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
        closePopup(openedPopup);
    }
};
popups.forEach((popup) => {
    popup.addEventListener("click", (evt) => closePopupByOverlay(evt));
});
editProfileButton.addEventListener("click", handleOpenEditModal);
editPopupCloseButton.addEventListener("click", function () {
    closePopup(editPopup);
});
profileFormSubmit.addEventListener("submit", function (evt) {
    handleProfileFormSubmit(evt);
    closePopup(editPopup);
});
addCardButton.addEventListener("click", () => {
    openPopup(newCardPopup);
});
newCardPopupCloseButton.addEventListener("click", () => {
    closePopup(newCardPopup);
});
cardFormSubmit.addEventListener("submit", handleCardFormSubmit);
// initialCards.forEach((card) => {
//   renderCard(card.name, card.link, cardContainer);
// });
