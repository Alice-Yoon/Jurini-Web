import {API_BASE_URL} from './url';
import Axios from 'axios';
import moment from 'moment';

import { dateToMilli } from '../utils/dateMilliConverter';

const API = {
    cards: async (selectedDateMilli) => {
        try {

            // 해당 month 전체 data 구하기
            const getMonthlyData = await Axios.get(
                    `${API_BASE_URL}/getMontlyDividendsData?from_year=2020&from_month=9&to_year=2020&to_month=9&sort_mode=dividends_date`
                );
            const monthlyData = getMonthlyData.data.data

            // 해당 month 전체 key 값만 모으기
            const keys = Object.keys(monthlyData);
            const keyArr = keys.filter(key => {
                const formatted = moment(monthlyData[key].dividends_date).format("MM/DD/YYYY");
                const dividendsMilli = dateToMilli(formatted)
                return dividendsMilli === selectedDateMilli
            });

            const res = {
                monthlyData,
                keyArr
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
            // 회사정보 - 회사이름, 심볼, 배당률, 시가총액, 배당락일
            const getCompanyInfo = await Axios.get(
                `${API_BASE_URL}/getCompanySummaryInfo?symbol=${detailSymbol}`
            );

            // 전일종가
            const getClosePrice = await Axios.get(
                `${API_BASE_URL}/getLatestClosePrice?symbol=${detailSymbol}`
            );

            // 배당귀족, 고배당주 티커?

            const res = {
                companyInfo: getCompanyInfo.data.data,
                closePrice: getClosePrice.data.data
            }
            return res;
        } catch (error) {
            console.error(error);
        }
    }

}

export default API;