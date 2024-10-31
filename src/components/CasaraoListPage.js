import React, { useEffect, useState } from 'react';
import CasaraoFormPage from './CasaraoFormPage';
import { MdOutlineModeEdit } from 'react-icons/md';
import { IoIosStarOutline, IoMdCheckmarkCircleOutline } from 'react-icons/io'; // Importar o ícone de checkmark

function CasaraoListPage({ isAdmin }) {
  const [casaroes, setCasaroes] = useState([]);
  const [showCadastro, setShowCadastro] = useState(false);
  const [showList, setShowList] = useState(false);
  const [error, setError] = useState(null);
  const [casaraoToEdit, setCasaraoToEdit] = useState(null);
  const [favoritos, setFavoritos] = useState([]);
  const [visitados, setVisitados] = useState([]); // Estado para casarões visitados

  const fetchCasaroes = async () => {
    try {
      const response = await fetch('http://localhost:5000/casaroes');
      if (!response.ok) throw new Error('Erro ao carregar os casarões: ' + response.statusText);
      
      const data = await response.json();
      setCasaroes(data);
      setError(null);
    } catch (error) {
      console.error('Erro ao carregar os casarões:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (showList) {
      fetchCasaroes();
    }
  }, [showList]);

  const handleCadastroClick = () => {
    setShowCadastro(true);
    setShowList(false);
    setCasaraoToEdit(null);
  };

  const handleConsultarClick = () => {
    setShowList((prev) => !prev);
    setShowCadastro(false);
    if (!showList) {
      fetchCasaroes();
    }
  };

  const handleFavoritar = (casarao) => {
    setFavoritos((prev) => 
      prev.some(favorito => favorito.id === casarao.id) 
      ? prev.filter(favorito => favorito.id !== casarao.id)
      : [...prev, casarao]
    );
  };

  const handleMarcarVisitado = (casarao) => {
    setVisitados((prev) =>
      prev.some(visitado => visitado.id === casarao.id)
      ? prev.filter(visitado => visitado.id !== casarao.id)
      : [...prev, casarao]
    );
  };

  const handleCasaraoSubmit = async (novoCasarao, id) => {
    try {
      const method = id ? 'PUT' : 'POST';
      const url = id ? `http://localhost:5000/casaroes/${id}` : 'http://localhost:5000/casaroes';

      const response = await fetch(url, { method, body: novoCasarao });
      if (!response.ok) throw new Error(`Erro ao salvar o casarão: ${response.statusText}`);
      
      fetchCasaroes();
      setShowCadastro(false);
      setShowList(true);
    } catch (error) {
      console.error('Erro ao salvar o casarão:', error);
      alert('Erro ao salvar o casarão: ' + error.message);
    }
  };

  const handleEditClick = (casarao) => {
    setCasaraoToEdit(casarao);
    setShowCadastro(true);
    setShowList(false);
  };

  return (
    <div style={styles.container}>
      {showCadastro ? (
        <CasaraoFormPage 
          onSubmit={handleCasaraoSubmit} 
          casaraoData={casaraoToEdit}
        />
      ) : (
        <>
          <h2 style={styles.title}>Lista de Casarões</h2>
          <button onClick={handleConsultarClick} style={styles.button}>
            {showList ? 'Fechar Casarões' : 'Consultar Casarões'}
          </button>
          {isAdmin && (
            <button onClick={handleCadastroClick} style={styles.button}>
              Cadastrar Novo Casarão
            </button>
          )}
          {showList && (
            <div style={styles.listContainer}>
              {error && <div style={{ color: 'red' }}>{error}</div>}
              {casaroes.length > 0 ? (
                <ul style={styles.list}>
                  {casaroes.map((casarao) => (
                    <li key={casarao.id} style={styles.listItem}>
                      <h3>{casarao.name}</h3>
                      <p>{casarao.description}</p>
                      <p>{casarao.location}</p>
                      {casarao.image_path && (
                        <div style={styles.imageContainer}>
                          <img
                            src={`http://localhost:5000/${casarao.image_path}`}
                            alt={casarao.name}
                            style={styles.image}
                          />
                        </div>
                      )}
                      {isAdmin && (
                        <button onClick={() => handleEditClick(casarao)} style={styles.editButton}>
                          <MdOutlineModeEdit /> Editar
                        </button>
                      )}
                      {!isAdmin && (
                        <>
                          <button onClick={() => handleFavoritar(casarao)} style={styles.favoritoButton}>
                            <IoIosStarOutline style={{ color: favoritos.some(favorito => favorito.id === casarao.id) ? 'gold' : 'gray' }} />
                          </button>
                          <button onClick={() => handleMarcarVisitado(casarao)} style={styles.visitadoButton}>
                            <IoMdCheckmarkCircleOutline style={{ color: visitados.some(visitado => visitado.id === casarao.id) ? 'green' : 'gray' }} />
                          </button>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Nenhum casarão cadastrado.</p>
              )}
            </div>
          )}
          {!isAdmin && (
            <div style={styles.favoritosContainer}>
              <h3>Favoritos</h3>
              <ul>
                {favoritos.length > 0 ? (
                  favoritos.map(favorito => (
                    <li key={favorito.id}>{favorito.name}</li>
                  ))
                ) : (
                  <p>Nenhum favorito adicionado.</p>
                )}
              </ul>
              <h3>Visitados</h3>
              <ul>
                {visitados.length > 0 ? (
                  visitados.map(visitado => (
                    <li key={visitado.id}>{visitado.name}</li>
                  ))
                ) : (
                  <p>Nenhum casarão visitado.</p>
                )}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}
const styles = {
  container: {
    padding: '20px',
    backgroundColor: 'Burlywood',
    fontFamily: 'Arial, sans-serif',
    borderRadius: '8px',
  },
  title: {
    fontSize: '24px',
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
  },
  button: {
    display: 'block',
    margin: '10px auto',
    padding: '10px 20px',
    backgroundColor: '#8B4513',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  listContainer: {
    backgroundColor: '#FFF8DC',
    padding: '15px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  },
  list: {
    listStyleType: 'none',
    padding: '0',
  },
  listItem: {
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '5px',
    backgroundColor: '#F5DEB3',
  },
  image: {
    width: '100%',
    borderRadius: '5px',
  },
  editButton: {
    display: 'block', // Alinha o botão como um bloco
    margin: '10px auto', // Centraliza o botão
    padding: '10px 20px', // Adiciona preenchimento
    backgroundColor: '#8B4513', // Cor de fundo burlywood
    color: '#fff', // Cor do texto
    border: 'none', // Remove borda
    borderRadius: '5px', // Bordas arredondadas
    cursor: 'pointer', // Muda o cursor para ponteiro
  },
  favoritosContainer: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#f9f9f9',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  favoritoButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    marginLeft: '10px',
  },

};

export default CasaraoListPage;
