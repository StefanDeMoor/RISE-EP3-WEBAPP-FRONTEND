import { useState } from 'react';

export type OverviewItem = {
  title: string;
  amount: number;
};

type CreateDataType = {
  Overview: OverviewItem[];
  Saving: OverviewItem[];
};

export const useCreateData = () => {
  const [activeSubItem, setActiveSubItem] = useState<keyof CreateDataType>('Overview');
  const [createData, setCreateData] = useState<CreateDataType>({
    Overview: [],
    Saving: [],
  });

  const addOverviewItem = (category: keyof CreateDataType, title: string, amount: number) => {
    setCreateData(prev => ({
      ...prev,
      [category]: [...prev[category], { title, amount }],
    }));
  };

  return { activeSubItem, setActiveSubItem, createData, addOverviewItem };
};
