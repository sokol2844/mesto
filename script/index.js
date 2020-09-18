let popupProfileEdit = document.querySelector('.profile-edit-popup');
let popupCardAdd = document.querySelector('.card-add-popup');
let popupImage = document.querySelector('.image-popup');
let titlePopupImage = document.querySelector('.image-popup__title');
let imagePopupImage = document.querySelector('.image-popup__image');
let formProfileEdit = document.querySelector('[name="profile-edit-form"]');
let formCardAdd = document.querySelector('[name="card-add-form"]');
let buttonEdit = document.querySelector('.profile__edit-button');
let buttonAdd = document.querySelector('.profile__add-button');
let labelName = document.querySelector('.profile__title');
let labelDescription = document.querySelector('.profile__subtitle');
let inputName = document.querySelector('[name="input-name"]');
let inputDescription = document.querySelector('[name="input-about"]');
let inputTitle = document.querySelector('[name="input-title"]');
let inputLink = document.querySelector('[name="input-link"]');
let buttonDelete = document.querySelector('.elements__delete-button');
let cardList = document.querySelector('.elements__cards');
let buttonResetPopupImage = document.querySelector('.image-popup__button-reset');

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

function popupOpen(popup) {
	popup.classList.add('popup_opened');
}

function popupClose(popup) {
	popup.classList.remove('popup_opened');
}

function formProfileEditOpen() {
	inputName.value = labelName.textContent;
	inputDescription.value = labelDescription.textContent;
	popupOpen(popupProfileEdit);
}

function formProfileEditSubmit(evt) {
	evt.preventDefault();
	labelName.textContent = inputName.value;
	labelDescription.textContent = inputDescription.value;
	popupClose(popupProfileEdit);
}

function like(evt) {
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

function addCard(name, img) {
	let template = document.querySelector('#template-list-item').content;
	let element = template.cloneNode(true);
	element.querySelector('.elements__title').textContent = name;
	element.querySelector('.elements__foto').src = img;
	element.querySelector('.elements__delete-button').addEventListener('click', deleteCard);
	element.querySelector('.elements__like-button').addEventListener('click', like);
	element.querySelector('.elements__foto').addEventListener('click', () => popupImageOpen(name, img));
	cardList.append(element);
}

function formCardAddOpen() {
	inputTitle.value = '';
	inputLink.value = '';
	popupOpen(popupCardAdd);
}

function formCardAddSubmit(evt) {
	evt.preventDefault();
	addCard(inputTitle.value,inputLink.value);
	popupClose(popupCardAdd);
}

function popupImageOpen(name, img) {
	titlePopupImage.textContent  = name;
	imagePopupImage.src = img;
	popupOpen(popupImage);
}

initialCards.forEach((item) => {
	addCard(item.name,item.link);
})

buttonEdit.addEventListener('click', formProfileEditOpen);
formProfileEdit.addEventListener('submit', formProfileEditSubmit);
formProfileEdit.addEventListener('reset', () => popupClose(popupProfileEdit));


buttonAdd.addEventListener('click', formCardAddOpen);
formCardAdd.addEventListener('reset', () => popupClose(popupCardAdd));
formCardAdd.addEventListener('submit', formCardAddSubmit);

buttonResetPopupImage.addEventListener('click', () => popupClose(popupImage));

//buttonDelete.addEventListener('click', deleteCard);
/*document.querySelector('.elements__cards').addEventListener('click', (evt) => {
	console.log(evt.target);
});*/
