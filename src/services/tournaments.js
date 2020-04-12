// Utils
import {basicClient} from './utils';

export const all = params => basicClient.get(`tournaments`, params);

export const get = tournamentId =>
  basicClient.get(`tournaments/${tournamentId}`);

export const report = (tournamentId, data) =>
  basicClient.put(`tournaments/${tournamentId}/matches`, data);

export default {all, get, report};
