// Utils
import { getSession, removeSession } from '#helpers/session';
// Configs
import { API_URL, IS_DEBUG } from 'react-native-dotenv';
// Services
import { navigate } from '#services/navigation';

export const url = API_URL;

const getToken = async () => {
  const user = await getSession();
  return user?.token || null;
};

const objectToQueryString = obj =>
  Object.keys(obj)
    .map(key => `${key}=${obj[key]}`)
    .join('&');

const request = async (initialUrl, params, method = 'GET', config = {}) => {
  const randomNumber = Math.floor(Math.random() * 100);
  let url = `${API_URL}${initialUrl}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (!config.public) {
    const token = await getToken();
    options.headers.Authorization = `Bearer ${token}`;
  }

  if (params) {
    if (method === 'GET') {
      url += `?${objectToQueryString(params)}`;
    } else {
      options.body = JSON.stringify(params);
    }
  }

  let response = {};
  const debug = !!IS_DEBUG;

  if (debug) {
    console.debug(`Debugging Request ${randomNumber}`, url, options);
  }

  try {
    response = await fetch(url, options);
    const errorStatus = [400, 401, 404, 500];

    if (errorStatus.includes(response.status)) {
      const errorResponse = await response.json();

      if (response.status === 401 && !config.public) {
        removeSession();
        navigate('Auth');
      }

      throw new Error(JSON.stringify(errorResponse));
    }

    const result = await response.json();
    if (debug) {
      console.debug(`Debugging Response ${randomNumber}`, result);
    }
    return Promise.resolve(result);
  } catch (e) {
    if (debug) {
      try {
        console.debug(
          `Debugging Response Error ${randomNumber}`,
          JSON.parse(e.message),
        );
        return Promise.reject(JSON.parse(e.message));
      } catch (err) {
        console.debug(`Debugging Response Error ${randomNumber}`, e);
        return Promise.reject(e);
      }
    }
  }
};

const get = (url, params, options) => request(url, params, 'GET', options);
const post = (url, params, options) => request(url, params, 'POST', options);
const put = (url, params, options) => request(url, params, 'PUT', options);
const _delete = (url, params, options) =>
  request(url, params, 'DELETE', options);

export const client = {
  get,
  post,
  put,
  delete: _delete,
};

export const handleSuccess = res => {
  if (res.error) {
    throw res;
  }
  return res;
};

export const handleError = err => {
  throw err;
};

export const basicClient = {
  get: (...args) =>
    get(...args)
      .then(handleSuccess)
      .catch(handleError),
  post: (...args) =>
    post(...args)
      .then(handleSuccess)
      .catch(handleError),
  put: (...args) =>
    put(...args)
      .then(handleSuccess)
      .catch(handleError),
  delete: (...args) =>
    _delete(...args)
      .then(handleSuccess)
      .catch(handleError),
};
