const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the frontend
app.use(express.static(path.join(__dirname, '..')));

// Mock data storage (replace with a database in a real-world scenario)
const enrolledParticipants = [];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.post('/enroll', (req, res) => {
    const { name, age, selectedBatch, fees } = req.body;

    console.log('Received enrollment request:', req.body);

    // Basic validation
    if (!name) {
        return res.status(400).json({ success: false, message: 'Please enter your name.' });
    }

    if (!age || isNaN(age) || age < 18 || age > 65) {
        return res.status(400).json({ success: false, message: 'Please enter a valid age between 18 and 65.' });
    }

    if (!selectedBatch) {
        return res.status(400).json({ success: false, message: 'Please select a batch.' });
    }

    if (!fees || fees !== '500') {
        console.log('Fees:', fees);
        return res.status(400).json({ success: false, message: 'Please deposit exactly 500 Rs.' });
    }

    // Store data in the mock database
    enrolledParticipants.push({ name, age, selectedBatch, fees });

    console.log('Enrollment successful:', { name, age, selectedBatch, fees });

    // Return response to the frontend
    res.json({ success: true, message: 'Enrollment successful' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
