import Card from './Card.js'
import FormValidator from './FormValidator.js'
const popupProfileEdit = document.querySelector('.profile-edit-popup');
const popupCardAdd = document.querySelector('.card-add-popup');
const popupImage = document.querySelector('.image-popup');
const titlePopupImage = document.querySelector('.image-popup__title');
const imagePopupImage = document.querySelector('.image-popup__image');
const formProfileEdit = document.querySelector('[name="profile-edit-form"]');
const formCardAdd = document.querySelector('[name="card-add-form"]');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const labelName = document.querySelector('.profile__title');
const labelDescription = document.querySelector('.profile__subtitle');
const inputName = document.querySelector('[name="input-name"]');
const inputDescription = document.querySelector('[name="input-about"]');
const inputTitle = document.querySelector('[name="input-title"]');
const inputLink = document.querySelector('[name="input-link"]');
const buttonDelete = document.querySelector('.elements__delete-button');
const cardList = document.querySelector('.elements__cards');
const buttonResetPopupImage = document.querySelector('.image-popup__button-reset');
const template = document.querySelector('#template-list-item').content;

const allSelectorClasses = {
	formSelector: '.popup__container',
  	inputSelector: '.popup__input',
  	submitButtonSelector: '.popup__button-save',
  	inactiveButtonClass: 'popup__button-save_disabled',
  	inputErrorClass: 'popup__input_error',
  	errorClass: 'popup__error_visible'
}

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function openPopup(popup) {
	popup.classList.add('popup_opened');
	document.addEventListener('keydown', handleEscPress);
}

function closePopup(popup) {
	popup.classList.remove('popup_opened');
	document.removeEventListener('keydown', handleEscPress);
}

function openFormProfileEdit() {
	inputName.value = labelName.textContent;
	inputDescription.value = labelDescription.textContent;
	openPopup(popupProfileEdit);
}

function handleSubmitFormProfileEdit(evt) {
	evt.preventDefault();
	labelName.textContent = inputName.value;
	labelDescription.textContent = inputDescription.value;
	closePopup(popupProfileEdit);
}

/*function handleLikeClick(evt) {
	const target = evt.target;
	const attribute = target.getAttribute('src');
	const color = attribute==='./images/like.svg'? './images/like_active.svg':'./images/like.svg';
	target.setAttribute('src', color);
}

function deleteCard(evt) {
	const target = evt.target;
	const listItem = target.closest('.elements__card');
	listItem.remove();
}*/

function createCard(item) {
	/*const element = template.cloneNode(true);
	element.querySelector('.elements__title').textContent = item.name;
	element.querySelector('.elements__foto').src = item.link;
	element.querySelector('.elements__delete-button').addEventListener('click', deleteCard);
	element.querySelector('.elements__like-button').addEventListener('click', handleLikeClick);
	element.querySelector('.elements__foto').addEventListener('click', () => openPopupImage(item.name, item.link));*/
	let element = new Card(item.name, item.link, 'template-list-item', openPopupImage);
	element = element.generateCard();
	return element;
}

function addCard(container, cardElement){
	container.prepend(cardElement);
}

function openFormCardAdd() {
	inputTitle.value = '';
	inputLink.value = '';
	openPopup(popupCardAdd);
}

function handleSubmitFormCardAdd(evt) {
	evt.preventDefault();
	const item = {
		name: inputTitle.value,
		link: inputLink.value
	}
	addCard(cardList,createCard(item));
	closePopup(popupCardAdd);
}

function openPopupImage(name, img) {
	titlePopupImage.textContent  = name;
	imagePopupImage.src = img;
	openPopup(popupImage);
}

function handleOverlayClick(evt) {
	if (evt.target.classList.contains('popup')){
		//console.log(evt.target);
		closePopup(evt.target);
	}
}

function handleEscPress(evt) {
	if (evt.keyCode === 27) {
		//const popup = evt.target.closest('.popup');
		//if (popup===null) {
		const popup = document.querySelector('.popup_opened');
		//}
		//console.log(evt.target);
		closePopup(popup);
	}
}

function validateAllForms() {
	const formList = Array.from(document.querySelectorAll(allSelectorClasses.formSelector));
	formList.forEach((formElement) => {
		let validator = new FormValidator(allSelectorClasses, formElement);
		validator.enableValidation();
	});
}

validateAllForms();

initialCards.forEach((item) => {
	addCard(cardList,createCard(item));
})

buttonEdit.addEventListener('click', openFormProfileEdit);
formProfileEdit.addEventListener('submit', handleSubmitFormProfileEdit);
formProfileEdit.addEventListener('reset', () => closePopup(popupProfileEdit));


buttonAdd.addEventListener('click', openFormCardAdd);
formCardAdd.addEventListener('reset', () => closePopup(popupCardAdd));
formCardAdd.addEventListener('submit', handleSubmitFormCardAdd);

buttonResetPopupImage.addEventListener('click', () => closePopup(popupImage));

popupProfileEdit.addEventListener('click', handleOverlayClick);
popupCardAdd.addEventListener('click', handleOverlayClick);
popupImage.addEventListener('click', handleOverlayClick);

/*popupProfileEdit.addEventListener('keydown', handleEscPress);
popupCardAdd.addEventListener('keydown', handleEscPress);
//popupImage.addEventListener('keydown', handleEscPress);

//buttonDelete.addEventListener('click', deleteCard);
/*document.querySelector('.elements__cards').addEventListener('click', (evt) => {
	console.log(evt.target);
});*/
