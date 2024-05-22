import {register , getproduct,login } from '../Contex/UserContex.js'
// import { addProduct } from '../path/to/your/controller';

import express from 'express'

const router = express.Router();

// Route for user registration
router.post('/register', register);  
router.get('/get', getproduct)  
router.post('/login', login);








export default router;