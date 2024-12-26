import express from 'express';
import { getAllProduct } from '../controllers/products.controller.js';
import { protectRoute, adminRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', protectRoute, adminRoute, getAllProducts);

export default router;