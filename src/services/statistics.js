// Utils
import { basicClient } from './utils';

export const all = () => basicClient.get('statistics');

export default { all };
