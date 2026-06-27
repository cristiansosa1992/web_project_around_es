import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithConfirmation } from "./components/PopupWithConfirmation.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { Section } from "./components/Section.js";
import { UserInfo } from "./components/UserInfo.js";
import { addCardButton, defaultFormConfig, editButton, editAvatarFormElement, editProfileFormElement, newCardFormElement, avatarButton, } from "./utils/constants.js";
import { Api } from "./api.js";
const api = new Api({
    baseUrl: "https://around-api.es.tripleten-services.com/v1",
    headers: {
        authorization: "33edc9a1-01c9-44d0-b7d0-a56b0a4c478b",
        "Content-Type": "application/json",
    },
});
const userInfo = new UserInfo({
    userNameSelector: ".profile__title",
    userDescriptionSelector: ".profile__description",
    userAvatarSelector: ".profile__image",
});
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();
const confirmationDeletePopup = new PopupWithConfirmation("#confirmation__delete-popup");
confirmationDeletePopup.setEventListeners();
//DUDAS AQUI SOBRE ELIMINAR LA CARTA
const createCard = (data) => {
    const card = new Card(data, "#card-template", (cardData) => {
        imagePopup.open(cardData);
    }, () => {
        confirmationDeletePopup.open();
        confirmationDeletePopup.setSubmitAction(async () => {
            if (!data._id) {
                return;
            }
            await api.deleteCard(data._id);
            card.removeCard();
            confirmationDeletePopup.close();
        });
    }, async (likeStatus) => {
        if (!data._id) {
            return;
        }
        if (likeStatus) {
            await api.addLike(data._id);
            return likeStatus;
        }
        await api.removeLike(data._id);
        return likeStatus;
    });
    return card.generateCard();
};
const cardSection = new Section({
    renderer: (item) => {
        cardSection.addItem(createCard(item));
    },
}, ".cards__list");
const editProfileValidator = new FormValidator(defaultFormConfig, editProfileFormElement);
editProfileValidator.enableValidation();
const newCardValidator = new FormValidator(defaultFormConfig, newCardFormElement);
newCardValidator.enableValidation();
const editAvatarValidator = new FormValidator(defaultFormConfig, editAvatarFormElement);
editAvatarValidator.enableValidation();
const editProfilePopup = new PopupWithForm("#edit-popup", async (inputValues) => {
    try {
        editProfilePopup.setLoading(true);
        const formData = {
            name: inputValues.name,
            about: inputValues.description,
        };
        const data = await api.editUser(formData);
        userInfo.setUserInfo(data);
        editProfilePopup.close();
    }
    catch (err) {
        console.error(err);
    }
    finally {
        editProfilePopup.setLoading(false);
    }
});
editProfilePopup.setEventListeners();
// EDITAR AVATAR
const editAvatarPopup = new PopupWithForm("#edit-avatar-popup", async (data) => {
    try {
        editAvatarPopup.setLoading(true);
        const user = await api.editAvatar(data.avatar);
        userInfo.setUserInfo(user);
        editAvatarPopup.close();
    }
    catch (err) {
        console.error(err);
    }
    finally {
        editAvatarPopup.setLoading(false);
    }
});
editAvatarPopup.setEventListeners();
// Instancia del popup para crear nuevas tarjetas.
// Cuando el usuario envía el formulario:
// 1. Envía los datos al servidor mediante POST.
// 2. Recibe la tarjeta creada.
// 3. Genera el elemento visual de la tarjeta.
// 4. La agrega a la página.
// 5. Cierra el popup.
const newCardPopup = new PopupWithForm("#new-card-popup", async (inputValues) => {
    try {
        newCardPopup.setLoading(true);
        const cardData = await api.addCard({
            name: inputValues["place-name"],
            link: inputValues.link,
            isLiked: false,
        });
        const cardElement = createCard(cardData);
        cardSection.addItem(cardElement);
        newCardPopup.close();
    }
    catch (err) {
        console.error(err);
    }
    finally {
        newCardPopup.setLoading(false);
    }
});
newCardPopup.setEventListeners();
editButton.addEventListener("click", () => {
    const currentUserInfo = userInfo.getUserInfo();
    const nameInput = editProfileFormElement.elements.namedItem("name");
    const descriptionInput = editProfileFormElement.elements.namedItem("description");
    nameInput.value = currentUserInfo.name;
    descriptionInput.value = currentUserInfo.about;
    editProfileValidator.resetValidation();
    editProfilePopup.open();
});
addCardButton.addEventListener("click", () => {
    newCardValidator.resetValidation();
    newCardPopup.open();
});
//prueba de conexion
async function loadData() {
    try {
        const [userData, cardsData] = await Promise.all([
            api.getUser(),
            api.getInitialCards(),
        ]);
        userInfo.setUserInfo(userData);
        cardSection.renderItems(cardsData);
        console.log(userData);
        console.log(cardsData);
    }
    catch (err) {
        console.error(err);
    }
}
avatarButton.addEventListener("click", () => {
    editAvatarValidator.resetValidation();
    editAvatarPopup.open();
});
loadData();
