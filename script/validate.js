const allSelectorClasses = {
	formSelector: '.popup__container',
  	inputSelector: '.popup__input',
  	submitButtonSelector: '.popup__button-save',
  	inactiveButtonClass: 'popup__button-save_disabled',
  	inputErrorClass: 'popup__input_error',
  	errorClass: 'popup__error_visible'
}

function hasInvalidInput(inputList) {
	//console.log('hasInvalidInput');
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
});
}

function toggleButtonState (inputList, buttonElement, allClasses) {
	//console.log('toggleButtonState');
  if (hasInvalidInput(inputList)) {
  buttonElement.classList.add(allClasses.inactiveButtonClass);
  buttonElement.setAttribute('disabled','');
} else {
  buttonElement.classList.remove(allClasses.inactiveButtonClass);
  buttonElement.removeAttribute('disabled','');
}
}

const showInputError = (formElement, inputElement, errorMessage, allClasses) => {
	//console.log('showInputError');
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(allClasses.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(allClasses.errorClass);
};

const hideInputError = (formElement, inputElement, allClasses) => {
	//console.log('hideInputError');
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(allClasses.inputErrorClass);
  errorElement.classList.remove(allClasses.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, allClasses) => {
	//console.log('checkInputValidity');
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, allClasses);
  } else {
    hideInputError(formElement, inputElement, allClasses);
  }
};

const setEventListeners = (formElement, allClasses) => {
	//console.log('setEventListeners');
  const inputList = Array.from(formElement.querySelectorAll(allClasses.inputSelector));
  const buttonElement = formElement.querySelector(allClasses.submitButtonSelector);

  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement, allClasses);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, allClasses);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement, allClasses);
    });
  });
};

const enableValidation = (allClasses) => {
	//console.log('enableValidation');
  const formList = Array.from(document.querySelectorAll(allClasses.formSelector));
  formList.forEach((formElement) => {
    /*formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });*/
    //const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));

    //fieldsetList.forEach((fieldSet) => {
      setEventListeners(formElement, allClasses);
    //});
  });
};
//console.log('script start');
enableValidation(allSelectorClasses);