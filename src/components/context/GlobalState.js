import React, { createContext } from 'react';
import { useLocalStore, useObserver } from 'mobx-react';

import {cardDummyData} from '../../assets/dummy/cardDummyData';


// Create Context
export const GlobalContext = createContext();

// Provider Component
export const GlobalProvider = ({ children }) => {

    const store = useLocalStore(() => ({
        data: [...cardDummyData],
        showSearchResults: false,
        keyword: 'yooo',
        toggleShowSearchResults: () => {
            store.showSearchResults = true;
            console.log("whats wronggg", store.showSearchResults);
            
        }
    }));
   


    return(
        <GlobalContext.Provider value={store}>
            {children}
        </GlobalContext.Provider>
    );
}