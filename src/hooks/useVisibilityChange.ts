import { useEffect, useState } from 'react';

// i'm using visibility change event to to listen for a popup closing
// chrome doesn't provide any method in their api to track this
export const useVisibilityChange = () => {
  const [change, setChange] = useState(false);

  const listenForChange = () => {
    setChange(true);
  };

  useEffect(() => {
    document.addEventListener('visibilitychange', listenForChange);
  });

  return change;
};