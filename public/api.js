export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }
    // Método auxiliar privado para no repetir código de validación
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
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
}
