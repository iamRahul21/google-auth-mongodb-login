# Google Authentication with MongoDB

A simple Node.js application that provides user authentication using Google OAuth 2.0 through Firebase and stores user data in MongoDB. Features include login and signup via email and password, Google sign-in/sign-up, and password reset functionality.

## Features
- Email and password login and signup.
- Google OAuth 2.0 authentication.
- Password reset via email.
- User data stored in MongoDB.
- Session management with express-session.

## Installation

### Prerequisites
- Node.js and npm installed.
- MongoDB server running locally or a MongoDB Atlas account.
- Firebase project set up with OAuth 2.0 credentials.

### Clone the Repository
```bash
git clone https://github.com/iamRahul21/google-auth-mongodb-login.git
cd google-auth-mongodb-login
```

## Set Up Environment Variables
Create a `.env` file in the root directory with the following content:
```bash
PORT=3000
MONGODB_URI=your-mongodb-uri
FIREBASE_API_KEY=your-firebase-api-key
FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
FIREBASE_APP_ID=your-firebase-app-id
FIREBASE_MEASUREMENT_ID=your-firebase-measurement-id
```
## Install Dependencies
```bash
npm install
```
## Start the Application
```bash
node server.js
```