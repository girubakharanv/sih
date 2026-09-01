import React, { createContext, useContext, useState } from 'react';

const GovernmentContext = createContext();

export function GovernmentProvider({ children }) {
  const [government, setGovernment] = useState({
    id: 'GOV-TN-042',
    name: 'Authorized Official',
    role: 'GOVERNMENT',
    department: 'Tamil Nadu Urban Platform Worker Welfare Board',
    isAuthenticated: false
  });

  const updateGovernment = (updates) => {
    setGovernment((prev) => ({ ...prev, ...updates }));
  };

  return (
    <GovernmentContext.Provider value={{ government, updateGovernment }}>
      {children}
    </GovernmentContext.Provider>
  );
}

export const useGovernment = () => {
  const context = useContext(GovernmentContext);
  if (!context) {
    throw new Error('useGovernment must be used within a GovernmentProvider');
  }
  return context;
};
