export default class Api {
    constructor(options) {
        this._options = options;
    }

    getUserInfo() {
        return fetch(this._options.baseUrl + '/users/me', {
            method: 'GET',
            headers: this._options.headers
        })
        .then((res) => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
        });
        
    }

    getInitialCards() {
        return fetch(this._options.baseUrl + '/cards', {
            method: 'GET',
            headers: this._options.headers
        })
        .then((res) => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
        });
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
        .then((res) => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
        });
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
        .then((res) => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    deleteCard(id) {
        return fetch(this._options.baseUrl + '/cards/' + id, {
            method: 'DELETE',
            headers: this._options.headers
        })
        .then((res) => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    putLike(cardID) {
        return fetch(this._options.baseUrl + '/cards/likes/' + cardID, {
            method: 'PUT',
            headers: this._options.headers
        })
        .then((res) => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    deleteLike(cardID) {
        return fetch(this._options.baseUrl + '/cards/likes/' + cardID, {
            method: 'DELETE',
            headers: this._options.headers
        })
        .then((res) => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    setUserAvatar(avatar) {
        return fetch(this._options.baseUrl + '/users/me/avatar', {
            method: 'PATCH',
            headers: this._options.headers,
            body: JSON.stringify({
                avatar: avatar
            })
        })
        .then((res) => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
        });
    }
}