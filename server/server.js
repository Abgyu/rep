const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

dotenv.config(); // Load environment variables
connectDB(); // Connect to MongoDB

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded requests

// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/businesses', require('./routes/businessRoutes'));
app.use('/api/owners', require('./routes/ownerRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/business-types', require('./routes/businessTypeRoutes'));
app.use('/api/cities', require('./routes/cityRoutes'));

// Dashboard Route (haddii loo baahdo)
app.use('/dashboard', require('./routes/dashboardRoutes'));

// Error Handling Middlewares
app.use(notFound); // Handle 404 errors
app.use(errorHandler); // Handle other errors

// Start the server
const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Handle EADDRINUSE error
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} is already in use. Trying a different port...`);
        server.listen(0, () => {
            console.log('Server running on a free port.');
        });
    } else {
        console.error('Server error:', err);
    }
});
