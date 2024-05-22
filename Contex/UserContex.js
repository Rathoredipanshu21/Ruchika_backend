import db from "../db.js"; // Assuming db is properly configured to export a connection
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import express from 'express'; // Proper import of express

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

export const register = (req, res) => {
    const { username, email, password } = req.body;
console.log(req.body)
    // Check if passwords match


    const insertQuery = "INSERT INTO user (email, password, username) VALUES (?, ?, ?)";
    const values = [email, password, username];

    db.query(insertQuery, values, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json({ message: "User registered successfully" });
    });
};


export const getproduct = (req, res) => {
    const selectQuery = 'SELECT * FROM products';

    db.query(selectQuery, (err, results) => { 
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json({ message: 'Data fetched successfully', data: results }); 
    });
};




 // Middleware to parse JSON bodies


 export const login = (req, res) => {
    const q = "SELECT * FROM user WHERE email = ?";
    db.query(q, [req.body.email], (err, data) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } 
        if (data.length === 0) {
            return res.status(400).json({ error: "User not found" });
        }
        if (req.body.password !== data[0].password) {
            return res.status(401).json({ error: "User credentials do not match" });
        }
        const token = jwt.sign({ id: data[0].id }, "secretkey");
      
        console.log("JWT Key:", token); // Logging the JWT key
        
        const { password, ...others } = data[0];
        res.cookie("accessToken", token, { httpOnly: true }).status(200).json({ token, ...others });
    });
};



