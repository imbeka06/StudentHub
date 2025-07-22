const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { Pool } = require('pg');
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

//loading .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

//PostgreSQL config
const db = require('./config/db');
app.set('db', db);

//Firebase Admin Initialization
const serviveAccount = require('./firebase-config.json');
admin.initializeApp({
    credential: admin.credential.cert(serviveAccount),
});

//Routes
app.get('/ping', (req, res) => {
    res.json({message: 'Backend is alive'});
});

// start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});