import React, { useContext } from 'react';
import styled from 'styled-components';
import { useObserver } from 'mobx-react';

import Calendar from './Section/Calendar';
import CardList from '../../commons/CardList';

import { GlobalContext } from '../../context/GlobalState';

function Home(props) {

    const { data } = useContext(GlobalContext);


    return useObserver( () => (
        <div className={props.className}>
           <div className="section_left">
                <Calendar />
           </div>
           <div className="section_right">
               {data && data.map((data, index) => (
                   <CardList key={index} data={data} />
               ))}
           </div>
        </div>

    ))
};

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