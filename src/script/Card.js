export default class Card {
    constructor(text, image, templateid, cardid, handleCardClick, handleDelete, handleLikeClick, nrOfLikes, isLiked, isOwning) {
        this._text = text;
        this._image = image;
        this._templateid = templateid;
        this._handleCardClick = handleCardClick;
        this._handleDelete = handleDelete;
        this._id = cardid;
        this._nrOfLikes = nrOfLikes;
        this._isLiked = isLiked;
        this._isOwning = isOwning;
        this._handleLikeClickCallback = handleLikeClick;
        this._handleLikeClick = this._handleLikeClick.bind(this);
    }

    _getTemplate() {
        const cardElement = document.querySelector(`#${this._templateid}`).content.cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.elements__title').textContent = this._text;
        this._element.querySelector('.elements__foto').src = this._image;
        this._element.querySelector('.elements__like-nr').textContent = this._nrOfLikes;
        if(this._isLiked) {
            this._element.querySelector('.elements__like-button').classList.add('elements__like-button_liked');
        }
        if(!this._isOwning) {
            this._element.querySelector('.elements__delete-button').style.display = "none";;
        }
        this._setEventListeners();
        return this._element;
    }

    _handleLikeClick() {
        this._handleLikeClickCallback(this._isLiked);
    }


    /*_handleDelete(evt) {
        const target = evt.target;
        const listItem = target.closest('.elements__card');
        listItem.remove();
    }*/

    _setEventListeners() {
        this._element.querySelector('.elements__like-button').addEventListener('click', this._handleLikeClick);
        this._element.querySelector('.elements__delete-button').addEventListener('click', this._handleDelete);
        this._element.querySelector('.elements__foto').addEventListener('click', ()=>{this._handleCardClick(this._text,this._image)});
    }
    
}