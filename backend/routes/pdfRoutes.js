// routes/pdfRoutes.js

import express from 'express';
import { uploadPDF, queryPDF } from '../services/pdfService.js';

const router = express.Router();


// Route to upload and process PDF
router.post('/upload', async (req, res) => {
    try {
        const { filename } = req.body; // Expecting filename in request body
        const result = await uploadPDF(filename);
        console.log(result)
        res.json(result);
    } catch (error) {
        console.error("Error uploading PDF:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post('/query', async (req, res) => {
    console.log(req.body)
    try {
        const { question } = req.body; // Expecting question in request body
        const result = await queryPDF(question);
        // const result="sending data"
        console.log(result)
        res.json({result});
    } catch (error) {
        console.error("Error querying PDF:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;