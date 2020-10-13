import React from 'react';
import styled from 'styled-components';

function DetailsCard(props) {

    const {companyInfo, closePrice, average, dividendTicker} = props;

    console.log("companyInfo", companyInfo)

    return (
        <div className={props.className}>
            <div className="company_name">
                <h1>{companyInfo?.Name}</h1>
                <span>| {companyInfo.Symbol}</span>
            </div>
            <div className="top">
                <span style={{display: dividendTicker === '배당킹' || dividendTicker === '배당귀족' ? 'inline' : 'none'}}>
                    {dividendTicker}
                </span>
                <span style={{background: '#FFE6E6', color: '#CC3E01', display: average >= 5 ? 'inline' : 'none'}}>고배당주</span>
            </div>
            <div className="bottom">
                <div>
                    <span>전일종가</span>
                    <span className="number pink">$ {parseInt(closePrice?.close_price).toFixed(2)}</span>
                </div>
                <div>
                    <span>배당률</span>
                    <span className="number">{(companyInfo?.DividendYield * 100).toFixed(2)} %</span>
                </div>
            </div>
        </div>
    )
}

export default styled(DetailsCard)`
    /* border: 2px solid black; */
    background: linear-gradient(137.04deg, #F7F4FF -1.55%, #FFFEF5 102.16%);
    box-shadow: 0px 4px 4px rgba(255, 230, 0, 0.14), 0px 2px 20px rgba(230, 210, 255, 0.65);
    border-radius: 30px;
    padding: 15px 20px;
    flex: 1;
    font-family: Noto Sans KR;

    & {
        .company_name {
            /* border: 1px solid green; */
            display: flex;
            align-items: center;
            /* justify-content: center; */

            > h1 {
                font-weight: 400;
                font-size: 32px;
                margin: 0;
                padding: 0;

                white-space: nowrap;
                overflow: hidden;
                max-width: 80%;
                text-overflow: ellipsis;
            }
        }
        .top {
            /* border: 1px solid red; */

            text-align: start;
            padding: 10px 0;
            padding-right: 15px;
            margin-bottom: 10px;
            > span {
                background-color: #F2E1FF;
                border-radius: 13px;
                margin-right: 5px;
                padding: 5px 10px;
                font-size: 12px;
                color: #AA41FC;
            }
        }
        .bottom {
            /* border: 1px solid blue; */

            display: flex;

            > div {
                /* border: 1px solid green; */

                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                font-size: 12px;
                > .number {
                    font-size: 28px;
                    font-weight: bold;
                    &.pink {
                        color: #FF607C;
                        /* color: linear-gradient(135deg, #FF9A7A 4.17%, #FF607C 125%); */
                    }
                }
            }
        }
    }
`;
