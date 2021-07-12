/* eslint-disable @next/next/link-passhref */
import React from "react";
import { ImportContext } from "../contexts/Context";
import { GetStaticProps } from "next";
import { api } from "../services/api";
import Link from 'next/link';

type State = {
  name: string;
  uf: string;
};

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type Event = {
  preventDefault: () => void;
};

type HomeProps = {
  states: State[];
};

interface SampleFormData {
  username: string;
}

interface SampleFormProps {
  saveData: (data: SampleFormData) => void;
}

export default function Home(props: HomeProps) {
  const {
    state: uf,
    setState,
    setCity,
    city: name,
    cep: postalCode,
    setCep,
  } = ImportContext();
  const { getCityResponse, setGetCityResponse, } = ImportContext();
  const { states } = props;

  console.log(getCityResponse);
  
  const HandleSubmit = async (e: Event) => {
    e.preventDefault();
    const cep = parseInt(postalCode);
    const payload = { name, cep, uf };
    const result = await fetch("http://localhost:3001/cities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    
    const responseFetch = await result.json();
    setGetCityResponse(responseFetch);
  };
  
  return (
    <div>
      <form onSubmit={HandleSubmit}>
        <div>
          <input
            type="text"
            name="ufState"
            placeholder="Cidade"
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="Cep"
            onChange={(e) => setCep(e.target.value)}
          />
          <button>Salvar</button>
        </div>
        <div>
          <select value={uf} onChange={(e) => setState(e.target.value)}>
          <option defaultValue="Estados">Estados</option>
            {
              states.map((state) => (
                <option key={state.uf} value={state.uf}>
                  {state.uf}
                </option>
              ))
            }
          </select>
        </div>
      </form>
      {getCityResponse !== {} ? <p>{getCityResponse?.message}</p> : null}
      <Link href="/states" >
        <button>Cadastrar estados</button>
      </Link>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("states");

  return {
    props: { states: data },
    revalidate: 60 * 60 * 8,
  };
};
