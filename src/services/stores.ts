// Utils
import { basicClient } from './utils';

export const all = () => basicClient.get('stores', { public: true });
