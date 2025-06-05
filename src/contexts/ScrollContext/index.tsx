// ScrollContext.tsx
'use client';
import  React, { useCallback } from 'react';
import { createContext, useContext, useRef } from 'react';
import { ScrollContextType, ScrollProviderProps } from './type';

const ScrollContext = createContext<ScrollContextType | null>(null);
export const ScrollProvider: React.FC<ScrollProviderProps> = ({ children }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollTopRef = useRef<number>(0);

  const saveScroll = useCallback(() => {
    if (scrollRef.current) {
      scrollTopRef.current = scrollRef.current.scrollTop;
      // console.log('Scroll saved:', savedScrollTop.current);
    }
  }, []);

  const restoreScroll = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollTopRef.current;
      // console.log('Scroll restored:', savedScrollTop.current);
    }
  }, []);

  return (
    <ScrollContext.Provider value={{ scrollRef, saveScroll, restoreScroll }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScrollContext = () => {
  const context = React.useContext(ScrollContext);
  if (!context) {
    throw new Error('useScrollContext must be used within a ScrollProvider');
  }
  return context;
};