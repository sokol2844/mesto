export default class FormValidator{
    constructor(allSelectorClasses, form){
        this._allSelectorClasses = allSelectorClasses;
        this._form = form;
    }
    _hasInvalidInput(inputList) {
        //console.log('hasInvalidInput');
      return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
    }
    
    _toggleButtonState (inputList, buttonElement, allClasses) {
        //console.log('toggleButtonState');
      if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(allClasses.inactiveButtonClass);
      buttonElement.setAttribute('disabled','');
    } else {
      buttonElement.classList.remove(allClasses.inactiveButtonClass);
      buttonElement.removeAttribute('disabled','');
    }
    }
    
    _showInputError (formElement, inputElement, errorMessage, allClasses) {
        //console.log('showInputError');
      const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.add(allClasses.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(allClasses.errorClass);
    };
    
    _hideInputError (formElement, inputElement, allClasses) {
        //console.log('hideInputError');
      const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.remove(allClasses.inputErrorClass);
      errorElement.classList.remove(allClasses.errorClass);
      errorElement.textContent = '';
    };
    
    _checkInputValidity (formElement, inputElement, allClasses) {
        //console.log('checkInputValidity');
      if (!inputElement.validity.valid) {
        this._showInputError(formElement, inputElement, inputElement.validationMessage, allClasses);
      } else {
        this._hideInputError(formElement, inputElement, allClasses);
      }
    };
    
    _setEventListeners (formElement, allClasses) {
        //console.log('setEventListeners');
      const inputList = Array.from(formElement.querySelectorAll(allClasses.inputSelector));
      const buttonElement = formElement.querySelector(allClasses.submitButtonSelector);
    
      // чтобы проверить состояние кнопки в самом начале
      this._toggleButtonState(inputList, buttonElement, allClasses);
    
      inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._checkInputValidity(formElement, inputElement, allClasses);
          // чтобы проверять его при изменении любого из полей
          this._toggleButtonState(inputList, buttonElement, allClasses);
        });
      });
    };
    
    enableValidation () {
          this._setEventListeners(this._form, this._allSelectorClasses); 
    }
}