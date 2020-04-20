import React, { createContext, useReducer, useContext } from 'react';
import globalReducer from './reducer';

const GlobalContext = createContext();

const initialState = {
   status: null,
};

function GlobalProvider(props) {
   const [store, dispatch] = useReducer(globalReducer, initialState);
   return <GlobalContext.Provider value={{ store, dispatch }} {...props} />;
}

function useGlobalStore() {
   return useContext(GlobalContext);
}

export { GlobalProvider, useGlobalStore };
