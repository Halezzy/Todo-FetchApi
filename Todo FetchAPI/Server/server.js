const express = require('express');
const path = require('path');
const app = express();
const port = 5000;

// Serve arquivos estáticos do diretório 'public'
app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json());

let todos = [
    { id: 1, todo: 'Sample Todo 1', completed: false },
    { id: 2, todo: 'Sample Todo 2', completed: true }
];

app.get('/todos', (req, res) => {
    res.json({ todos });
});

app.post('/todos', (req, res) => {
    const newTodo = { id: Date.now(), ...req.body };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.delete('/todos/:id', (req, res) => {
    todos = todos.filter(todo => todo.id !== parseInt(req.params.id));
    res.status(204).end();
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
