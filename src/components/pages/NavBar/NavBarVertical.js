import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import home from '../../../assets/img/home.png';
import introduction from '../../../assets/img/introduction.png';



function NavBarVertical(props) {
    return (
        <div className={props.className}>
             <div className="container">
                <Link to="/" className="listStyle" active="true">
                    <img src={home} alt="home-icon" className="iconStyle" />
                </Link>
                <Link to="/introduction" className="listStyle" active="true">
                    <img src={introduction} alt="introduction-icon" className="iconStyle" />
                </Link>
            </div>
        </div>
    )
}

export default styled(NavBarVertical)`
    /* position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100px; */

    background-color: #D9D9D9;
    padding: 200px 0;
    & {
        .container {
            display: flex;
            flex-direction: column;
        }
        .listStyle {
            /* border: 1px solid black; */
            padding: 50px 5px;
            text-align: center;
            &:hover {
                background-color: black;
                color: #fff;
            }
            .iconStyle {
                width: 50px;
                height: 50px;
            }
        }
    }
`;