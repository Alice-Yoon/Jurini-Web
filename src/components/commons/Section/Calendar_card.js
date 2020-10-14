import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function CalendarCard(props) {

<<<<<<< HEAD
    const {symbol, selectedKeysArr_dividend} = props;
=======
    const {symbol, selectedKeysArr_dividend, selectedKeysArr_payment} = props;
>>>>>>> 92bd4fc0bb8004364abcd359e7da7e786577ba66

    const [background, setBackground] = useState('');
    const [textColor, setTextColor] = useState('');

    useEffect(() => {
<<<<<<< HEAD
        if (selectedKeysArr_dividend.includes(symbol)) {
            setBackground('#EAFFE3')
            setTextColor('#218439')
        } else {
=======
        if (selectedKeysArr_dividend?.includes(symbol)) {
            setBackground('#EAFFE3')
            setTextColor('#218439')
        } else if(selectedKeysArr_payment?.includes(symbol)) {
>>>>>>> 92bd4fc0bb8004364abcd359e7da7e786577ba66
            setBackground('#FFECDA')
            setTextColor('#FF7373')
        }
    }, [])



    return (
        <div className={props.className} style={{backgroundColor: background, color: textColor}}>
            <span className="co_symbol">{symbol}</span>
        </div>
    )
}

export default styled(CalendarCard)`
    display: flex;
    align-items: center;
    margin-bottom: 2px;
    padding-left: 10px;
    font-weight: 500;
    font-size: 15px;
<<<<<<< HEAD

    & {
        .co_symbol {
        }
    }
=======
>>>>>>> 92bd4fc0bb8004364abcd359e7da7e786577ba66
`;
