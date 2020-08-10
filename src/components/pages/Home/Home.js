import React from 'react';
import styled from 'styled-components';

import Calendar from './Section/Calendar';
import CardList from '../../commons/CardList';

import { cardDummyData } from '../../../assets/dummy/cardDummyData';

function Home(props) {
    return (
        <div className={props.className}>
           <div className="section_left">
                <Calendar />
           </div>
           <div className="section_right">
               {cardDummyData && cardDummyData.map(data => (
                   <CardList data={data} />
               ))}
           </div>
        </div>
    )
}

export default styled(Home)`
    width: 100%;
    height: 100%;

    display: flex;

    & {
        .section_left {
            border: 1px solid blue;
            flex: 1;
        }
        .section_right {
            border: 1px solid green;
            flex: 1;
            overflow: auto;
        }
    }
`;