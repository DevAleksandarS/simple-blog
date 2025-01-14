import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

interface LoadingContextType {
  isScreenLoading: boolean;
  setIsScreenLoading: Dispatch<SetStateAction<boolean>>;
}

const LoadingContext = createContext<LoadingContextType | null>(null);

export const useLoadingScreen = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoadingScreen must be used within a OverlayLoadingProvider");
  }
  return context;
};

interface OverlayLoadingProviderProps {
  children: ReactNode;
}

export const OverlayLoadingProvider = ({ children }: OverlayLoadingProviderProps) => {
  const [isScreenLoading, setIsScreenLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isScreenLoading, setIsScreenLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
