// Dependencies
import numeral from 'numeral';

export const format = number => numeral(number).format('$ 0,00');