export default class Card {
    constructor(text, image, templateid, openPopupImg) {
        this._text = text;
        this._image = image;
        this._templateid = templateid;
        this._openPopupImg = openPopupImg;
    }

    _getTemplate() {
        const cardElement = document.querySelector(`#${this._templateid}`).content.cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.elements__title').textContent = this._text;
        this._element.querySelector('.elements__foto').src = this._image;
        this._setEventListeners();
        return this._element;
    }

    _handleLikeClick(evt) {
        const target = evt.target;
        const attribute = target.getAttribute('src');
        const color = attribute==='./images/like.svg'? './images/like_active.svg':'./images/like.svg';
        target.setAttribute('src', color);
    }


    _handleDelete(evt) {
        const target = evt.target;
        const listItem = target.closest('.elements__card');
        listItem.remove();
    }

    _setEventListeners() {
        this._element.querySelector('.elements__like-button').addEventListener('click', this._handleLikeClick);
        this._element.querySelector('.elements__delete-button').addEventListener('click', this._handleDelete);
        this._element.querySelector('.elements__foto').addEventListener('click', ()=>{this._openPopupImg(this._text,this._image)});
    }
    
}