// Load environment variables
require('dotenv').config();

const functions = require('@google-cloud/functions-framework');
const express = require("express");
const databaseService = require('./database-service.js');
const cors = require('cors');

// Initialize counter for tracking downloads
let picturesToDownload = 0;

// Create an Express app for local development
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Main function handler for Cloud Functions
functions.http('picturesApi', async (req, res) => {
    // Enable CORS
    res.set('Access-Control-Allow-Origin', '*');
    
    if (req.method === 'OPTIONS') {
        // Handle preflight requests
        res.set('Access-Control-Allow-Methods', 'GET, POST');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
        return;
    }
    
    // Handle POST request for adding pictures
    if (req.method === 'POST' && req.path === '/addPictures') {
        const body = req.body;
        console.log(`Post for Id: ${body['_id']}`);
        console.log(`Waiting Queue: ${picturesToDownload}`);
        
        try {
            const result = await databaseService.handlePictures(body);
            res.status(200).json(result);
        } catch (error) {
            console.error('Error processing pictures:', error);
            res.status(500).json({
                success: false,
                message: 'Error processing pictures',
                error: error.message
            });
        }
        return;
    }
    
    // Handle GET request for status
    if (req.method === 'GET' && (req.path === '/' || !req.path)) {
        console.log(`Client asked for Status: ${picturesToDownload}`);
        res.status(200).json({
            "picturesToDownload": picturesToDownload
        });
        return;
    }
    
    // Handle 404 for any other routes
    res.status(404).json({
        success: false,
        message: 'Not Found'
    });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 8083;
    
    // Set up routes for local Express server
    app.post("/addPictures", async (req, res) => {
        const body = req.body;
        console.log(`Post for Id: ${body['_id']}`);
        console.log(`Waiting Queue: ${picturesToDownload}`);
        
        try {
            const result = await databaseService.handlePictures(body);
            res.status(200).json(result);
        } catch (error) {
            console.error('Error processing pictures:', error);
            res.status(500).json({
                success: false,
                message: 'Error processing pictures',
                error: error.message
            });
        }
    });

    app.get("/", (req, res) => {
        console.log(`Client asked for Status: ${picturesToDownload}`);
        res.status(200).json({
            "picturesToDownload": picturesToDownload
        });
    });
    
    // Start local server
    app.listen(port, () => {
        console.log(`#############################################`);
        console.log(`pictures-to-gcloud-api: listening on port ${port}`);
        console.log(`#############################################`);
    });
}
