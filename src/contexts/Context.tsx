import { createContext,ReactNode, useContext, useState } from "react";

type State = {
  name: string;
  uf: string;
};

type City = {
  name: string;
}

type Cep = {
  cep: number;
}

type ContextData = {
  setState: (state: string) => void;
  setCity: (city: string) => void;
  setCep: (cep: string) => void;
  state: string;
  city: string;
  cep: string;
};

export const Context = createContext({} as ContextData);

type ContextProvider = {
  children: ReactNode;
};

export function ContextProvider({ children }: ContextProvider) {
const [state, setState] = useState('');
const [city, setCity] = useState('');
const [cep, setCep] = useState('');

const context = {
  state,
  setState,
  city,
  setCity,
  cep,
  setCep,
}

  return (
    <Context.Provider value={context} >
      {children}
    </Context.Provider>
  );
}

export const ImportContext = () => {
  return useContext(Context);
}