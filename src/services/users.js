// Utils
import { client, url, handleSuccess, handleError } from './utils';

export const login = (email, password) =>
  client.post(`${url}users/login`, { email, password }, { public: true })
    .then(handleSuccess)
    .catch(handleError);

export const register = (name, lastname, email, password) =>
  client.post(`${url}users/register`, { name, lastname, email, password }, { public: true })
    .then(handleSuccess)
    .catch(handleError);

export const me = () =>
  client.get(`${url}users/me`)
    .then(handleSuccess)
    .catch(handleError);

export const update = (id, data) =>
  client.put(`${url}users/${id}`, data)
    .then(handleSuccess)
    .catch(handleError);

export const updateDevice = (id, data) => {
  console.log(`${url}users/${id}/device`, data)

  return client.put(`${url}users/${id}/device`, data)
    .then(handleSuccess)
    .catch(handleError);
}