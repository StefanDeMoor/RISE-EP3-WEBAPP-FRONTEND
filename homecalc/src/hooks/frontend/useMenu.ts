import { useState } from 'react';

export const useMenu = (initial: string) => {
  const [activeItem, setActiveItem] = useState(initial);
  return { activeItem, setActiveItem };
};
