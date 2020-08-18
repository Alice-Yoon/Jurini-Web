import React from 'react';
import styled from 'styled-components';

import Calendar from './Section/Calendar';
import CardList from '../../commons/CardList';

import { cardDummyData } from '../../../assets/dummy/cardDummyData';
import DropDown from './Section/DropDown';

function Home(props) {

    return (
        <div className={props.className}>
           <div className="section_left">
                <Calendar />
           </div>
           <div className="section_right">
               <DropDown />
               <div className="card-list">
                {cardDummyData && cardDummyData.map((data, index) => (
                    <CardList key={index} data={data} />
                ))}
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