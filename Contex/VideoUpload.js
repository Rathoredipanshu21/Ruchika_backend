import multer from 'multer';
import fs from 'fs';
import path from 'path';
import db from '../db.js'; 

// Ensure that the directories exist
const createUploadsDirectories = () => {
    const directories = ['Public', 'Public/images', 'Public/videos'];
    directories.forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });
};

createUploadsDirectories();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const type = file.mimetype.split('/')[0];
        const destPath = type === 'image' ? 'Public/images' : 'Public/videos';
        cb(null, destPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

const upload = multer({ storage: storage });

export const uploadMedia = (req, res) => {
    upload.single('videos')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({ message: err.message });
        } else if (err) {
            return res.status(400).json({ message: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded." });
        }

        const filePath = req.file.filename;

        const query = "INSERT INTO videos (video) VALUES (?)";

        db.query(query, [filePath], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Error inserting file into database." });
            }
            res.status(200).json({ message: "File uploaded and inserted into database successfully.", filePath: filePath });
        });
    });
};

export default uploadMedia;
