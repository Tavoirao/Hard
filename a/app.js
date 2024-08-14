const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

let products = []; // Armazenará os produtos temporariamente na memória

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Servir páginas HTML
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

app.get('/create-product', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'create-product.html'));
});

app.get('/remove-product', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'remove-product.html'));
});

// API para criar produto
app.post('/create-product', (req, res) => {
    const { productName, productSize, productImpedance } = req.body;
    const newProduct = {
        id: products.length + 1, // Simplesmente incrementando o ID
        name: productName,
        size: productSize,
        impedance: productImpedance
    };
    products.push(newProduct);
    res.json({ success: true });
});

// API para listar produtos
app.get('/listar-produtos', (req, res) => {
    res.json({ products });
});

// API para remover produto
app.post('/remove-product', (req, res) => {
    const { productId } = req.body;
    products = products.filter(product => product.id !== parseInt(productId));
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
