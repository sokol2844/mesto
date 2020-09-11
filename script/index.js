let popup = document.querySelector('.popup');
let form = document.querySelector('.popup__container');
let buttonReset = document.querySelector('.popup__button-reset');
let buttonEdit = document.querySelector('.profile__edit-button');
let labelName = document.querySelector('.profile__title');
let labelDescription = document.querySelector('.profile__subtitle');
let inputName = document.querySelector('.popup__input_name');
let inputDescription = document.querySelector('.popup__input_about');


function formOpen() {
	inputName.value = labelName.textContent;
	inputDescription.value = labelDescription.textContent;
	popup.classList.add('popup_opened');
}

function formSubmit(evt) {
	evt.preventDefault();
	labelName.textContent = inputName.value;
	labelDescription.textContent = inputDescription.value;
	popup.classList.remove('popup_opened');
}

form.addEventListener('reset', function(){
	popup.classList.remove('popup_opened');
});
form.addEventListener('submit', formSubmit);
buttonEdit.addEventListener('click', formOpen);