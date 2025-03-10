import  { createContext, useContext, useState, ReactNode } from 'react';

interface StatusContextType {
  loading: boolean;
  error: string;
  warning: string;
  setLoading: (val: boolean) => void;
  setError: (msg: string) => void;
  setWarning: (msg: string) => void;
}

const StatusContext = createContext<StatusContextType | undefined>(undefined);

export const StatusProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [warning, setWarning] = useState<string>('');

  return (
    <StatusContext.Provider
      value={{ loading, error, warning, setLoading, setError, setWarning }}
    >
      {children}
    </StatusContext.Provider>
  );
};

export const useStatus = () => {
  const context = useContext(StatusContext);
  if (!context) {
    throw new Error('useStatus must be used within a StatusProvider');
  }
  return context;
};
