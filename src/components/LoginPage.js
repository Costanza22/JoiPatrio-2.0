// LoginPage.js
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function LoginPage({ onLogin, showCasaroes }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = () => {
    if (role === 'admin' && username === 'admin' && password === 'admin') {
      onLogin(true); // Admin login
    } else if (role === 'visitante') {
      showCasaroes(); // Chama a função para mostrar casarões
      onLogin(false); // Login como visitante
    } else {
      alert('Credenciais inválidas');
    }
  };

  const handleRegister = () => {
    if (password === confirmPassword) {
      alert('Cadastro realizado com sucesso!');
      setIsRegistering(false);
    } else {
      alert('As senhas não coincidem!');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img 
          src="https://omunicipiojoinville.com/wp-content/uploads/2023/03/casarao-neitzel-joinville.jpg" 
          alt="Casarão Histórico"
          style={styles.image}
        />
        
        {isRegistering ? (
          <>
            <h2 style={styles.title}>Cadastro</h2>
            <input
              type="text"
              placeholder="Nome de Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
            />
            <div style={styles.passwordContainer}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
              <span 
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <input
              type="password"
              placeholder="Confirme a Senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
            />
            <button onClick={handleRegister} style={styles.button}>Cadastrar</button>
            <p style={styles.switchText}>
              Já tem uma conta? <span onClick={() => setIsRegistering(false)} style={styles.link}>Entrar</span>
            </p>
          </>
        ) : (
          <>
            <center>
              <h2 style={styles.title}>Bem-vindo ao JoiPatrio</h2>
            </center>
            <p style={styles.subtitle}>
              {role === 'visitante' ? 'Consultar Casarões' : 'Escolha sua função para acessar'}
            </p>

            <select 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={styles.select}
            >
              <option value="">Selecione uma função</option>
              <option value="admin">Administrador</option>
              <option value="visitante">Visitante</option>
            </select>
            {role === 'visitante' ? null : (
              <>
                <input
                  type="text"
                  placeholder="Usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={styles.input}
                />
                <div style={styles.passwordContainer}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                  />
                  <span 
                    onClick={() => setShowPassword(!showPassword)}
                    style={styles.eyeIcon}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </>
            )}

            <button onClick={handleLogin} style={styles.button}>
              {role === 'visitante' ? 'Consultar' : 'Entrar'}
            </button>
            <p style={styles.switchText}>
              Não tem uma conta? <span onClick={() => setIsRegistering(true)} style={styles.link}>Cadastrar-se</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#F5DEB3',
    fontFamily: 'Georgia, serif',
    boxSizing: 'border-box', 
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#FFF8DC',
    borderRadius: '15px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
    width: '100%', 
    maxWidth: '350px', 
    boxSizing: 'border-box',
  },
  image: {
    width: '100%',
    borderRadius: '10px',
    marginBottom: '15px',
  },
  title: {
    fontSize: '28px',
    color: '#8B4513',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#8B4513',
    marginBottom: '20px',
  },
  select: {
    padding: '10px',
    marginBottom: '15px',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #8B4513',
    color: '#8B4513',
  },
  input: {
    padding: '10px',
    paddingRight: '35px', 
    marginBottom: '10px',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #8B4513',
    color: '#8B4513',
    boxSizing: 'border-box', 
  },
  passwordContainer: {
    position: 'relative',
    width: '100%',
    marginBottom: '10px',
  },
  eyeIcon: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    color: '#8B4513',
  },

  
  button: {
    padding: '10px',
    backgroundColor: '#8B4513',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '15px',
  },
  switchText: {
    marginTop: '15px',
    fontSize: '14px',
    color: '#8B4513',
  },
  link: {
    color: '#8B4513',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

export default LoginPage;
