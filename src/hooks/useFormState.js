import { useState } from 'react';

const useFormState = (formState) => {
  const [input, setInput] = useState(formState);

  const onChangeInputHandler = (event) => {
    const { name, value } = event.target;

    setInput((prevState) => ({ ...prevState, [name]: value }));
  };

  return {
    input,
    setInput,
    onChangeInputHandler,
  };
};

export default useFormState;
