import multer from 'multer';
import path from 'path';
import fs from 'fs';
import db from '../db.js'; // Adjust this path if your db.js is elsewhere

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Please upload image files only (jpeg, jpg, png, gif).'));
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter 
});

export const baranuplaod = (req, res) => {
    upload.single('image')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({ message: err.message });
        } else if (err) {
            return res.status(400).json({ message: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded." });
        }

        const image = req.file.filename;
        const query = "INSERT INTO `banner`(`image`) VALUES (?)";

        db.query(query, [image], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Error inserting image into database." });
            }
            res.status(200).json({ message: "File uploaded and inserted into database successfully." });
        });
    });
};

export const deleteImage = (req, res) => {
    const { id } = req.params;
    const query = "SELECT `image` FROM `banner` WHERE `id` = ?";

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error retrieving image from database." });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Image not found." });
        }

        const imagePath = path.join('public/images', results[0].image);
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Error deleting image file." });
            }

            const deleteQuery = "DELETE FROM `banner` WHERE `id` = ?";
            db.query(deleteQuery, [id], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Error deleting image from database." });
                }
                res.status(200).json({ message: "Image deleted successfully." });
            });
        });
    });
};
