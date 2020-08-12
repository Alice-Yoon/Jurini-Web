import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Axios from 'axios';

function CardList(props) {

    const { toggleCompanyDetails } = props;

    // isDividendDate ? '배당지급일' : '배당락일 D-3'
    const [isDividendDate, setIsDividendDate] = useState(true);

    useEffect(() => {
        setIsDividendDate(props.data.isDividendDate);

        // const test = async() => {
        //     const data = await Axios.get('http://15.164.248.209:20000/rest/getCompanySummaryInfo?symbol=KO');
        //     console.log("data", data);
        // }

        // test();
    }, []);

    const onClickCard = () => {
        console.log("Card List clicked!");
        toggleCompanyDetails();
    }

    return (
        <div onClick={onClickCard} className={props.className} style={{ borderLeft: `2.5px solid ${isDividendDate ? 'green' : 'orange'}`}}>
            <div className="leftSectionStyle">
                    <span className="smallBoxStyle">
                        {isDividendDate ? '배당지급일' : '배당락일 D-3'}
                    </span>
                    <p className="companyNameStyle">Nike Inc</p>
                </div>
                <div className="rightSectionStyle">
                    <div className="rightSection_Top">
                        <span>배당률 5.2%</span>
                        <span>예상 배당금</span>
                    </div>
                    <div className="rightSection_Bottom">
                        <p className="expected_dividend">$ 2.7</p>
                    </div>
                </div>
        </div>
    )
}

export default styled(CardList)`

    border: 1.3px solid lightgray;
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
    background-color: #fff;
    padding: 10px 25px;
    display: flex;
    margin: 20px;

    & {
        .leftSectionStyle {
            /* border: 1px solid red; */
            flex: 1;
            .smallBoxStyle {
                border: 1px solid gray;
                padding: 3px 5px;
                font-size: 0.8rem;
                color: gray;
            }
            .companyNameStyle {
                font-size: 1.6rem;
                font-weight: bold;
                margin: 0;
                margin-top: 3px;
            }
        }
        .rightSectionStyle {
            /* border: 1px solid blue; */
            flex: 1;
            .rightSection_Top {
                padding-right: 20px;
                font-size: 0.8rem;
                > span {
                    margin-right: 10px;
                }
            }
            .rightSection_Bottom {
                > p {
                    font-size: 2.5rem;
                    font-weight: bold;
                    margin: 0;
                }
            }
        }
    }

`;