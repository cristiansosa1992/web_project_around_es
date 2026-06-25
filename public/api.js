export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }
    // Método auxiliar privado para no repetir código de validación
    async _checkResponse(res) {
        if (!res.ok) {
            return Promise.reject(`Error: ${res.status}`);
        }
        const text = await res.text();
        return text ? JSON.parse(text) : {};
    }
    async getUser() {
        const res = await fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        });
        return this._checkResponse(res);
    }
    async getInitialCards() {
        const res = await fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
        });
        return this._checkResponse(res);
    }
    async editUser(data) {
        const res = await fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
            method: "PATCH",
            body: JSON.stringify(data),
        });
        return this._checkResponse(res);
    }
    async addCard(data) {
        const res = await fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            }),
        });
        return this._checkResponse(res);
    }
    async deleteCard(cardId) {
        const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        });
        await this._checkResponse(res);
    }
    //https://around-api.es.tripleten-services.com/v1/cards/:cardId/likes
    async addLike(cardId) {
        const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this._headers,
        });
        return this._checkResponse(res);
    }
    async removeLike(cardId) {
        const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this._headers,
        });
        return this._checkResponse(res);
    }
}
