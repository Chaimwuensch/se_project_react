import { useState } from "react";

export function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);

function resetForm() {
  setValues(inputValues);
}
  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues, resetForm };
}
