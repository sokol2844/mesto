export default class Api {
    constructor(options) {
        this._options = options;
    }

    _checkResponse(res) {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch(this._options.baseUrl + '/users/me', {
            method: 'GET',
            headers: this._options.headers
        })
        .then(this._checkResponse);
        
    }

    getInitialCards() {
        return fetch(this._options.baseUrl + '/cards', {
            method: 'GET',
            headers: this._options.headers
        })
        .then(this._checkResponse);
    }

    setUserInfo(name, about) {
        return fetch(this._options.baseUrl + '/users/me', {
            method: 'PATCH',
            headers: this._options.headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
        .then(this._checkResponse);
    }

    addNewCard(name, link) {
        return fetch(this._options.baseUrl + '/cards', {
            method: 'POST',
            headers: this._options.headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        .then(this._checkResponse);
    }

    deleteCard(id) {
        return fetch(this._options.baseUrl + '/cards/' + id, {
            method: 'DELETE',
            headers: this._options.headers
        })
        .then(this._checkResponse);
    }

    putLike(cardID) {
        return fetch(this._options.baseUrl + '/cards/likes/' + cardID, {
            method: 'PUT',
            headers: this._options.headers
        })
        .then(this._checkResponse);
    }

    deleteLike(cardID) {
        return fetch(this._options.baseUrl + '/cards/likes/' + cardID, {
            method: 'DELETE',
            headers: this._options.headers
        })
        .then(this._checkResponse);
    }

    setUserAvatar(avatar) {
        return fetch(this._options.baseUrl + '/users/me/avatar', {
            method: 'PATCH',
            headers: this._options.headers,
            body: JSON.stringify({
                avatar: avatar
            })
        })
        .then(this._checkResponse);
    }
}