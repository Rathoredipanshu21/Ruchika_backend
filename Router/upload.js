import express from 'express';
import { baranuplaod, deleteImage } from '../Contex/BannerUpload.js'; // Import deleteImage function
import db from '../db.js'; 

const router = express.Router();

router.post('/images', baranuplaod);
router.delete('/images/:id', deleteImage); // Route for delete operation

router.get('/images', (req, res) => {
    const query = "SELECT * FROM `banner`";

    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error retrieving images from database." });
        }
        res.status(200).json(results);
    });
});

export default router;
