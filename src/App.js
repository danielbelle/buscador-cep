import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './style.css';
import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {

    if (input === '') {
      alert("Preencha algum CEP!")
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      console.log(response.data);
      setCep(response.data);
      setInput("");

    } catch {
      alert("Ops, erro ao buscar o CEP");
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input
          type="test"
          placeholder="Digite seu CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff" />
        </button>
      </div>

      {Object.keys(cep).length > 0 &&
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>
          {Object.keys(cep.logradouro).length > 0 && <span>{cep.logradouro}</span>}
          {Object.keys(cep.complemento).length > 0 && <span>Complemento: {cep.complemento}</span>}
          {Object.keys(cep.bairro).length > 0 && <span>{cep.bairro}</span>}
          {(Object.keys(cep.localidade).length > 0 || Object.keys(cep.uf).length > 0)&& <span>{cep.localidade} - {cep.uf}</span>}

        </main>

      }
    </div>
  );
}

export default App;
