// app.js

import express from 'express';
import cors from 'cors';
import pdfRoutes from './routes/pdfRoutes.js';
import dotenv from  "dotenv";
dotenv.config({ path: "./.env" });

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Use PDF processing routes
app.use('/api/pdf', pdfRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});