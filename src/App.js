import React, { useEffect, useState } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    api.get('repositories')
       .then(res => setRepositories(res.data));
  }, []);

  async function handleAddRepository() {
    const { data } = await api.post('repositories', { title });
    setRepositories(prevState => [ ...prevState, data ]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories([ ...repositories.filter(repository => repository.id !== id) ]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => (
            <li key={repository.id}>
              { repository.title }

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))
        }
      </ul>
      <input type="text" placeholder="Repositorio" value={title} onChange={({ target }) => setTitle(target.value)} />
      <input type="text" placeholder="URL" value={url} onChange={({ target }) => setUrl(target.value)} />
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;