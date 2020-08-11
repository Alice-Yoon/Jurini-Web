import React from 'react';
import styled from 'styled-components';

function DetailsCard(props) {




    return (
        <div className={props.className}>
            <div className="top">
                <span>배당귀족</span>
                <span style={{background: '#E1F85D'}}>고배당주</span>
            </div>
            <div className="bottom">
                <div>
                    <span>전일종가</span>
                    <span className="number">$ 87.4</span>
                </div>
                <div>
                    <span>배당률</span>
                    <span className="number">5.2%</span>
                </div>
            </div>
        </div>
    )
}

export default styled(DetailsCard)`
    /* border: 2px solid black; */
    background-color: #EEEEEE;
    border-radius: 10px;
    padding: 5px 10px 20px 10px;
    /* margin-right: 10px; */
    flex: 1;

    & {
        .top {
            /* border: 1px solid red; */

            padding: 10px;
            text-align: start;
            padding-right: 15px;
            margin-bottom: 25px;
            > span {
                background-color: pink;
                border-radius: 13px;
                margin-left: 5px;
                padding: 5px 10px;
                font-size: 12px;
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
                align-items: center;
                font-size: 13px;
                > .number {
                    font-size: 23px;
                    font-weight: bold;
                    margin-top: 10px;
                }
            }
        }
    }
`;
