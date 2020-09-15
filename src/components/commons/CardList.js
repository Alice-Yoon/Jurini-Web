import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { toggleDetails } from '../../modules/details';
// import Axios from 'axios';

function CardList(props) {

    // isDividendDate ? '배당지급일' : '배당락일 D-3'
    const [isDividendDate, setIsDividendDate] = useState(true);
    const [data, setData] = useState([]);

    // console.log("cardlist - data:", data)
    // console.log("cardlist - 배당지급일?:", isDividendDate)

    useEffect(() => {
        setIsDividendDate(props.data.isDividendDate);
        setData(props.data)
    }, []);

    const dispatch = useDispatch();
    const openDetails = (payload) => dispatch(toggleDetails(payload));

    const onClickCard = () => {
        openDetails(true);
    }

    return (
        <div onClick={onClickCard} className={props.className} style={{ borderLeft: `2.5px solid ${isDividendDate ? 'green' : 'orange'}`}}>
            <div className="leftSectionStyle">
                    <span className="smallBoxStyle">
                        {isDividendDate ? '배당지급일' : '배당락일 D-3'}
                    </span>
                    <p className="companyNameStyle">{data.name}</p>
                </div>
                <div className="rightSectionStyle">
                    <div className="rightSection_Top">
                        <span>배당률 {data.dividends_rate}%</span>
                        <span>예상 배당금</span>
                    </div>
                    <div className="rightSection_Bottom">
                        <p className="expected_dividend">$ {data.dividends}</p>
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