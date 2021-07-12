import { createContext, ReactNode, useContext, useState } from "react";

type ContextData = {
  setState: (state: string) => void;
  setCity: (city: string) => void;
  setCep: (cep: string) => void;
  setUf:(uf: string) => void;
  setGetCityResponse: (getCityResponse: any) => void;
  setGetStateResponse:(getStateResponse: any) => void;
  
  state: string;
  uf: string;
  city: string;
  cep: string;
  getCityResponse: any;
  getStateResponse: any;
};

export const Context = createContext({} as ContextData);

type ContextProvider = {
  children: ReactNode;
};

export function ContextProvider({ children }: ContextProvider) {
const [state, setState] = useState('');
const [uf, setUf] = useState('');
const [city, setCity] = useState('');
const [cep, setCep] = useState('');
const [getCityResponse, setGetCityResponse] = useState();
const [getStateResponse, setGetStateResponse] = useState();

const context = {
  state,
  setState,
  uf, 
  setUf,
  city,
  setCity,
  cep,
  setCep,
  getCityResponse, 
  setGetCityResponse,
  getStateResponse,
  setGetStateResponse,
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