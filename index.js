import express from 'express';
import mysql from 'mysql2';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// Conexão ao banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'casaroes_db',
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err); // Log de erro de conexão
    return;
  }
  console.log('Conectado ao MySQL');
});

// Configuração do multer para salvar imagens em disco
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    // Cria o diretório se não existir
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir); // Diretório de destino
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nome único para o arquivo
  }
});

const upload = multer({ storage });

app.post('/casaroes', upload.single('image'), (req, res) => {
  console.log('Request Body:', req.body); // Log do corpo da requisição
  console.log('Uploaded File:', req.file); // Log do arquivo enviado

  const { name, description, location } = req.body; 
  const image_path = req.file ? req.file.path : null;

  const sql = 'INSERT INTO casaroes (name, description, location, image_path) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, description, location, image_path], (err, results) => {
    if (err) {
      console.error('Erro ao cadastrar o casarão:', err); // Log detalhado do erro
      return res.status(500).json({ error: 'Erro ao cadastrar o casarão' });
    }
    res.status(201).json({ id: results.insertId, name, description, location, image_path });
  });
});

// Rota para consultar todos os casarões
app.get('/casaroes', (req, res) => {
  const sql = 'SELECT id, name, description, location, image_path FROM casaroes';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao consultar casarões:', err); // Log detalhado do erro
      return res.status(500).json({ error: 'Erro ao consultar casarões' });
    }
    res.json(results);
  });
});

// Inicia o servidor
app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});
