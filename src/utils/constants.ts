//DUDAS AQUI 
export interface DefaultFormConfig {
  inputSelector: string;
  submitButtonSelector: string;
  inactiveButtonClass: string;
  inputErrorClass: string;
  errorMessageClass: string;
}

export const defaultFormConfig: DefaultFormConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: '.popup__button_disabled',
  inputErrorClass: '.popup__input_type_error',
  errorMessageClass: '.popup__error_visible'
}

// interface para crear las tarjetas 

export interface CardData{
  name: string;
  link: string;
}
// TODO: esto es un ejemplo 
// export const editProfileSelector = '#edit-profile-popup';