import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { Section } from "./components/Section.js";
import { UserInfo } from "./components/UserInfo.js";
import { addCardButton, defaultFormConfig, editButton, editProfileFormElement, initialCards, newCardFormElement, } from "./utils/constants.js";
const userInfo = new UserInfo({
    userNameSelector: ".profile__title",
    userDescriptionSelector: ".profile__description",
});
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();
const createCard = (data) => {
    const card = new Card(data, "#card-template", (cardData) => {
        imagePopup.open(cardData);
    });
    return card.generateCard();
};
const cardSection = new Section({
    items: initialCards,
    renderer: (item) => {
        cardSection.addItem(createCard(item));
    },
}, ".cards__list");
cardSection.renderItems();
const editProfileValidator = new FormValidator(defaultFormConfig, editProfileFormElement);
editProfileValidator.enableValidation();
const newCardValidator = new FormValidator(defaultFormConfig, newCardFormElement);
newCardValidator.enableValidation();
const editProfilePopup = new PopupWithForm("#edit-popup", (inputValues) => {
    userInfo.setUserInfo({
        name: inputValues.name,
        description: inputValues.description,
    });
    editProfilePopup.close();
});
editProfilePopup.setEventListeners();
const newCardPopup = new PopupWithForm("#new-card-popup", (inputValues) => {
    const cardElement = createCard({
        name: inputValues["place-name"],
        link: inputValues.link,
    });
    cardSection.addItem(cardElement);
    newCardPopup.close();
});
newCardPopup.setEventListeners();
editButton.addEventListener("click", () => {
    const currentUserInfo = userInfo.getUserInfo();
    const nameInput = editProfileFormElement.elements.namedItem("name");
    const descriptionInput = editProfileFormElement.elements.namedItem("description");
    nameInput.value = currentUserInfo.name;
    descriptionInput.value = currentUserInfo.description;
    editProfileValidator.resetValidation();
    editProfilePopup.open();
});
addCardButton.addEventListener("click", () => {
    newCardValidator.resetValidation();
    newCardPopup.open();
});
