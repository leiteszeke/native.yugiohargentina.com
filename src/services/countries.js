// Utils
import { client, url } from './utils';

export const all = () =>
	client.get(`${url}countries`)
		.then(res => res.data)
		.catch(err => err.response.data);