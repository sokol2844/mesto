let popup = document.querySelector('.popup');
let form = document.querySelector('.popup__container');
let buttonReset = document.querySelector('.popup__button-reset');
let buttonEdit = document.querySelector('.profile__edit-button');




function formToggle() {
	popup.classList.toggle('popup_opened');
}

function formOpen() {
	let labelName = document.querySelector('.profile__title');
	let labelDescription = document.querySelector('.profile__subtitle');
	let inputName = document.querySelector('.popup__input_name');
	let inputDescription = document.querySelector('.popup__input_about');
	inputName.value = labelName.textContent;
	inputDescription.value = labelDescription.textContent;
	formToggle();
	//popup.classList.add('popup_opened');
}

function formSubmit(evt) {
	evt.preventDefault();
	let labelName = document.querySelector('.profile__title');
	let labelDescription = document.querySelector('.profile__subtitle');
	let inputName = document.querySelector('.popup__input_name');
	let inputDescription = document.querySelector('.popup__input_about');
	labelName.textContent = inputName.value;
	labelDescription.textContent = inputDescription.value;
	formToggle();
	//popup.classList.remove('popup_opened');
}

form.addEventListener('reset', formToggle);
form.addEventListener('submit', formSubmit);
buttonEdit.addEventListener('click', formOpen);