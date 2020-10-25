import Card from './Card.js'
import FormValidator from './FormValidator.js'
import {allSelectorClasses, initialCards} from './constants.js'
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
const cardList = document.querySelector('.elements__cards');
const buttonResetPopupImage = document.querySelector('.image-popup__button-reset');
const buttonSubmitFormCardAdd = formCardAdd.querySelector(allSelectorClasses.submitButtonSelector);
const validatorFormAddCard = new FormValidator(allSelectorClasses, formCardAdd);
const validatorFromProfileEdit = new FormValidator(allSelectorClasses, popupProfileEdit);
validatorFromProfileEdit.enableValidation();
validatorFormAddCard.enableValidation();

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

function createCard(item) {
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
	buttonSubmitFormCardAdd.classList.add(allSelectorClasses.inactiveButtonClass);
	buttonSubmitFormCardAdd.setAttribute('disabled','');
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
		closePopup(evt.target);
	}
}

function handleEscPress(evt) {
	if (evt.keyCode === 27) {
		const popup = document.querySelector('.popup_opened');
		closePopup(popup);
	}
}

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