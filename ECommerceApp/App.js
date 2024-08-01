import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const App = () => {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    const fetchProducts = async () => {
        const response = await axios.get('http://localhost:3000/products');
        setProducts(response.data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const addProduct = async () => {
        const response = await axios.post('http://localhost:3000/products', {
            name,
            price: parseFloat(price),
            quantity: parseInt(quantity),
        });
        setProducts([...products, response.data]);
        setName('');
        setPrice('');
        setQuantity('');
    };

    const deleteProduct = async (id) => {
        await axios.delete(`http://localhost:3000/products/${id}`);
        setProducts(products.filter(product => product._id !== id));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>JTM POS System</Text>
            <TextInput
                style={styles.input}
                placeholder="Product Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Price"
                keyboardType="numeric"
                value={price}
                onChangeText={setPrice}
            />
            <TextInput
                style={styles.input}
                placeholder="Quantity"
                keyboardType="numeric"
                value={quantity}
                onChangeText={setQuantity}
            />
            <Button title="Add Product" onPress={addProduct} />
            <FlatList
                data={products}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.product}>
                        <Text>{item.name} - ${item.price} - Qty: {item.quantity}</Text>
                        <Button title="Delete" onPress={() => deleteProduct(item._id)} />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    product: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#f9f9f9',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
    },
});

export default App;
