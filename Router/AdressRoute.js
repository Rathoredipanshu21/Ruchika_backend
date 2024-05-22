

import express from 'express';
import { addAddress, getAddress,  updateAddress } from '../Contex/AddressContex.js';

const router = express.Router();

router.post('/post', addAddress);
router.get('/get/:id_user', getAddress);


router.put('/up/:addressid', updateAddress); 

export default router;