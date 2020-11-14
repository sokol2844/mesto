import '../pages/index.css'
import Card from './Card.js'
import FormValidator from './FormValidator.js'
import Section from './Section.js'
import PopupWidthImage from './PopupWidthImage.js'
import PopupWidthForm from './PopupWidthForm.js'
import PopupDeleteCard from './PopupDeleteCard.js'
import UserInfo from './UserInfo.js'
import Api from './Api.js'
import {allSelectorClasses, initialCards, userInfoSelectors} from './constants.js'
/*import { info } from 'autoprefixer'
import { pop } from 'core-js/fn/array'*/
const formCardAdd = document.querySelector('[name="card-add-form"]');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const inputName = document.querySelector('[name="name"]');
const inputDescription = document.querySelector('[name="about"]');
const avatar = document.querySelector('.profile__avatar');
let myId = '';

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
//api.setUserInfo('Jakif','what u wana see');
//api.addNewCard('Всем привет)','https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg')
  api.getInitialCards().then((res) => {
	  let cardSection1 = new Section({
		data: res,
		renderer: (item) => {
			cardSection1.setItem(createCard(item));
		},
		  },
		  '.elements__cards'
	);
	
	cardSection1.renderItems();
	  
	  
  });
const cardSection = new Section({
	data: initialCards,
	renderer: (item) => {
		cardSection.setItem(createCard(item));
	},
	  },
	  '.elements__cards'
);

//cardSection.renderItems();


const popupImage = new PopupWidthImage('.image-popup');
popupImage.setEventListeners();

const popupCardAdd = new PopupWidthForm('.card-add-popup', handleSubmitFormCardAdd);
popupCardAdd.setEventListeners();

const popupDeleteCard = new PopupDeleteCard('.card-delete-popup', (card) => {
	api.deleteCard(card._id).then((res) => {
		popupDeleteCard.close();
		window.location.reload();
	});
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
		window.location.reload();
	})
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
		this.close();
		window.location.reload();
	});
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
					window.location.reload();
				});
				//console.log('Try to delete');
			} 
			else {
				api.putLike(item._id).then((res) => {
					window.location.reload();
				});
				//console.log('Try to put');
			}
		},
		item.likes.length,
		item.likes.some((like) => {
			return like._id == myId;
		}),
		item.owner._id == myId );
	const element = card.generateCard();
	//console.log(myId);
	return element;
}

function handleSubmitFormCardAdd(input) {
	/*const item = {
		name: input.title,
		link: input.link
	}*/
	//cardSection.setItem(createCard(item));
	popupCardAdd.saveButton.textContent = 'Сохранение...';
	api.addNewCard(input.title, input.link).then((res) => {
		this.close();
		window.location.reload();
	});
	
}

buttonEdit.addEventListener('click', () => {
	popupProfileEdit.open();
	const inputs = profileInfo.getUserInfo();
	inputName.value = inputs.name;
	inputDescription.value = inputs.info;
});

buttonAdd.addEventListener('click', popupCardAdd.open.bind(popupCardAdd));
avatar.addEventListener('click', popupAvatar.open.bind(popupAvatar));

//<img src="./images/like.svg" alt="like">