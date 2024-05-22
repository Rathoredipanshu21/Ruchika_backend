import {postoder,getoder } from '../Contex/OderContex.js'
// import { addProduct } from '../path/to/your/controller';

import express from 'express'

const router = express.Router();

// Route for user registration
router.post('/oder/post', postoder);  
router.get('/oder/get/:itemid/:userid', getoder)  









export default router;