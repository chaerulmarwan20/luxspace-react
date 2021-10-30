import { useState } from "react";

const useForm = (initialState) => {
  const [state, setState] = useState(initialState);

  const updateState = (e) =>
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return { state, updateState };
};

export default useForm;
