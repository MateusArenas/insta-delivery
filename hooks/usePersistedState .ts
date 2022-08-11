import React from 'react'

export function usePersistedState<T>(key: string, initialState: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = React.useState<T>(initialState);

  React.useEffect(() => {
    (async () => {
      
      const storageValue = localStorage.getItem(key);
      
      if (storageValue) {
        const parseV = JSON.parse(storageValue);

        if(Array.isArray(initialState) && !Array.isArray(parseV)) {
          setState(Object.values(parseV) as any);
        } else {
          setState(parseV);
        }
      } else {
        setState(initialState);
      }
    })()
  }, [key])

  React.useEffect(() => {
    (async () => {
      try {
      localStorage.setItem(key, JSON.stringify(state))
      
      } catch (err) {
        console.log(err);
      }
    })()
  }, [state])

  
  return [state, setState]
};