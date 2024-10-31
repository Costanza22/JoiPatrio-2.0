import React, { useState, useEffect } from 'react';

function CasaraoFormPage({ onSubmit, casaraoData }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);

  // Preencher os campos do formulário se estiver editando
  useEffect(() => {
    if (casaraoData) {
      setName(casaraoData.name);
      setDescription(casaraoData.description);
      setLocation(casaraoData.location);
      setImage(null); // Se você não deseja que a imagem anterior seja exibida
    } else {
      // Limpar os campos se não houver dados de casarão
      setName('');
      setDescription('');
      setLocation('');
      setImage(null);
    }
  }, [casaraoData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('location', location);
    formData.append('image', image);

    onSubmit(formData);
    // Limpar os campos após o envio
    setName('');
    setDescription('');
    setLocation('');
    setImage(null);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{casaraoData ? 'Editar Casarão' : 'Cadastrar Novo Casarão'}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Nome do Casarão"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />
        <textarea
          placeholder="Descrição do Casarão"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={styles.textarea}
        />
        <input
          type="text"
          placeholder="Endereço do Casarão"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          style={styles.input}
        />
        <label htmlFor="fileInput" style={styles.fileLabel}>
          {image ? image.name : 'Escolher arquivo'}
        </label>
        <input
          type="file"
          id="fileInput"
          onChange={(e) => setImage(e.target.files[0])}
          style={styles.fileInput}
        />
        <button type="submit" style={styles.submitButton}>
          {casaraoData ? 'Salvar Alterações' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    backgroundColor: 'Burlywood',
    fontFamily: 'Arial, sans-serif',
    borderRadius: '8px',
    maxWidth: '400px',
    margin: '20px auto', // Adiciona margem
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Adiciona sombra ao container
  },
  title: {
    fontSize: '24px',
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    margin: '5px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  textarea: {
    padding: '10px',
    margin: '5px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    resize: 'vertical', // Permite redimensionar verticalmente
  },
  fileLabel: {
    padding: '10px',
    margin: '5px 0',
    backgroundColor: '#8B4513', // Cor do botão
    color: '#fff',
    borderRadius: '5px',
    cursor: 'pointer',
    textAlign: 'center',
    display: 'inline-block',
    textDecoration: 'none',
  },
  fileInput: {
    display: 'none', // Esconde o input de arquivo padrão
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#8B4513', // Cor do botão
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s', // Adiciona efeito de transição
  },
  submitButtonHover: {
    backgroundColor: '#5C3D2D', // Cor ao passar o mouse
  },
  imagePreview: {
    marginTop: '10px',
    textAlign: 'center',
  },
  previewImage: {
    maxWidth: '200px', // Define a largura máxima da imagem
    height: 'auto',
  },
};

export default CasaraoFormPage;