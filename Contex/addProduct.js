import db from '../db.js'; // Ensure the path is correct
import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Set storage engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB file size limit
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('image'); // Ensure 'image' is the name attribute in your form

function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Route handler for adding product
export const addproduct = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (req.file === undefined) {
            return res.status(400).json({ error: 'No file selected!' });
        }

        const { title, description, price, oldPrice, category } = req.body;
        const imagePath = req.file.path; // This is the path where the image is stored
        const insertQuery = "INSERT INTO products (title, description, price, oldPrice, image, category) VALUES (?, ?, ?, ?, ?, ?)";
        const values = [title, description, price, oldPrice, imagePath, category];

        db.query(insertQuery, values, (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            return res.status(200).json({ message: "Product added successfully", imagePath: imagePath });
        });
    });
};

// Route handler for updating product


// Add the routes
 export const updateProduct = (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
  
      const { title, description, price, oldPrice, category } = req.body;
      const { id } = req.params;
      let updateQuery = "UPDATE products SET title = ?, description = ?, price = ?, oldPrice = ?, category = ?";
      const values = [title, description, price, oldPrice, category];
  
      if (req.file) {
        const imagePath = req.file.path;
        updateQuery += ", image = ?";
        values.push(imagePath);
      }
  
      updateQuery += " WHERE id = ?";
      values.push(id);
  
      db.query(updateQuery, values, (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        return res.status(200).json({ message: "Product updated successfully" });
      });
    });
  };
  

