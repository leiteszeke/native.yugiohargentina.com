// Utils
import { client, url } from './utils';

export const all = () =>
	client.get(`${url}states`)
		.then(res => res.data)
		.catch(err => err.response.data);