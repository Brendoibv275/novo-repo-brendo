import { useState, useEffect } from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  // Estado para armazenar o valor
  // Passe a função inicial para useState para que seja executada apenas uma vez
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Erro ao ler do localStorage:', error);
      return initialValue;
    }
  });

  // Retorna uma versão empacotada da função setter que persiste
  // o novo valor no localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permite que o valor seja uma função para que tenhamos a mesma API que useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Salva o estado
      setStoredValue(valueToStore);
      
      // Salva no localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error);
    }
  };

  // Remove o item do localStorage
  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error('Erro ao remover do localStorage:', error);
    }
  };

  // Limpa todo o localStorage
  const clearStorage = () => {
    try {
      window.localStorage.clear();
      setStoredValue(initialValue);
    } catch (error) {
      console.error('Erro ao limpar o localStorage:', error);
    }
  };

  // Sincroniza com outras abas/janelas
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key) {
        try {
          setStoredValue(e.newValue ? JSON.parse(e.newValue) : initialValue);
        } catch (error) {
          console.error('Erro ao sincronizar com localStorage:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, initialValue]);

  return {
    value: storedValue,
    setValue,
    removeValue,
    clearStorage
  };
}; 