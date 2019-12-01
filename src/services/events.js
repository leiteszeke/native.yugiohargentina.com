// Utils
import { client, url } from './utils';

export const all = () =>
	client.get(`${url}events`)
		.then(res => res.data)
		.catch(err => err.response.data);