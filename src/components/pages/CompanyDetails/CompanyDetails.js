import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DetailsCard from './Section/DetailsCard';
import DetailsTable from './Section/DetailsTable';
import DetailsChart from './Section/DetailsChart';
import DetailsCalculator from './Section/DetailsCalculator';
import DetailsNews from './Section/DetailsNews';

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
                <span id="closeBtn" onClick={onClickToClose} className="closeBtnStyle">X</span>
                <div className="contentStyle">
                    <h1>Nike Inc (NKE)</h1>
                    <div className="content_top">
                        <DetailsCard />
                        <DetailsTable />
                    </div>
                    <div className="content_bottom">
                        <DetailsCalculator />
                        <DetailsChart />
                        <DetailsNews />
                    </div>
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
            /* border: 1px solid green; */
            border-radius: 10px;
            width: 65%;
            height: 65%;
            background-color: #fff;
            position: relative
        }
        .closeBtnStyle {
            cursor: pointer;
            /* border: 1px solid red; */
            text-align: end;
            padding-right: 10px;
            position: absolute;
            top: 8px;
            right: 5px;
        }
        .contentStyle {
            /* border: 1px solid blue; */

            margin: 30px 15px 0 15px;
            height: 90%;
            overflow: auto;

            > h1 {
                position: sticky;
                top: 0;
                left: 0;
                width: 100%;
                background-color: #fff;
                text-align: center;
                margin-bottom: 50px;
            }
            .content_top {
                display: flex;
                align-items: center;
                margin-bottom: 35px;
            }
            .content_bottom {
                /* border: 1px solid red; */
                /* display: flex; */
            }
        }
        
    }
`;