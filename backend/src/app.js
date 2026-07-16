const express = require ('express');
const cors = require ('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req , res) => {
    res.status(200).json({
        success: true,
        message: 'API is healthy',
        version: '1.0.0',
    });
});

module.exports = app;