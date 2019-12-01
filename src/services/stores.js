// Utils
import { client, url } from './utils';

export const all = () =>
	client.get(`${url}stores`)
		.then(res => res.data)
		.catch(err => err.response.data);