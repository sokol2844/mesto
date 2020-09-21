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
}

function closePopup(popup) {
	popup.classList.remove('popup_opened');
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

function handleLikeClick(evt) {
	let target = evt.target;
	let attribute = target.getAttribute('src');
	let color = attribute==='./images/like.svg'? './images/like_active.svg':'./images/like.svg';
	target.setAttribute('src', color);
}

function deleteCard(evt) {
	let target = evt.target;
	let listItem = target.closest('.elements__card');
	listItem.remove();
}

function createCard(item) {
	let template = document.querySelector('#template-list-item').content;
	const element = template.cloneNode(true);
	element.querySelector('.elements__title').textContent = item.name;
	element.querySelector('.elements__foto').src = item.link;
	element.querySelector('.elements__delete-button').addEventListener('click', deleteCard);
	element.querySelector('.elements__like-button').addEventListener('click', handleLikeClick);
	element.querySelector('.elements__foto').addEventListener('click', () => openPopupImage(item.name, item.link));
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
	item = {
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

//buttonDelete.addEventListener('click', deleteCard);
/*document.querySelector('.elements__cards').addEventListener('click', (evt) => {
	console.log(evt.target);
});*/
