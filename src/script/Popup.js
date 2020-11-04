export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._escCode = 27;
        this._reset = this._popup.querySelector('.popup__button-reset');
    }

    open() {
        this._popup.classList.add('popup_opened');
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.keyCode === this._escCode) {
            this.close(this._popup);
        }
    }

    _handleOverlayClick(evt) {
        if (evt.target.classList.contains('popup')){
            this.close();
        }
    }
    
    setEventListeners() {
        this._reset.addEventListener('click', this.close.bind(this));
        document.addEventListener('keydown', this._handleEscClose.bind(this));
        this._popup.addEventListener('click', this._handleOverlayClick.bind(this));
    }
}