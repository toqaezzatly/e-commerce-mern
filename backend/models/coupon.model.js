import mongoose from 'mongoose';


const couponSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    code: {
        type: String,
        required: [true, 'Code is required'],
    },
    discountPercentage: {
        type: Number,
        required: [true, 'Discount is required'],
        min: [0, 'Discount must be greater than 0'],
        max: [100, 'Discount must be less than 100'],
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required'],
    },
    expeirationDate: {
        type: Date,
        required: [true, 'End date is required'],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});



const Coupon = mongoose.model('Coupon', couponSchema);

export default Coupon;