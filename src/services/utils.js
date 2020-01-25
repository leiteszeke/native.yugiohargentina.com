// Dependencies
import AsyncStorage from '@react-native-community/async-storage';

// export const url = 'http://172.16.66.159:8001/';
export const url = 'https://api.yugiohargentina.com/';

const getToken = async () => {
  const user = await AsyncStorage.getItem('ygoargentina');

  if (user !== null) {
    return JSON.parse(user).token;
  }

  return '';
}

const objectToQueryString = (obj) =>
  Object.keys(obj).map(key => key + '=' + obj[key]).join('&');

const request = async (url, params, method = 'GET', config = {}) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
  };

  if (!config.public) {
    const token = await getToken();
    options.headers.Authorization = `Bearer ${token}`;
  }

  if (params) {
    if (method === 'GET') {
      url += '?' + objectToQueryString(params);
    } else {
      options.body = JSON.stringify(params);
    }
  }

  let response = {};

  try {
    response = await fetch(url, options);
    const errorStatus = [400, 401, 404, 500];
    if (errorStatus.includes(response.status)) {
      return Promise.reject(response.json());
    }

    const result = await response.json();
    return result;
  } catch (e) {
    return Promise.reject({ data: {}, error: true, message: 'error' });
  }
};

const get = (url, params) => request(url, params);
const post = (url, params, options) => request(url, params, 'POST', options);
const put = (url, params) => request(url, params, 'PUT');
const _delete = (url, params) => request(url, params, 'DELETE');

export const client = {
  get,
  post,
  put,
  delete: _delete,
};

export const handleSuccess = res => res;

export const handleError = err => {
  if (err.response) {
    return err.response.data;
  }

  return err;
}
