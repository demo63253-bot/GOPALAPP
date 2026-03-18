const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = '/app/data/jobs.json'; // Railway permanent storage

app.use(express.json());
app.use(express.static('public'));

// Create the data folder if it doesn't exist
if (!fs.existsSync('/app/data')) { fs.mkdirSync('/app/data', { recursive: true }); }

// Load Jobs
app.get('/api/jobs', (req, res) => {
    if (fs.existsSync(DATA_FILE)) {
        const data = fs.readFileSync(DATA_FILE);
        res.json(JSON.parse(data));
    } else {
        res.json([]);
    }
});

// Save Job
app.post('/api/jobs', (req, res) => {
    let jobs = [];
    if (fs.existsSync(DATA_FILE)) {
        jobs = JSON.parse(fs.readFileSync(DATA_FILE));
    }
    jobs.push(req.body);
    fs.writeFileSync(DATA_FILE, JSON.stringify(jobs, null, 2));
    res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));