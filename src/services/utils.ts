// Utils
import { getSession, removeSession } from '#helpers/session';
// Configs
import { API_URL, IS_DEBUG } from 'react-native-dotenv';
// Services
import { navigate } from '#services/navigation';
import { MyObject, RequestConfig, RequestOptions, RequestMethod } from '#types';

export const url = API_URL;

const getToken = async () => {
  const user = await getSession();
  return user?.token || null;
};

const objectToQueryString = (obj: MyObject) =>
  Object.keys(obj)
    .map(key => `${key}=${obj[key]}`)
    .join('&');

const request = async (initialUrl: string, params?: MyObject, method: RequestMethod = 'GET', config: RequestConfig = {}) => {
  const randomNumber = Math.floor(Math.random() * 100);
  let url = `${API_URL}${initialUrl}`;
  const options: RequestOptions = {
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

  let response: Response;
  const debug = !!IS_DEBUG;

  if (debug) {
    console.debug(`Debugging Request ${randomNumber}`, url, options);
  }

  try {
    response = await fetch(url, options);
    const errorStatus: Array<number> = [400, 401, 404, 500];

    if (errorStatus.indexOf(response.status) >= 0) {
      const errorResponse = await response.json();

      if (response.status === 401 && !config.public) {
        removeSession();
        navigate('Auth');
      }

      throw new Error(errorResponse);
    }

    const result = await response.json();

    if (debug) console.debug(`Debugging Response ${randomNumber}`, result);
    return Promise.resolve(result);
  } catch (e) {
    if (debug) console.debug(`Debugging Response Error ${randomNumber}`, e)
    throw new Error(e);
  }
};

const get = (url: string, params?: MyObject, options?: RequestConfig) => request(url, params, 'GET', options);
const post = (url: string, params?: MyObject, options?: RequestConfig) => request(url, params, 'POST', options);
const put = (url: string, params?: MyObject, options?: RequestConfig) => request(url, params, 'PUT', options);
const _delete = (url: string, params?: MyObject, options?: RequestConfig) =>
  request(url, params, 'DELETE', options);

export const client = {
  get,
  post,
  put,
  delete: _delete,
};

export const handleSuccess = (res: MyObject) => {
  if (res.error) return handleError(new Error(JSON.stringify(res)))

  return res;
};

export const handleError = (err: Error) => {
  if (err.message.includes('Network request failed')) {
    return {
      error: true,
      data: [],
      message: 'request_failed'
    }
  }

  return {
    error: true,
    data: [],
    message: err.message,
  }
};

export const basicClient = {
  get: (url: string, params?: MyObject, options?: RequestConfig) =>
    get(url, params, options)
      .then(handleSuccess)
      .catch(handleError),
  post: (url: string, params?: MyObject, options?: RequestConfig) =>
    post(url, params, options)
      .then(handleSuccess)
      .catch(handleError),
  put: (url: string, params?: MyObject, options?: RequestConfig) =>
    put(url, params, options)
      .then(handleSuccess)
      .catch(handleError),
  delete: (url: string, params?: MyObject, options?: RequestConfig) =>
    _delete(url, params, options)
      .then(handleSuccess)
      .catch(handleError),
};
