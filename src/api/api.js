import {API_BASE_URL} from './url';
import Axios from 'axios';
import moment from 'moment';

import { dateToMilli } from '../utils/dateMilliConverter';

const API = {
    cards: async (selectedDateMilli, year, month) => {
        try {
<<<<<<< HEAD

=======
>>>>>>> 92bd4fc0bb8004364abcd359e7da7e786577ba66
            const getAllData = await Axios.get(
                `${API_BASE_URL}/getMontlyDividendsData?from_year=${year}&from_month=${month}&to_year=${year}&to_month=${month}&sort_mode=all`
            );
            const allData = getAllData.data.data;

            const allKeys = Object.keys(allData);
            const allKeys_dividends = allKeys.filter(key => {
                const dividendsDate = moment(allData[key].dividends_date).format("MM/DD/YYYY");
                const dividendsMilli = dateToMilli(dividendsDate);
                return dividendsMilli === selectedDateMilli
            })

            const allKeys_payment = allKeys.filter(key => {
                const formatted_paymentDate = moment(allData[key].payment_date).format("MM/DD/YYYY");
                const paymentMilli = dateToMilli(formatted_paymentDate);
                return paymentMilli === selectedDateMilli
            })

            const allKeysArr = allKeys_dividends.concat(allKeys_payment);

            const res = {
                allData,
                allKeysArr
            }
            
            return res;
        } catch (error) {
            console.error(error);
        }
    },
    exchange: async () => {
        try {
            const res = await Axios.get(
                `${API_BASE_URL}/getKRWExchangeRate`
            );
            return res;
        } catch (error) {
            console.error(error);
        }
    },
    search: async (searchTerm) => {
        try {
            const res1 = await Axios.get(
                `${API_BASE_URL}/getRecommendKeyword?keyword=${searchTerm}`
                );
               
                const firstRes = res1.data.data
                const keys = firstRes.map(data => data["1. symbol"]);
                const keysArr = keys.toString();
                
            const res2 = await Axios.get(
                `${API_BASE_URL}/getMultipleDividendsInfo?symbol_list=${keysArr}`
            )

            const res = {
                final_keys: Object.keys(res2.data.data),
                data: res2.data.data
            }
            return res;
        } catch (error) {
            console.error(error);
        }
    },
    details: async (detailSymbol) => {
        try {
            const getCompanyInfo = await Axios.get(
                `${API_BASE_URL}/getCompanySummaryInfo?symbol=${detailSymbol}`
            );

            const getClosePrice = await Axios.get(
                `${API_BASE_URL}/getLatestClosePrice?symbol=${detailSymbol}`
            );

            const getAverage = await Axios.get(
                `${API_BASE_URL}/getDividendHistory?ticker=${detailSymbol}&start_year=1980&end_year=2020`
            );
            const values = Object.values(getAverage?.data.data);
            const reducer = (acc, curr) => acc + curr;
            const average = (values?.reduce(reducer)/values.length).toFixed(2);
            
            const keys = Object.keys(getAverage?.data.data);
            keys.sort((a,b) => a - b);
            const firstYear = parseInt(keys[0]);
            const lastYear = parseInt(keys[keys.length-1]);
            const duration = moment.duration(lastYear-firstYear, 'milliseconds');
            const years = Math.floor(duration.asYears());

            const getDividendKing = await Axios.get(
                `${API_BASE_URL}/getDividendKingTickerList`
            );
            const getDividendAristocrats = await Axios.get(
                `${API_BASE_URL}/getDividendAristocratsList`
            );

            const companySymbol = getCompanyInfo?.data.data.Symbol;
            const dividendKingList = getDividendKing?.data.data;
            const dividendAristovratsList = getDividendAristocrats?.data.data;

            let dividendTicker;
            
            if (dividendKingList.includes(companySymbol)) {
                dividendTicker = "배당킹"
            } else if (dividendAristovratsList.includes(companySymbol)) {
                dividendTicker = "배당귀족"
            } else {
                dividendTicker = ''
            }

            const res = {
                companyInfo: getCompanyInfo?.data.data,
                closePrice: getClosePrice?.data.data,
                average: average,
                years: years,
                dividendTicker: dividendTicker,
            }
            return res;
        } catch (error) {
            console.error(error);
        }
    },
    calendar_list: async(year, month) => {
        try {
            const getMonthlyData = await Axios.get(
                `${API_BASE_URL}/getMontlyDividendsData?from_year=${year}&from_month=${month}&to_year=${year}&to_month=${month}&sort_mode=all`
            );
            const monthlyData = getMonthlyData.data.data;
            const keys = Object.keys(monthlyData);
            
            const res = {
                data: monthlyData,
                keys
            }
            return res;
        } catch (error) {
            console.error(error);
        }
    }

}

export default API;