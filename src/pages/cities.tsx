/* eslint-disable @next/next/link-passhref */
import { GetStaticProps } from "next";
import Link from "next/link";
import React, { useEffect } from "react";
import { api } from "../services/api";
import styles from "../components/Cities/styles.module.scss";
import { ImportContext } from "../contexts/Context";
import Image from "next/image";

type Cities = {
  name: string;
  cep: number;
  uf: string;
};

type HomeProps = {
  cities: Cities[];
};

export default function Cities(props: HomeProps) {
  const { cities } = props;

  const { setGetCityResponse } = ImportContext();

  async function removeItemGrid(cep: number) {
    
    await api.delete(`cities/${cep}`);
    const row = document.getElementsByClassName(`.${cep}`)[0];
    row.remove();
  }

  function clearField() {
    setGetCityResponse('');
  }

  return (
    <>
      <section className={styles.allCities}>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Cidade</th>
              <th>Cep</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cities.map((city, index) => {
              return (
                <tr className={`.${city.cep}`} key={index}>
                  <td style={{ width: 72 }}></td>
                  <td>{city.name}</td>
                  <td>{city.cep}</td>
                  <td>{city.uf}</td>
                  <td>
                    <button onClick={() => removeItemGrid(city.cep)}>remover</button>
                  </td>
                </tr>
              ) 
            })}
          </tbody>
        </table>
      </section>
      <Link href="/">
        <Image onClick={() => clearField()} src="/back.png" width={80} height={50} alt="voltar" />
      </Link>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("cities");

  return {
    props: { cities: data },
    revalidate: 60 * 60 * 8,
  };
};
