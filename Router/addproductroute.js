

import express from 'express';
import {addproduct,updateProduct} from '../Contex/addProduct.js'
import db from '../db.js'; 

const router = express.Router();

router.post('/add-product', addproduct);

router.put('/update/:id', updateProduct);


export default router;




