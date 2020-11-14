import Popup from './Popup.js'
export default class PopupDeleteCard extends Popup{
    constructor(popupSelector, handleDeleteCard) {
        super(popupSelector);
        this._deleteCard = handleDeleteCard;
        this._form = this._popup.querySelector('.popup__container');
        this.saveButton = this._popup.querySelector('.popup__button-save');
    }

    open(card) {
        super.open();
        this._card = card;
    }

    _handleSubmit(evt) {
        evt.preventDefault();
        this._deleteCard(this._card);
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit',this._handleSubmit.bind(this));
    }
}