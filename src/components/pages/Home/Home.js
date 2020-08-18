import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Axios from 'axios';

import Calendar from './Section/Calendar';
import CardList from '../../commons/CardList';

import { cardDummyData } from '../../../assets/dummy/cardDummyData';
import DropDown from './Section/DropDown';

function Home(props) {

    const {toggleCompanyDetails} = props;

    // const [dummyData, setDummyData] = useState(null);

    // useEffect(() => {
    //     const test = async() => {
    //       const date = new Date();
    //       const year = date.getFullYear();
    //       const month = date.getMonth() + 1;
    //       const res = await Axios.get(`http://15.164.248.209:20000/rest/getMontlyDividendsData?from_year=${year}&from_month=${month}&to_year=${year}&to_month=${month}`);
    //       const data = res.data.data;

    //       setDummyData(data.ACNB);
    //       console.log(data.ACNB);
    //       console.log("year :", year, "month :", month);
    
    //     }
    //     test();
    //   }, []);

    return (
        <div className={props.className}>
           <div className="section_left">
                <Calendar />
           </div>
           <div className="section_right">
               <DropDown />
               <div className="card-list">
                {cardDummyData && cardDummyData.map((data, index) => (
                    <CardList key={index} data={data} toggleCompanyDetails={toggleCompanyDetails} />
                ))}
                {/* {dummyData && <CardList data={dummyData} toggleCompanyDetails={toggleCompanyDetails} />} */}
                
               </div>
           </div>
        </div>
    )
}

export default styled(Home)`
    /* border: 2px solid aqua; */
    width: 100%;
    height: 100%;

    display: flex;

    & {
        .section_left {
            /* border: 1px solid blue; */
            flex: 1;
        }
        .section_right {
            /* border: 1px solid green; */
            flex: 1;
            .card-list {
                /* border: 1px solid yellow; */
                margin-top: 10px;
                width: 100%;
                height: 92%;
                overflow: auto;
                flex: 1;
            }
        }
    }

    @media (max-width: 500px) {
        flex-direction: column;
        .section_right {
            overflow: auto;
        }
    }
`;