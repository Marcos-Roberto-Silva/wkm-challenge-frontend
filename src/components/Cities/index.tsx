/* eslint-disable @next/next/link-passhref */
import React from "react";
import { ImportContext } from "../../contexts/Context";
import Link from "next/link";
import styles from "./styles.module.scss";

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type Event = {
  preventDefault: () => void;
};

interface SampleFormData {
  username: string;
}

interface SampleFormProps {
  saveData: (data: SampleFormData) => void;
}

export function CitiesComponent({ states }) {
  const {
    state: uf,
    setState,
    setCity,
    city: name,
    cep: postalCode,
    setCep,
  } = ImportContext();
  const { getCityResponse, setGetCityResponse } = ImportContext();

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
  console.log(getCityResponse);

  return (
    <div className={styles.headerContainer}>
      <form onSubmit={HandleSubmit}>
        <div className={styles.inputGroup}>
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
          <div>
            {getCityResponse ? (
              <p className={styles.isActive}>{getCityResponse?.message}</p>
            ) : null}
          </div>

          <select
            className={styles.selectInput}
            value={uf}
            onChange={(e) => setState(e.target.value)}
          >
            <option defaultValue="Estado">Estado</option>
            {states.map((state: { uf: {} }) => (
              <option key={state.uf.toString()} value={state.uf.toString()}>
                {state.uf}
              </option>
            ))}
          </select>
          <div>
            <Link href="/states">
              <button>Cadastrar estados</button>
            </Link>
            <button>Salvar</button>
          </div>
        </div>
      </form>
    </div>
  );
}
