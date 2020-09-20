import React from 'react';

export const themes = {
    light: {
      background: '#F8F9FA',
      text: '#000000',
      card: '',
      link: '',
      appContainer: 'app-container',
      variant:'light',
      default: 'primary',
      button: 'primary',
      button_mode:'dark',
      gradient: ["#c3d8f2", "#62a9f2","#0079F2"],
      toggle: "Dark mode",
    },
    dark: {
      background: '#222222',
      text: '#ffffff',
      card: '#343A40',
      link: '#C25504',
      appContainer: 'app-container-dark',
      variant:'dark',
      default: 'light',
      button: 'light',
      button_mode:'light',
      gradient: ["#ffffff", "#ffc500","#990a06"],
      toggle: "Light mode",
    },
  };
  
  export const ThemeContext = React.createContext(
    themes.dark // default value
  );