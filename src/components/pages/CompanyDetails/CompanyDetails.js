import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function CompanyDetails(props) {
    const { showCompanyDetails, toggleCompanyDetails } = props;


    const onClickToClose = (e) => {
        const id = e.target.id;

        if(id === "closeBtn" || id === "container") {
            // console.log("click to close!", e.target.id);
            toggleCompanyDetails();
        }
    }


    return (
        <div className={props.className} id="container" style={{display: `${showCompanyDetails ? 'flex' : 'none' }`}} onClick={onClickToClose}>
            <div className="modalStyle">                    
                {/* <div className="closeBtnAreaStyle"> */}
                    <span id="closeBtn" onClick={onClickToClose} className="closeBtnStyle">X</span>
                {/* </div> */}
                <div className="contentStyle">
                    Comapany Details 
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
            border: 1px solid green;
            border-radius: 10px;
            width: 65%;
            height: 65%;
            background-color: #fff;
            position: relative
        }
        .closeBtnStyle {
            cursor: pointer;
            border: 1px solid red;
            text-align: end;
            padding-right: 10px;
            position: absolute;
            top: 8px;
            right: 5px;
        }
        .contentStyle {
            border: 1px solid blue;
            margin: 30px 15px 0 15px;
            height: 90%;
            overflow: auto;
        }
        /* .closeBtnAreaStyle {
            border: 1px solid blue;
            height: 20px;
            position: relative;
            > .closeBtnStyle {
                cursor: pointer;
                border: 1px solid red;
                text-align: end;
                padding-right: 10px;
                position: absolute;
                top: 8px;
                right: 5px;
            }
        } */
    }
`;