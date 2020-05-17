// Utils
import { basicClient } from './utils';
import { MyObject } from '#types';

export const login = (email: string, password: string) =>
  basicClient.post('users/login', { email, password }, { public: true });

export const register = (
  name: string,
  lastname: string,
  email: string,
  password: string,
) =>
  basicClient.post(
    'users/register',
    { name, lastname, email, password },
    { public: true },
  );

export const me = () => basicClient.get('users/me');

export const update = (id: number, data: MyObject) =>
  basicClient.put(`users/${id}`, data);

export const updateDevice = (id: number, data: MyObject) =>
  basicClient.put(`users/${id}/device`, data);

export const recover = (data: MyObject) =>
  basicClient.post('users/recover', data, { public: true });

export const validateCode = (code: string) =>
  basicClient.get(`users/recover/${code}`, {}, { public: true });

export const updatePassword = (data: MyObject) =>
  basicClient.put('users/password', data, { public: true });
