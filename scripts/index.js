// Datos iniciales
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"
  }
];

// Selección de elementos
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

// Funciones reutilizables
function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

// cerrar popup imagen
closeImagePopupBtn.addEventListener("click", function () {
  closeModal(imagePopup);
});

// Editar perfil
function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descripcionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editPopup);
}

editButton.addEventListener("click", handleOpenEditModal);

closeEditPopupBtn.addEventListener("click", function () {
  closeModal(editPopup);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descripcionInput.value;

  closeModal(editPopup);
}

formElement.addEventListener("submit", handleProfileFormSubmit);

// Cards
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

  // título e imagen
  title.textContent = name;
  image.src = link;
  image.alt = name;

  let timer = null;

  // like
  like.addEventListener("click", function(){
    handleLikeButton(like)
  });

  // eliminar
  deleteCard.addEventListener("click", function () {
    cardElement.remove();
  });

  // abrir imagen
  image.addEventListener("click", function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
           popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;

    openModal(imagePopup);
    }, 250);
 //se implemente un doble clic como lo haria instagram para dar like 
  });
  image.addEventListener("dblclick",function(){
    clearTimeout(timer);
     handleLikeButton(like)
  });
  return cardElement;
}

function renderCard(name, link, container) {
  const cardElement = getCardElement({ name, link });
  container.append(cardElement);
}

// render inicial
initialCards.forEach(item => {
  renderCard(item.name, item.link, cardsContainer);
});

// Nuevo card popup
addCardButton.addEventListener("click", function () {
  openModal(newCardPopup);
});

closeNewCardPopupBtn.addEventListener("click", function () {
  closeModal(newCardPopup);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const titleValue = cardTitle.value;
  const linkValue = cardLink.value;

  renderCard(titleValue, linkValue, cardsContainer);

  closeModal(newCardPopup);

  cardFormElement.reset();
}

cardFormElement.addEventListener("submit", handleCardFormSubmit);



function handleLikeButton(element) {
  // Al eliminar el contador, esta función solo se encarga de alternar la clase.
  // Como usa 'evt.target', siempre sabrá exactamente a qué corazón le diste clic.
  element.classList.toggle("card__like-button_is-active");
  console.log("boton clickeado");
}