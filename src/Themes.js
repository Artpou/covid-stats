import React from 'react';

export const themes = {
    light: {
      background: '#F0F2F5',
      text: '#000000',
      card: '',
      appContainer: 'app-container',
      variant:'light',
      gradient: ["#d6d7ff", "#8884d8","#771b95"],
      toggle: "Dark mode",
    },
    dark: {
      background: '#36393F',
      text: '#ffffff',
      card: '#343A40',
      appContainer: 'app-container-dark',
      variant:'dark',
      gradient: ["#ffffff", "#ffc500","#990a06"],
      toggle: "Light mode",
    },
  };
  
  export const ThemeContext = React.createContext(
    themes.dark // default value
  );