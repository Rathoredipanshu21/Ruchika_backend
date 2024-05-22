import express from 'express';
import UserRouter from './Router/UserRouter.js';
import BannerRouter from './Router/upload.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import Addproduct from './Router/addproductroute.js'
import Videos from './Router/VideoRouter.js'
import Aderss from './Router/AdressRoute.js'
import oder from './Router/OderRoute.js'

// Initialize Express app
const app = express();
const port = 5000;

// Set up CORS
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001", "http://192.168.1.8:3001", "http://192.168.1.10:3000"], 
    credentials: true // Enable CORS credentials
}));

// Middleware to parse JSON
app.use(express.json());

// Get __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Serve static files
app.use('/Public/images', express.static(path.join(__dirname, 'Public/images')));
app.use('/Public/uploads', express.static(path.join(__dirname, 'Public/uploads')));
app.use('/Public/videos', express.static(path.join(__dirname, 'Public/videos')));

// Routes
app.use('/api/', UserRouter);
app.use('/upload', BannerRouter);
app.use('/api',Addproduct);
app.use('/api' , Videos)
app.use('/api' , Aderss)
app.use('/api' , oder)

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
