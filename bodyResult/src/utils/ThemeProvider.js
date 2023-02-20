import React, {createContext, useContext} from 'react';

import {theme} from './Theme';

export const ThemeContext = createContext({});

export const ThemeProvider = ({children}) => {
  return (
    <ThemeContext.Provider value={{appTheme: theme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
