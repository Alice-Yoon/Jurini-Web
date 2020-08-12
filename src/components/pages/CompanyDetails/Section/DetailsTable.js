import React from 'react';
import styled from 'styled-components';

function DetailsTable(props) {
    return (
        <div className={props.className}>
            <table>
                <tbody>
                    <tr>
                        <td>시가총액</td>
                        <td>$ 123,37 million</td>
                    </tr>
                    <tr>
                        <td>배당락일</td>
                        <td>20.05.29</td>
                    </tr>
                    <tr>
                        <td>평균 배당률</td>
                        <td>4 %</td>
                    </tr>
                    <tr>
                        <td>배당 지속 기간</td>
                        <td>13년</td>
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
            border-bottom: 1px solid gray;
            padding: 5px 10px;
        }
    }
`;
