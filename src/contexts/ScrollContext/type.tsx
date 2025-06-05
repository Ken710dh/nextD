export type ScrollProviderProps = {
  children: React.ReactNode;
};

export interface ScrollContextType {
  scrollRef: React.RefObject<HTMLDivElement | null>;
  saveScroll: () => void;
  restoreScroll: () => void;
}
