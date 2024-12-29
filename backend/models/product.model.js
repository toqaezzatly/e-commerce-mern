import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: [true, 'Product ID is required'],
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    price: {
        type: Number,
        min: [0, 'Price must be greater than 0'],
        required: [true, 'Price is required'],
    },
    countInStock: {
        type: Number,
        required: [true, 'Count in stock is required'],
    },
    image: {
        type: String,
        required: [true, 'Image URL is required'],
    },
    catagory: {
        type: String,
        required: [true, 'Catagory is required'],
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },

}, { timestamps: true });


const Product = mongoose.model('Product', productSchema);

export default Product;