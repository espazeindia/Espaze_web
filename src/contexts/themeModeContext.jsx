import { createContext, useContext, useState} from 'react';

const ModeContext = createContext(undefined);

export function ModeProvider({ children }) {
  const [theme, setTheme] = useState(true); // true for light and false for dark

  const toggleTheme = () => {
    setTheme(prev => !prev);
  };

  return (
    <ModeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
}
