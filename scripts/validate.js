
// mostrar error
export function showError(input, formElement) {
  const error = formElement.querySelector(`#${input.id}-error`);
  error.textContent = input.validationMessage;
  error.classList.add("error-visible");
  error.classList.remove("error-hidden");
}

// ocultar error
export function hideError(input, formElement) {
  const error = formElement.querySelector(`#${input.id}-error`);
  error.textContent = "";
  error.classList.remove("error-visible");
  error.classList.add("error-hidden");
}

// activar/desactivar botón
export function toggleButtonState(formElement, submitButton) {
  submitButton.disabled = !formElement.checkValidity();
}

// función principal del sprint
export function setEventListeners(formElement, inputs, submitButton) {
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (input.validity.valid) {
        hideError(input, formElement);
      } else {
        showError(input, formElement);
      }

      toggleButtonState(formElement, submitButton);
    });
  });
}