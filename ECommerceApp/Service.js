const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/pos_system', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Product = mongoose.model('Product', new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
}));

app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.send(products);
});

app.post('/products', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.send(product);
});

app.put('/products/:id', async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(product);
});

app.delete('/products/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.send({ message: 'Product deleted' });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});