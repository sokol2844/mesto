import Popup from './Popup.js'

export default class PopupWidthForm extends Popup{
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__container');
        this._inputList = this._popup.querySelectorAll('.popup__input');
    }

    close() {
        this._inputList.forEach(input => input.value = '');
        super.close();
    }

    open() {
        this._inputList.forEach(input => input.value = '');
        super.open();
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        
        return this._formValues;
    }

    _handleSubmit(evt){
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
    }

    setEventListeners() {
          super.setEventListeners();
          this._form.addEventListener('submit',this._handleSubmit.bind(this));
    }
}