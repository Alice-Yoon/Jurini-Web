import React from 'react';
import styled from 'styled-components';

function DropDown(props) {
    return (
        <div className={props.className}>
           <div>
               <span>21 Thu</span>
           </div>
           <div>
               {/* <span>DropDown</span> */}
           </div>
        </div>
    )
}

export default styled(DropDown)`
    /* border: 1px solid green; */

`;