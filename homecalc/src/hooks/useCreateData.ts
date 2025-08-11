import { useState } from 'react';

type CreateDataType = {
  Overview: string[];
  Saving: string[];
};

export const useCreateData = () => {
  const [activeSubItem, setActiveSubItem] = useState<keyof CreateDataType>('Overview');
  const [createData, setCreateData] = useState<CreateDataType>({
    Overview: [],
    Saving: [],
  });

  const handleAddItem = (category: keyof CreateDataType) => {
    setCreateData(prev => ({
      ...prev,
      [category]: [...prev[category], `Nieuw item in ${category}`],
    }));
  };

  return { activeSubItem, setActiveSubItem, createData, handleAddItem };
};

