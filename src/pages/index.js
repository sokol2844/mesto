import './index.css'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWidthImage from '../components/PopupWidthImage.js'
import PopupWidthForm from '../components/PopupWidthForm.js'
import PopupDeleteCard from '../components/PopupDeleteCard.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'
import {allSelectorClasses, initialCards, userInfoSelectors} from '../components/constants.js'
/*import { info } from 'autoprefixer'
import { pop } from 'core-js/fn/array'*/
const formCardAdd = document.querySelector('[name="card-add-form"]');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const inputName = document.querySelector('[name="name"]');
const inputDescription = document.querySelector('[name="about"]');
const avatar = document.querySelector('.profile__avatar');
let myId = '';

function catchErr(err) {
	console.log(err);
}

const cardSection = new Section({
	data: initialCards,
	renderer: (item) => {
		cardSection.setItem(createCard(item));
	},
	  },
	  '.elements__cards'
);

const api = new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-17',
	headers: {
	  authorization: '17b42fc2-6510-49e5-b2a1-e12ff934639a',
	  'Content-Type': 'application/json'
	}
  }); 
  api.getUserInfo().then((res) => {
	  profileInfo.setUserInfo(res.name, res.about);
	  profileInfo.setAvatar(res.avatar);
	  myId = res._id;
  })
  .catch(catchErr);
  api.getInitialCards().then((res) => {
		res = res.reverse();
		res.forEach(item => cardSection.setItem(createCard(item)));
  })
  .catch(catchErr);


const popupImage = new PopupWidthImage('.image-popup');
popupImage.setEventListeners();

const popupCardAdd = new PopupWidthForm('.card-add-popup', handleSubmitFormCardAdd);
popupCardAdd.setEventListeners();

const popupDeleteCard = new PopupDeleteCard('.card-delete-popup', (card) => {
	api.deleteCard(card._id).then((res) => {
		popupDeleteCard.close();
		card.deleteCard();
	})
	.catch(catchErr);
})

popupDeleteCard.setEventListeners();



const profileInfo = new UserInfo(userInfoSelectors);
/*api.getUserInfo().then((res) => {
	profileInfo.setUserInfo(res.name, res.about);
})*/

const popupProfileEdit = new PopupWidthForm('.profile-edit-popup',handleSubmitFormProfileEdit);
popupProfileEdit.setEventListeners();

const popupAvatar = new PopupWidthForm('.avatar-popup', (input) => {
	popupAvatar.saveButton.textContent = 'Сохранение...';
	api.setUserAvatar(input.avatar).then((res) => {
		//window.location.reload();
		profileInfo.setAvatar(res.avatar);
		popupAvatar.close();
		popupAvatar.saveButton.textContent = 'Сохранить';
	})
	.catch(catchErr);
});

popupAvatar.setEventListeners();

const validatorFormAddCard = new FormValidator(allSelectorClasses, formCardAdd);
const validatorFromProfileEdit = new FormValidator(allSelectorClasses, popupProfileEdit._popup);
const validatorFormAvatar = new FormValidator(allSelectorClasses, popupAvatar._popup);
validatorFromProfileEdit.enableValidation();
validatorFormAddCard.enableValidation();
validatorFormAvatar.enableValidation();


function handleSubmitFormProfileEdit(input) {
	//profileInfo.setUserInfo(input.name, input.about);
	popupProfileEdit.saveButton.textContent = 'Сохранение...';
	api.setUserInfo(input.name, input.about).then((res) => {
		profileInfo.setUserInfo(input.name, input.about);
		this.close();
		popupProfileEdit.saveButton.textContent = 'Сохранить';
		//window.location.reload();
	})
	.catch(catchErr);
}

function createCard(item) {
	const card = new Card(
		item.name, 
		item.link, 
		'template-list-item', 
		item._id,
		(name, img) => {
			popupImage.open(img, name);
		},
		() => {
			popupDeleteCard.open(card);
		},
		(isLiked) => {
			if(isLiked) {
				api.deleteLike(item._id).then((res) => {
					card.deleteLike();
					card.setLikeNr(res.likes.length);
				})
				.catch(catchErr);
			} 
			else {
				api.putLike(item._id).then((res) => {
					card.putLike();
					card.setLikeNr(res.likes.length);
				})
				.catch(catchErr);
			}
		},
		item.likes.length,
		item.likes.some((like) => {
			return like._id == myId;
		}),
		item.owner._id == myId );
	const element = card.generateCard();
	return element;
}

function handleSubmitFormCardAdd(input) {
	popupCardAdd.saveButton.textContent = 'Сохранение...';
	api.addNewCard(input.title, input.link).then((res) => {
		this.close();
		cardSection.setItem(createCard(res));
		popupCardAdd.saveButton.textContent = 'Сохранить';
	})
	.catch(catchErr);
	
}

buttonEdit.addEventListener('click', () => {
	popupProfileEdit.open();
	const inputs = profileInfo.getUserInfo();
	inputName.value = inputs.name;
	inputDescription.value = inputs.info;
});

buttonAdd.addEventListener('click', popupCardAdd.open.bind(popupCardAdd));
avatar.addEventListener('click', popupAvatar.open.bind(popupAvatar));