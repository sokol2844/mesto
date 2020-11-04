import '../pages/index.css'
import Card from './Card.js'
import FormValidator from './FormValidator.js'
import Section from './Section.js'
import PopupWidthImage from './PopupWidthImage.js'
import PopupWidthForm from './PopupWidthForm.js'
import UserInfo from './UserInfo.js'
import {allSelectorClasses, initialCards, userInfoSelectors} from './constants.js'
const formCardAdd = document.querySelector('[name="card-add-form"]');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const inputName = document.querySelector('[name="name"]');
const inputDescription = document.querySelector('[name="about"]');

const cardSection = new Section({
	data: initialCards,
	renderer: (item) => {
		let card = new Card(
			item.name, 
			item.link, 
			'template-list-item', 
			(name, img) => {
				popupImage.open(img, name);
			});
		let cardElement = card.generateCard();
		cardSection.setItem(cardElement);
	},
  	},
  	'.elements__cards'
);

cardSection.renderItems();

const popupImage = new PopupWidthImage('.image-popup');
popupImage.setEventListeners();

const popupCardAdd = new PopupWidthForm('.card-add-popup', handleSubmitFormCardAdd);
popupCardAdd.setEventListeners();

const profileInfo = new UserInfo(userInfoSelectors);

const popupProfileEdit = new PopupWidthForm('.profile-edit-popup',handleSubmitFormProfileEdit);
popupProfileEdit.setEventListeners();

const validatorFormAddCard = new FormValidator(allSelectorClasses, formCardAdd);
const validatorFromProfileEdit = new FormValidator(allSelectorClasses, popupProfileEdit._popup);
validatorFromProfileEdit.enableValidation();
validatorFormAddCard.enableValidation();


function handleSubmitFormProfileEdit(input) {
	profileInfo.setUserInfo(input.name, input.about);
	this.close();
	
}

function createCard(item) {
	let element = new Card(
		item.name, 
		item.link, 
		'template-list-item', 
		(name, img) => {
			popupImage.open(img, name);
		});
	element = element.generateCard();
	return element;
}

function handleSubmitFormCardAdd(input) {
	const item = {
		name: input.title,
		link: input.link
	}
	cardSection.setItem(createCard(item));
	this.close();
}

buttonEdit.addEventListener('click', () => {
	popupProfileEdit.open();
	const inputs = profileInfo.getUserInfo();
	inputName.value = inputs.name;
	inputDescription.value = inputs.info;
});

buttonAdd.addEventListener('click', popupCardAdd.open.bind(popupCardAdd));