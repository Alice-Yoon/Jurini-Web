import React from 'react';
import styled from 'styled-components';

import { moneyFormatter } from '../../../../utils/moneyFormatter';


function DetailsTable(props) {

    const {companyInfo, average, years} = props;

    return (
        <div className={props.className}>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <p>시가총액</p>
                            <p>$ {moneyFormatter(parseInt(companyInfo?.MarketCapitalization))}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>배당락일</p>
                            <p>{companyInfo?.ExDividendDate}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>최근 1년 평균배당금</p>
                            <p className="color">$ {average}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>배당 지속 기간</p>
                            <p>{years}년</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default styled(DetailsTable)`
    margin-left: 10px;
    margin-top: 10px;
    flex: 1;
    
    & {
        table {
            border-collapse: collapse;
            width: 100%;
        }
        td {
            border-bottom: 0.5px solid lightgray;
            padding: 5px 10px;
            >p {
                margin: 0;
                margin: 7px 0;
                
                &:first-of-type {
                    font-weight: 500;
                }
                &.color {
                    color: #035BAC;
                }
            }
        }
    }
`;
