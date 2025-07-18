# Clash Cars 

A Car Rental application which helps in buying fancy cars for rent.

## 🌟 Features

- **Car Showcase**: Checking the availability of cars and their prices.
- **Cart**: Adding cars in cart to buy.
- **Favorites**: Adding selected cars to favorites based on liking.
- **Order History**: Checking the order history afer payment.

## 🛠️ Tech Stack

- **Frontend**: React.js
- **Database**: MongoDB Database
- **Authentication**: JWT(Json Web Token)
- **Payment Gateway**: Razorpay

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Mongo Atlas account
- Razorpay account

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/daniel1kp/pantry-pro.git
   ```

2. Navigate to the project directory:
   #### Backend:
   ```
   cd 
   ```
   #### Frontend:
   ```
   cd react_frontend
   ```

4. Install dependencies:
   #### Backend/Frontend directory:
   ```
   npm install
   ```

6. Set up environment variables:
   Create a `.env` file in the root directory and add your Mongo Atlas, JWT and Razopay credentials:
   ```
   MONGO_URI=your_atlas_cluster_id
   PORT=your_port_number(5000)
   JWT_KEY=your_jwt_key
   RAZORPAY_KEY=your_razorpay_key
   RAZORPAY_SECRET=your_razorpay_secret
   ```

7. Run the Development server:
   ```
   npm run dev
   ```

8. Open [http://localhost:5000](http://localhost:5000) in your browser to see the app.
