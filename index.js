// app.js or server.js
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const db = require('./db'); // adjust the path to where your db.js file is located

app.use(cors());
app.use(express.json());
// Route to get all items

app.get('/', (req, res) => {
    res.json({ message: 'Server is working' });
})

app.get('/items', async (req, res) => {
    try {
        // Query to fetch all items
        const [rows] = await db.query('SELECT * FROM Items');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Failed to fetch items' });
    }
});


app.get('/item/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM Items WHERE id = ?', [id]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(result);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Failed to fetch items' });
    }
});


app.get('/users', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Users');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Failed to fetch items' });
    }
});

app.get('/user/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM Users WHERE id = ?', [id]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(result);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Failed to fetch items' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
