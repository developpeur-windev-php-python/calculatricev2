import { useState, useCallback } from 'react';

const useCalculator = (initialInputs, calculateFunction) => {
  const [inputs, setInputs] = useState(initialInputs);
  const [result, setResult] = useState(null);

  const handleInputChange = useCallback((name, value) => {
    setInputs(prev => ({ ...prev, [name]: value }));
  }, []);

  const calculate = useCallback(() => {
    const calculatedResult = calculateFunction(inputs);
    setResult(calculatedResult);
  }, [inputs, calculateFunction]);

  return {
    inputs,
    handleInputChange,
    calculate,
    result
  };
};

export default useCalculator;