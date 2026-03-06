const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Product = require('./models/productModel')


mongoose
    .connect('mongodb+srv://admin:NodeAPIs@cluster0.gshhd2o.mongodb.net/node-api?retryWrites=true&w=majority')
    .then(() => {
        console.log('MongoDB Connected')
        app.listen(3000, () => {
            console.log('NodeAPI App is running on port 3000');
        })
    })
    .catch(err => console.log(err))

app.use(express.json()) //JSON middle ware
app.use(express.urlencoded({ extended: true })) //URL Encoded middle ware
//routes
app.get('/', (req, res) => {
    res.send("Hello NodeAPI")

})
//Create
app.post('/product', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    }
    catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message })
    }
})
//Read
app.get('/getProducts', async (req, res) => {
    try {
        const product = await Product.find({})
        res.status(200).json(product)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
})

app.get('/getProductByID/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id)
        res.status(200).json(product)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
})

app.get('/getProductByName/:name', async (req, res) => {
    try {
        const product = await Product.find({ name: req.params.name })
        res.status(200).json(product)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
})

//Update
app.put('/updateProduct/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res.status(404).json({ message: `Product not found with the Id : ${id}` })
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)

    }
    catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message })
    }
})

//Delete
app.delete('/deleteProduct/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: `Product not found with the Id : ${id}` })
        }
        res.status(200).json({ message: `Product deleted successfully with the Id : ${id}` })

    }
    catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message })
    }
}
)

