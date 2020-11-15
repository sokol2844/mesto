import Popup from './Popup.js'

export default class PopupWidthImage extends Popup{
    constructor (popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector('.image-popup__image');
        this._title = this._popup.querySelector('.image-popup__title');
    }
    open(img, title) {
        this._image.src = img;
        this._title.textContent = title;
        super.open();
    }
}