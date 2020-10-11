import {numberWithCommas} from './moneyFormatter';

export const exchangeToKRW = (usd, rate) => {

    const converted = Math.floor(usd?.toFixed(2) * rate);

    return numberWithCommas(converted);
}