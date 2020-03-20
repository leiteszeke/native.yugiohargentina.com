// Utils
import {basicClient} from './utils';

export const login = (email, password) =>
  basicClient.post(`users/login`, {email, password}, {public: true});

export const register = (name, lastname, email, password) =>
  basicClient.post(
    `users/register`,
    {name, lastname, email, password},
    {public: true},
  );

export const me = () => basicClient.get(`users/me`);

export const update = (id, data) => basicClient.put(`users/${id}`, data);

export const updateDevice = (id, data) =>
  basicClient.put(`users/${id}/device`, data);
