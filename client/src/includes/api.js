import io from 'socket.io-client';

export const apiUrl = `${location.protocol}//${location.hostname}:${location.port}/api/v1`;

class Api {
  post(route, data) {
    return fetch(`${apiUrl}/${route}`, {
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      cache: 'no-cache',
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) throw Error(response);
        return response.json();
      });
  }

  get(route, data) {
    const url = new URL(`${apiUrl}/${route}`);
    url.search = new URLSearchParams(data);

    return fetch(url, {
      method: 'GET',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      cache: 'no-cache'
    })
      .then(response => {
        if (response.status != 200) throw Error(response.statusText);
        return response.json();
      });
  }

  createSocket(data, namespace) {
    let socket;
    if (namespace) {
      socket = io(namespace, {
        query: data
      });
    } else {
      socket = io({
        query: data
      });
    }

    return socket;
  }

  closeSocket(socket) {
    socket.disconnect();
  }
}

const api = new Api();

export default api;
