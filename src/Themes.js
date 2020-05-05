import React from 'react';

export const themes = {
    light: {
      background: '#F8F9FA',
      text: '#000000',
      card: '',
      appContainer: 'app-container',
      variant:'light',
      button: 'primary',
      button_mode:'dark',
      gradient: ["#d6d7ff", "#8884d8","#771b95"],
      toggle: "Dark mode",
    },
    dark: {
      background: '#222222',
      text: '#ffffff',
      card: '#343A40',
      appContainer: 'app-container-dark',
      variant:'dark',
      button: 'light',
      button_mode:'light',
      gradient: ["#ffffff", "#ffc500","#990a06"],
      toggle: "Light mode",
    },
  };
  
  export const ThemeContext = React.createContext(
    themes.dark // default value
  );