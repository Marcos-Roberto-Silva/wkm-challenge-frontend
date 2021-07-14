/* eslint-disable @next/next/link-passhref */
import React from "react";
import { GetStaticProps } from "next";
import { api } from "../services/api";
import { CitiesComponent } from "../components/Cities";

type State = {
  name: string;
  uf: string;
};

type HomeProps = {
  states: State[];
};

export default function Home(props: HomeProps) {

  const { states } = props;

  return (
    <div>
      <CitiesComponent states={states} />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('states');

  return {
    props: { states: data },
    revalidate: 60 * 60 * 8,
  };
};
