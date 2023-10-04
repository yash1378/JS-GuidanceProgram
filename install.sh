#!/bin/bash

# Install backend dependencies
echo "Installing backend dependencies..."
cd C:/Users/HP/Desktop/gprogram/backend/student # Replace with the actual path to your backend directory
npm install

# Install frontend dependencies
echo "Installing frontend dependencies..."

# Start the backend server
echo "Starting the backend server..."
nodemon server.js &

sleep 10
cd C:/Users/HP/Desktop/gprogram # Replace with the actual path to your frontend directory
npm install



# Wait for a moment to ensure the backend server has started


# Start the frontend server
echo "Starting the frontend server..."
npm run dev
