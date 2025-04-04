import { useState, useEffect } from 'react';
import { Theme } from '../types';

const defaultTheme: Theme = {
  mode: 'dark',
  primary: '#00ff00',
  secondary: '#00cc00',
  background: '#121212',
  text: '#ffffff'
};

const lightTheme: Theme = {
  mode: 'light',
  primary: '#00cc00',
  secondary: '#009900',
  background: '#ffffff',
  text: '#000000'
};

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? JSON.parse(savedTheme) : defaultTheme;
  });

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
    document.documentElement.setAttribute('data-theme', theme.mode);
    document.body.style.backgroundColor = theme.background;
    document.body.style.color = theme.text;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme.mode === 'dark' ? lightTheme : defaultTheme));
  };

  const updateTheme = (newTheme: Partial<Theme>) => {
    setTheme(prevTheme => ({ ...prevTheme, ...newTheme }));
  };

  return {
    theme,
    toggleTheme,
    updateTheme
  };
}; 