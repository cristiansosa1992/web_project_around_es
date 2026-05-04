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

const closeEditPopupBtn = editPopup.querySelector(".popup__close");
const closeNewCardPopupBtn = newCardPopup.querySelector(".popup__close");

// popup imagen
const imagePopup = document.querySelector("#image-popup");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const closeImagePopupBtn = imagePopup.querySelector(".popup__close");

const nameInput = document.querySelector(".popup__input_type_name");
const descripcionInput = document.querySelector(".popup__input_type_description");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const formElement = document.querySelector("#edit-profile-form");
const cardFormElement = document.querySelector("#new-card-form");

const addCardButton = document.querySelector(".profile__add-button");
const cardsContainer = document.querySelector(".cards__list");

// inputs card
const cardTitle = document.querySelector(".popup__input_type_card-name");
const cardLink = document.querySelector(".popup__input_type_url");


// =======================
// MODALES
// =======================
function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

// cerrar con ESC
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) closeModal(openedPopup);
  }
});

document.addEventListener("click", (event) => {
  const openedPopup = document.querySelector(".popup_is-opened");

  if (openedPopup && event.target === openedPopup) {
    closeModal(openedPopup);
  }
});

// =======================
// EDITAR PERFIL
// =======================
function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descripcionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editPopup);

  toggleProfileButtonState(); // 🔥 sincroniza botón
}

editButton.addEventListener("click", handleOpenEditModal);

closeEditPopupBtn.addEventListener("click", () => closeModal(editPopup));

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descripcionInput.value;

  closeModal(editPopup);
}

formElement.addEventListener("submit", handleProfileFormSubmit);


// =======================
// CARDS
// =======================
function getCardElement({ name = "Sin título", link = "./images/placeholder.jpg" } = {}) {
  const cardTemplate = document
    .querySelector("#card-template")
    .content
    .querySelector(".card");

  const cardElement = cardTemplate.cloneNode(true);

  const title = cardElement.querySelector(".card__title");
  const image = cardElement.querySelector(".card__image");
  const like = cardElement.querySelector(".card__like-button");
  const deleteCard = cardElement.querySelector(".card__delete-button");

  title.textContent = name;
  image.src = link;
  image.alt = name;

  let timer = null;

  like.addEventListener("click", () => handleLikeButton(like));

  deleteCard.addEventListener("click", () => cardElement.remove());

  image.addEventListener("click", () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      popupImage.src = link;
      popupImage.alt = name;
      popupCaption.textContent = name;
      openModal(imagePopup);
    }, 250);
  });

  image.addEventListener("dblclick", () => {
    clearTimeout(timer);
    handleLikeButton(like);
  });
closeImagePopupBtn.addEventListener("click", () => closeModal(imagePopup));
  return cardElement;
}

function renderCard(name, link, container) {
  const cardElement = getCardElement({ name, link });
  container.append(cardElement);
}

initialCards.forEach(item => {
  renderCard(item.name, item.link, cardsContainer);
});


// =======================
// NUEVA CARD
// =======================
addCardButton.addEventListener("click", () => openModal(newCardPopup));
closeNewCardPopupBtn.addEventListener("click", () => closeModal(newCardPopup));

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  renderCard(cardTitle.value, cardLink.value, cardsContainer);

  closeModal(newCardPopup);
  cardFormElement.reset();
}

cardFormElement.addEventListener("submit", handleCardFormSubmit);


// =======================
// LIKE
// =======================
function handleLikeButton(element) {
  element.classList.toggle("card__like-button_is-active");
}


// =======================
// VALIDACIÓN PERFIL
// =======================
const profileInputs = formElement.querySelectorAll(".popup__input");
const profileSubmitButton = formElement.querySelector(".popup__button");



const cardInputs = cardFormElement.querySelectorAll(".popup__input");
const cardSubmitButton = cardFormElement.querySelector(".popup__button");

cardInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.validity.valid) {
      hideError(input, cardFormElement);
    } else {
      showError(input, cardFormElement);
    }

    toggleProfileButtonState(cardFormElement, cardSubmitButton ); 
  });
});


// mostrar error
function showError(input,formElement) {
  const error = formElement.querySelector(`#${input.id}-error`);
  error.textContent = input.validationMessage;
  error.classList.add("error-visible");
  error.classList.remove("error-hidden");
}

// ocultar error
function hideError(input,formElement) {
  const error = formElement.querySelector(`#${input.id}-error`);
  error.textContent = "";
  error.classList.remove("error-visible");
  error.classList.add("error-hidden");
}

//  activar/desactivar botón
function toggleProfileButtonState(formElement, SubmitButton) {
  if (!formElement.checkValidity()) {
    SubmitButton.disabled = true;
  } else {
    SubmitButton.disabled = false;
  }
}

// escuchar inputs
profileInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.validity.valid) {
      hideError(input,formElement);
    } else {
      showError(input,formElement);
    }

    toggleProfileButtonState(formElement,profileSubmitButton); 
  });
});


