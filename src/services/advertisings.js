// Utils
import {basicClient} from './utils';

export const all = () => basicClient.get('advertisings');

export default {all};
