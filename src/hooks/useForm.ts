import { useState } from 'react';
import { parseToString } from '../utils/parseData';
import { BaseCategoryEntry } from '../types';

const useForm = (initialState: BaseCategoryEntry) => {
  const [inputs, setInputs] = useState(initialState);

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = parseToString(e.target.name);
    const value = parseToString(e.target.value);

    setInputs({
      ...inputs,
      [name]: value
    });
  };

  console.log(inputs);

  return {
    inputs,
    handleInputs
  };
};

export default useForm;