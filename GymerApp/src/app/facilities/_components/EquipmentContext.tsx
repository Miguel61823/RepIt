// context/EquipmentContext.tsx
'use client';

import React, {createContext, useContext, useState} from 'react';

const EquipmentContext = createContext(null);

export const EquipmentProvider = ({children}) => {
  const [equipmentList, setEquipmentList] = useState([]);

  const addEquipment = equipment => {
    setEquipmentList(prev => [...prev, {id: Date.now(), ...equipment}]);
  };

  return (
    <EquipmentContext.Provider value={{equipmentList, addEquipment}}>
      {children}
    </EquipmentContext.Provider>
  );
};

export const useEquipment = () => {
  const context = useContext(EquipmentContext);
  if (!context) {
    throw new Error('useEquipment must be used within an EquipmentProvider');
  }
  return context;
};
