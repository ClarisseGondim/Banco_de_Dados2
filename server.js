const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// conexão banco
mongoose.connect('mongodb+srv://claryssegondymp10_db_user:j9OtqfQexz757Ui9@cluster0.cecbjef.mongodb.net/teste?retryWrites=true&w=majority')
.then(() => console.log('MongoDB conectado'))
.catch(err => console.log('ERRO MONGO:', err));

// ===== MODELOS =====
const Tarefa = mongoose.model('Tarefa', {
  titulo: String
});

const Admin = mongoose.model('Admin', {
  nome: String,
  email: String
});

// ===== CRUD TAREFA =====

// inserir
app.post('/tarefas', async (req, res) => {
  const t = await Tarefa.create(req.body);
  res.json(t);
});

// listar
app.get('/tarefas', async (req, res) => {
  res.json(await Tarefa.find());
});

// buscar por id
app.get('/tarefas/:id', async (req, res) => {
  res.json(await Tarefa.findById(req.params.id));
});

// alterar
app.put('/tarefas/:id', async (req, res) => {
  const t = await Tarefa.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(t);
});

// apagar
app.delete('/tarefas/:id', async (req, res) => {
  await Tarefa.findByIdAndDelete(req.params.id);
  res.json({ msg: "apagado" });
});

// ===== CRUD ADMIN =====

// inserir
app.post('/admins', async (req, res) => {
  res.json(await Admin.create(req.body));
});

// listar
app.get('/admins', async (req, res) => {
  res.json(await Admin.find());
});

// buscar por id
app.get('/admins/:id', async (req, res) => {
  res.json(await Admin.findById(req.params.id));
});

// alterar
app.put('/admins/:id', async (req, res) => {
  res.json(await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

// apagar
app.delete('/admins/:id', async (req, res) => {
  await Admin.findByIdAndDelete(req.params.id);
  res.json({ msg: "admin apagado" });
});

// rodar servidor
app.listen(3000, () => console.log('rodando na porta 3000'));