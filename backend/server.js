import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.route.js';
import productsRoutes from './routes/products.route.js';
import cartRoutes from './routes/cart.route.js';
import couponsRoutes from './routes/coupons.route.js';
import paymentsRoutes from './routes/payment.route.js';
import analyticsRoutes from './routes/analytics.route.js';
 // Ensure your routes are imported correctly
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // This is important to parse JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/cart', cartRoutes);
app.use('api/coupons', couponsRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/analytics', analyticsRoutes);



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Database connection
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB connected');
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});
