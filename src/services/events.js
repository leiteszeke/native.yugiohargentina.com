// Utils
import { basicClient } from './utils';

export const all = params =>
  basicClient.get('events', { ...params, public: true });

export default { all };
