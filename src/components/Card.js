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

    _handleLikeClick() {
        this._handleLikeClickCallback(this._isLiked);
    }

    putLike() {
        this._like.classList.add('elements__like-button_liked');
        this._isLiked = true;

    }

    deleteLike() {
        this._like.classList.remove('elements__like-button_liked'); 
        this._isLiked = false;
    }

    setLikeNr( likeNr) {
        this._nrOfLikes = likeNr;
        this._element.querySelector('.elements__like-nr').textContent = likeNr;
    }

    _setEventListeners() {
        this._element.querySelector('.elements__like-button').addEventListener('click', this._handleLikeClick);
        this._element.querySelector('.elements__delete-button').addEventListener('click', this._handleDelete);
        this._element.querySelector('.elements__foto').addEventListener('click', ()=>{this._handleCardClick(this._text,this._image)});
    }

    _getTemplate() {
        const cardElement = document.querySelector(`#${this._templateid}`).content.querySelector('.elements__card').cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.elements__title').textContent = this._text;
        this._element.querySelector('.elements__foto').src = this._image;
        this._element.querySelector('.elements__like-nr').textContent = this._nrOfLikes;
        this._like = this._element.querySelector('.elements__like-button');
        if(this._isLiked) {
            this.putLike();
        }
        if(!this._isOwning) {
            this._element.querySelector('.elements__delete-button').style.display = "none";;
        }
        this._setEventListeners();
        return this._element;
    }

    deleteCard() {
        this._element.remove();
    }
}