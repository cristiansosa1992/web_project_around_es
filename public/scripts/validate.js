const showInputError = (InputElement, errorMessage) => {
    const formElement = InputElement.form;
    const errorElement = formElement.querySelector(`.popup__input-${InputElement.id}-error`);
    InputElement.classList.add("popup__input-type-error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("popup__input-error_active");
};
const hideInputError = (InputElement) => {
    const formElement = InputElement.form;
    const errorElement = formElement.querySelector(`.popup__input-${InputElement.id}-error`);
    InputElement.classList.remove("popup__input-type-error");
    errorElement.classList.remove("popup__input-error_active");
    errorElement.textContent = "";
};
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};
const toggleButtonState = (inputList, buttonElement) => {
    buttonElement.disabled = hasInvalidInput(inputList);
};
export const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
    const submitButton = formElement.querySelector(".popup__button");
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            if (!inputElement.validity.valid) {
                showInputError(inputElement, inputElement.validationMessage);
            }
            else {
                hideInputError(inputElement);
            }
            toggleButtonState(inputList, submitButton);
        });
    });
};
