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
  setFetchResponse: (fetchResponse: any) => void;
  
  state: string;
  city: string;
  cep: string;
  fetchResponse: any;
};

export const Context = createContext({} as ContextData);

type ContextProvider = {
  children: ReactNode;
};

export function ContextProvider({ children }: ContextProvider) {
const [state, setState] = useState('');
const [city, setCity] = useState('');
const [cep, setCep] = useState('');
const [fetchResponse, setFetchResponse] = useState();

const context = {
  state,
  setState,
  city,
  setCity,
  cep,
  setCep,
  fetchResponse, 
  setFetchResponse,
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