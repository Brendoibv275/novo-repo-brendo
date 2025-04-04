import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';

// Adicionando configurações globais
if (process.env.NODE_ENV === 'production') {
  console.log = () => {};
  console.error = () => {};
  console.warn = () => {};
}

// Registra o Service Worker para PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('ServiceWorker registrado com sucesso:', registration);
    }).catch(error => {
      console.log('Falha ao registrar o ServiceWorker:', error);
    });
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
