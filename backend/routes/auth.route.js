import express from 'express';
import { signup, logout, login, refreshToken, getProfile } from '../controllers/auth.controller.js';

const router = express.Router();

// Use both GET and POST for /signup
router.route('/signup')
  .get((req, res) => {
    res.send('GET request to fetch signup information');
  })
  .post(signup);

router.post('/logout', logout);

router.post('/login', login);


router.post('/refresh-token', refreshToken);

router.post('/getprofile', getProfile);



export default router;

