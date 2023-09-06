class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  };

  _request = ({ url, options }) => {
    return fetch(url, options).then(this._checkResponse);
  };

  getCards(JWT) {
    return this._request({
      url: `${this._baseUrl}/cards`,
      options: {
        headers: { ...this._headers, Authorization: `Bearer ${JWT}` },
      },
    });
  }

  createCard(cardData, JWT) {
    return this._request({
      url: `${this._baseUrl}/cards`,
      options: {
        method: 'POST',
        headers: { ...this._headers, Authorization: `Bearer ${JWT}` },
        body: JSON.stringify({
          name: cardData.cardTitle,
          link: cardData.imgUrl,
        }),
      },
    });
  }

  deleteCard(cardId, JWT) {
    return this._request({
      url: `${this._baseUrl}/cards/${cardId}`,
      options: {
        method: 'DELETE',
        headers: { ...this._headers, Authorization: `Bearer ${JWT}` },
      },
    });
  }

  getUserInfo(JWT) {
    return this._request({
      url: `${this._baseUrl}/users/me`,
      options: {
        headers: { ...this._headers, Authorization: `Bearer ${JWT}` },
      },
    });
  }

  patchUserInfo(userInfo, JWT) {
    return this._request({
      url: `${this._baseUrl}/users/me`,
      options: {
        method: 'PATCH',
        headers: { ...this._headers, Authorization: `Bearer ${JWT}` },
        body: JSON.stringify({
          name: userInfo.name,
          about: userInfo.about,
        }),
      },
    });
  }

  patchUserAvatar(avatar, JWT) {
    return this._request({
      url: `${this._baseUrl}/users/me/avatar`,
      options: {
        method: 'PATCH',
        headers: { ...this._headers, Authorization: `Bearer ${JWT}` },
        body: JSON.stringify({
          avatar: avatar,
        }),
      },
    });
  }

  _addCardLike(cardId, JWT) {
    return this._request({
      url: `${this._baseUrl}/cards/${cardId}/likes`,
      options: {
        method: 'PUT',
        headers: { ...this._headers, Authorization: `Bearer ${JWT}` },
      },
    });
  }

  _removeCardLike(cardId, JWT) {
    return this._request({
      url: `${this._baseUrl}/cards/${cardId}/likes`,
      options: {
        method: 'DELETE',
        headers: { ...this._headers, Authorization: `Bearer ${JWT}` },
      },
    });
  }

  changeLikeCardStatus(cardId, isLiked, JWT) {
    return isLiked
      ? this._removeCardLike(cardId, JWT)
      : this._addCardLike(cardId, JWT);
  }
}

const api = new Api({
  baseUrl: `http://api.danil-shulga-mesto.nomoredomainsicu.ru`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
