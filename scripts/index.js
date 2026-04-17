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

// Recorrer tarjetas (debug)
initialCards.forEach(function(item) {
  console.log(item.name);
  console.log(item.link);
});

// Selección de elementos
const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const closePopup = document.querySelector(".popup__close");
const nameInput = document.querySelector(".popup__input_type_name");
const descripcionInput = document.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

//funciones reutilizables 
function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}



editButton.addEventListener("click", function () {
  handleOpenEditModal()
});


closePopup.addEventListener("click", function () {
  closeModal(editPopup);
});


//Obtengo los datos de nombre que muestra en pagina de nombre y description 
function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descripcionInput.value = profileDescription.textContent;
}


function handleOpenEditModal()
{

fillProfileForm();   // llena los inputs
  openModal(editPopup); // abre el popup
}

// iniciamos editar perfil 

// Vamos a buscar el formulario en el DOM
let formElement = document.querySelector("form.popup__form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  // ubico los inputs del form 
  let nameInput = document.querySelector(".popup__input_type_name");
  let jobInput = document.querySelector(".popup__input_type_description");

  // obtengo datos
  let nameValue = nameInput.value;
  let jobValue = jobInput.value;

  // selecciono donde voy a mostrar los datos
  let profileTitle = document.querySelector(".profile__title");
  let profileDescription = document.querySelector(".profile__description");

  // Inserta nuevos valores utilizando la propiedad textContent

  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;

  closeModal(editPopup);
   
}

// conectar la función al formulario
formElement.addEventListener("submit", handleProfileFormSubmit);

