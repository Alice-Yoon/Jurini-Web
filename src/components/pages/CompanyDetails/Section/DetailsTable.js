import React from 'react';
import styled from 'styled-components';


function DetailsTable(props) {

    const {companyInfo} = props;


    return (
        <div className={props.className}>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <p>시가총액</p>
                            <p>{companyInfo.MarketCapitalization}</p>
                            {/* <p>$ 123,37 million</p> */}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>배당락일</p>
                            <p>{companyInfo.ExDividendDate}</p>
                            {/* <p>20.05.29</p> */}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>평균 배당률</p>
                            <p className="color">4 %</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>배당 지속 기간</p>
                            <p>13년</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default styled(DetailsTable)`
    /* border: 1px solid green; */
    margin-left: 10px;
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
                    font-weight: bold;
                }
                &.color {
                    color: #035BAC;
                    font-weight: 500;
                }
            }
        }
    }
`;
