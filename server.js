const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Sample data - In production, this would be from MongoDB
const products = [
  { id: 1, name: 'Handwoven Saree', price: 4500, category: 'Sarees', description: 'Traditional handwoven saree', artisan: 'Artisan Co', image: '/images/saree1.jpg' },
  { id: 2, name: 'Cotton Dupatta', price: 1200, category: 'Dupattas', description: 'Finest cotton dupatta', artisan: 'Textile Masters', image: '/images/dupatta1.jpg' },
  { id: 3, name: 'Silk Scarf', price: 2800, category: 'Scarves', description: 'Pure silk hand-dyed scarf', artisan: 'Silk Weavers', image: '/images/scarf1.jpg' },
];

const users = [];

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.post('/api/products', (req, res) => {
  const newProduct = {
    id: products.length + 1,
    ...req.body
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.post('/api/users/register', (req, res) => {
  const { name, email, password, role } = req.body;
  const user = { id: users.length + 1, name, email, password, role };
  users.push(user);
  res.status(201).json({ message: 'User registered successfully', user });
});

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to access the application`);
});
