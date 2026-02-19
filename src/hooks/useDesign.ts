import { useContext } from 'react';
import { DesignContext } from '../context/DesignContext';

/**
 * Hook to access the Design context
 * Must be used within a DesignProvider
 */
export function useDesign() {
  const context = useContext(DesignContext);

  if (!context) {
    throw new Error('useDesign must be used within a DesignProvider');
  }

  return context;
}
