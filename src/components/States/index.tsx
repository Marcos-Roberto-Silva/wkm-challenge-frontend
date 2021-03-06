/* eslint-disable @next/next/link-passhref */
import Link from "next/link";
import { ImportContext } from "../../contexts/Context";
import styles from "./styles.module.scss";

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

export function StatesComponent() {
  const { state: name, setState, uf, setUf } = ImportContext();
  const { getStateResponse, setGetStateResponse } = ImportContext();

  console.log("Aqui", getStateResponse);

  const clearField = () => {    
    setGetStateResponse('');
  }

  const HandleSubmit = async (e: Event) => {
    e.preventDefault();

    const payload = { name, uf };

    const result = await fetch("http://localhost:3001/states", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const getErrorFromApi = await result.json();
    setGetStateResponse(getErrorFromApi);
  };

  return (
    <div className={styles.headerContainer}>
      <form onSubmit={HandleSubmit}>
        <div>
          <input
            type="text"
            name="ufState"
            placeholder="Nome do Estado"
            required
            onChange={(e) => setState(e.target.value)}
          />
          <input
            type="text"
            placeholder="UF"
            maxLength={2}
            required
            onChange={(e) => setUf(e.target.value.toUpperCase())}
          />
        </div>
        
        <div className="errorSuccessMessage">
            { getStateResponse ? (
              <p className={ !getStateResponse.status? null : styles.isActive }>{ getStateResponse?.message }</p>
            ) : null 
            }
          </div>

        <button>Salvar</button>
        <Link href="/">
          <button onClick={() => clearField()}>Cadastrar Cidade</button>
        </Link>
      </form>
    </div>
  );
}
