import {UserData} from "./components/UserInfo.js";
import {CardData} from "./components/Card.js"

interface ApiOptions{
  baseUrl:string;
  headers:HeadersInit;
}

export class Api {
  private _baseUrl: string;
  private _headers: HeadersInit;

  constructor(options: ApiOptions ) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // Método auxiliar privado para no repetir código de validación
  private async _checkResponse(res: Response) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }

    const text = await res.text();
    return text ? JSON.parse(text) : {};
  }

async getUser(): Promise<UserData> {
  const res = await fetch(`${this._baseUrl}/users/me`, {
    headers: this._headers,
  });

  return this._checkResponse(res);
}

async getInitialCards(): Promise<CardData[]> {
  const res = await fetch(`${this._baseUrl}/cards`, {
    headers: this._headers,
  });

  return this._checkResponse(res);
}

async editUser(data: UserData): Promise<UserData> {
  const res = await fetch(`${this._baseUrl}/users/me`, {
    headers: this._headers,
    method: "PATCH",
    body: JSON.stringify(data),
  });

  return this._checkResponse(res);
}

async addCard(data: CardData): Promise<CardData> {
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

async deleteCard(cardId: string): Promise<void> {
  const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: this._headers,
  });

  await this._checkResponse(res);
}
//https://around-api.es.tripleten-services.com/v1/cards/:cardId/likes

async addLike  (cardId: string): Promise <CardData>{
const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
    method: "PUT",
    headers: this._headers,
  });
  return this._checkResponse(res)

}

async removeLike  (cardId: string): Promise <CardData>{
const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
    method: "DELETE",
    headers: this._headers,
  });
  return this._checkResponse(res)

}

}
