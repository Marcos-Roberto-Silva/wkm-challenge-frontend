import React, { useContext, useState } from 'react';
import { ImportContext } from '../contexts/Context';
import { GetStaticProps } from 'next';
import { api } from '../services/api'
import axios from 'axios';

type State = {
  name: string;
  uf: string;
}

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

type Event = {
  preventDefault: () => void;
}

type HomeProps = {
  states: State[];
}

interface SampleFormData {
  username: string;
}

interface SampleFormProps {
  saveData: (data: SampleFormData) => void;
}

export default function Home(props: HomeProps) { 
 const { state: uf, setState, setCity, city: name, cep: postalCode, setCep } = ImportContext();
  const { states } = props;
  
  const handleSubmit = async (e: Event ) => {
    e.preventDefault();
    const cep = parseInt(postalCode);
    const payload = { name, cep, uf };
    api.post('cities', payload).then((response) => console.log(response.status));
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div >
          <input type="text" name="ufState" placeholder="Cidade" onChange={(e) => setCity(e.target.value) } />
          <input type="text" placeholder="Cep" onChange={(e) => setCep(e.target.value)} />
          <button>Salvar</button>
        </div>
        <div>
          <select value={uf} onChange={(e) => setState(e.target.value)}>
            { states.map((state) => <option key={state.uf} value={state.uf}>{state.uf}</option>)}
          </select>
        </div>
      </form>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('states');

  return { 
    props: {
      states: data,
    },
    revalidate: 60 * 60 * 8,
  }
}
