"use client";
import { Provider } from 'react-redux';
import { useRef } from 'react';
import store from '@/redux/store';

export default function ReduxProvider({ children }) {
  const storeRef = useRef();
  if (!storeRef.current) {
    storeRef.current = store;
  }

  return (
    <Provider store={storeRef.current}>
      {children}
    </Provider>
  );
} 