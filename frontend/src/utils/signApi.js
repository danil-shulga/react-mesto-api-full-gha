class SignApi {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  };

  _request({ url, options }) {
    return fetch(url, options).then(this._checkResponse);
  }

  signup({ email, password }) {
    return this._request({
      url: `${this.baseUrl}/signup`,
      options: {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      },
    });
  }

  signin({ email, password }) {
    return this._request({
      url: `${this.baseUrl}/signin`,
      options: {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({
          password: password,
          email: email,
        }),
      },
    });
  }

  checkToken(JWT) {
    return this._request({
      url: `${this.baseUrl}/users/me`,
      options: {
        method: "GET",
        headers: { ...this.headers, Authorization: `Bearer ${JWT}` },
      },
    });
  }
}

const signApi = new SignApi({
  baseUrl: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});

export default signApi;
