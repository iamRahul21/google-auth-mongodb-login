const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String }
});

const User = mongoose.model('User', userSchema);

// Endpoint for regular sign-up
app.post('/api/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });

        await newUser.save();
        res.status(201).send({ message: 'User created successfully!' });
    } catch (err) {
        console.error(err);
        res.status(400).send({ error: 'Error creating user. Email may already exist.' });
    }
});

// Endpoint for Google sign-in/sign-up
app.post('/api/google-signin', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).send({ error: 'Email is required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).send({ message: 'User already exists in MongoDB' });
        }

        const newUser = new User({ email, password: null });
        await newUser.save();
        res.status(201).send({ message: 'Google sign-in user saved to MongoDB!' });
    } catch (err) {
        console.error(err);
        res.status(400).send({ error: 'Error saving Google user to MongoDB' });
    }
});

// Endpoint to reset password
app.post('/api/reset-password', async (req, res) => {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
        return res.status(400).send({ error: 'Email and new password are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const result = await User.updateOne({ email }, { password: hashedPassword });

        if (result.nModified > 0) {
            res.status(200).send({ message: 'Password updated successfully!' });
        } else {
            res.status(404).send({ error: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Error updating password. Please try again.' });
    }
});

app.post('/api/update-password', async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        // Assuming you have a way to decode the token to get the user email or ID
        const email = decodeTokenToGetEmail(token); // Implement this function based on your logic

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await User.updateOne({ email }, { $set: { password: hashedPassword } });
        res.status(200).send('Password updated successfully');
    } catch (error) {
        console.error('Error updating password in MongoDB:', error);
        res.status(500).json({ error: 'Error updating password' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
