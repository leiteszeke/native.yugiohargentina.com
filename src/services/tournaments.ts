// Utils
import { basicClient } from './utils';
import { MyObject } from '#types';

export const all = (params?: MyObject) =>
  basicClient.get('tournaments', params);

export const get = (tournamentId: number) =>
  basicClient.get(`tournaments/${tournamentId}`);

export const report = (tournamentId: number, data: MyObject) =>
  basicClient.put(`tournaments/${tournamentId}/matches`, data);

export default { all, get, report };
