import express from 'express';
import multer from 'multer';
import { uploadMedia } from '../Contex/VideoUpload.js';
import db from '../db.js';

const router = express.Router();

router.post('/video', uploadMedia);

router.get('/video', (req, res) => {
    const query = "SELECT * FROM `videos`";

    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error retrieving videos from database." });
        }
        res.status(200).json(results);
    });
});

router.delete('/video/:id', (req, res) => {
    const videoId = req.params.id;
    const query = "DELETE FROM `videos` WHERE id = ?";

    db.query(query, [videoId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error deleting video from database." });
        }
        res.status(200).json({ message: "Video deleted successfully" });
    });
});

export default router;
