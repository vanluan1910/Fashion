import { useState, useEffect } from 'react';
/* Import your mock data here: import * as mockData from '../data/yourMock'; */

/**
 * MOCK API HOOK TEMPLATE
 * Simulates an async API call with a configurable delay.
 */
export const useMockApi = (mockData, delay = 800) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setState({
        data: mockData,
        loading: false,
        error: null,
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [mockData, delay]);

  return state;
};
