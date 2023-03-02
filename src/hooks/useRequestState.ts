import { useState } from 'react';

export default function useRequestState() {
  const [hasQueried, setHasQueried] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rawResponse, setRawResponse] = useState('');

  return {
    hasQueried,
    loading,
    rawResponse,
    setHasQueried,
    setLoading,
    setRawResponse,
  };
}
