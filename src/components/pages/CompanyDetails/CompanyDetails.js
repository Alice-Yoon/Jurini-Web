import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toggleDetails } from '../../../modules/details';

import DetailsCard from './Section/DetailsCard';
import DetailsTable from './Section/DetailsTable';
import DetailsChart from './Section/DetailsChart';
import DetailsCalculator from './Section/DetailsCalculator';
import DetailsNews from './Section/DetailsNews';

function CompanyDetails(props) {
    const showCompanyDetails = useSelector(state => state.details.isDetailShow);
    const dispatch = useDispatch();
    const closeDetails = (payload) => dispatch(toggleDetails(payload));


    const onClickToClose = (e) => {
        const id = e.target.id;
        if(id === "closeBtn" || id === "container") {
            closeDetails(false);
        }
    }


    return (
        <div className={props.className} id="container" style={{display: `${showCompanyDetails ? 'flex' : 'none' }`}} onClick={onClickToClose}>
            <div className="modalStyle">                    
                <span id="closeBtn" onClick={onClickToClose} className="closeBtnStyle">X</span>
                <div className="content_top">
                    <DetailsCard />
                </div>
                <div className="contentStyle">
                        <DetailsTable />
                        {/* <DetailsCalculator /> */}
                        {/* <DetailsChart /> */}
                        {/* <DetailsNews /> */}
                </div>
            </div>
        </div>
    )
}

export default styled(CompanyDetails)`
    z-index: 100;
    backdrop-filter: blur(15px);
    background-color: rgba(0,0,0,0.7);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    & {
        .modalStyle {
            /* border: 1px solid red; */
            border-radius: 42px;
            width: 55%;
            max-width: 400px;
            height: 65%;
            background-color: #fff;
            position: relative;
        
            .closeBtnStyle {
                /* border: 1px solid red; */
                cursor: pointer;
                padding-right: 10px;
                position: absolute;
                top: -20px;
                right: 45px;
                z-index: 999;
                color: gray;
                font-size: 13px;
                font-weight: 500;
            }
            .content_top {
                    /* border:  1px solid red; */
                    width: 80%;
                    position: relative;
                    top: -35px;
                    left: 50%;
                    transform: translateX(-50%);
                }
            .contentStyle {
                /* border: 1px solid blue; */

                width: 80%;
                height: 72%;
                overflow: auto;

                position: absolute;
                top: 158px;
                left: 50%;
                transform: translateX(-50%);
            }
        }
    }
`;