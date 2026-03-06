const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name: { type: String, required: [true, "Product Name is Required"] },
        quantity: { type: Number, required: [true, "Product Quantity is Required"] },
        price: { type: Number, required: [true, "Product Price is Required"] },
        description: { type: String, required: [true, "Product Description is Required"] },
        image: { type: String, required: [false, "Product Image is Required"] },
    },
    {
        timestamps: true
    }
)

const product = mongoose.model('Product', productSchema)

module.exports = product