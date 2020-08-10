import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function CompanyDetails(props) {

    const [toggleSearch, setToggleSearch] = useState(false);

    const onClickToClose = () => {
        console.log("click to close!")
    }


    return (
        <div className={props.className} style={{display: `${toggleSearch ? 'flex' : 'none' }`}}>
            <div id="container" className="modalStyle" onClick={onClickToClose}>                    
                <div className="closeBtnAreaStyle">
                    <span id="closeBtn" onClick={onClickToClose} className="closeBtnStyle">X</span>
                </div>
            </div>
        </div>
    )
}

export default styled(CompanyDetails)`
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.7);
    align-items: center;
    justify-content: center;

    & {
        .modalStyle {
            border-radius: 10px;
            width: 65%;
            height: 65%;
            background-color: #fff;
        }
        .closeBtnAreaStyle {
            /* border: 1px solid blue; */
            height: 20px;
            position: relative;
            > .closeBtnStyle {
                cursor: pointer;
                /* border: 1px solid red; */
                text-align: end;
                padding-right: 10px;
                position: absolute;
                top: 8px;
                right: 5px;
            }
        }
    }
`;