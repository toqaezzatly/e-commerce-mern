import express from 'express';
import { getAllProducts, createProduct , getFeaturedProducts, deleteProduct, getRecommnededProducts, getProductsByCatagory, toggleFeaturedProduct} from '../controllers/products.controller.js';
import { protectRoute, adminRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', protectRoute, adminRoute, getAllProducts);
router.post('/', protectRoute, adminRoute, createProduct);
router.delete('/:id', protectRoute, adminRoute, deleteProduct);
router.patch('/:id', protectRoute, adminRoute, toggleFeaturedProduct);



router.get('/featured', getFeaturedProducts);
router.get('/catagory/:catagory', getProductsByCatagory);
router.get('/recommneded', getRecommnededProducts);



export default router;