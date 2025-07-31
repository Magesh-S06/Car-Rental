# Car Rental

A Car rental application which helps to browse and rent cars. 

## Features

- **Browsing Cars**: Home page containing all the available cars and prices. 
- **Personalized Favorites**: Adding certain cars to favorite based on liking. 
- **User Authentication**: Secure and personalized experience for each user.
- **Responsive UI**: Seamless usage on desktop devices.

## Tech Stack

- **Frontend**: React.js
- **Database**: Mongo Atlas
- **Authentication**: JWS Tokens
- **Paymeny Integration**: Razorpay

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm 
- Mongo Atlas account
- Razorpay account

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/Magesh-S06/EAGLE-GPT.git
   ```

2. Navigate to the project directory:
   ```
   cd Car Rental
   ```

3. Install dependencies:
   #### Frontend: 
   ```
   cd react_frontend
   ```
   ```
   npm install
   ```
   #### Backend:
   ```
   npm install
   ```

4. Set up environment variables:
   Create a `.env.local` file in the root directory to add Mongo and RazorPay credentials:
   ```
   MONGO_URI=your_mongo_cluster_id
   PORT=port_number || 5000
   JWT_KEY=your_custom_jwt_key
   SALT=salt_number
   RAZORPAY_KEY=your_razorpay_key
   RAZORPAY_SECRET=your_razorpay_secrey
   ```
   Create a `.env.local` file in the react_frontend directory to add the Razorpay credentials:
   ```
   VITE_RAZORPAY_KEY=your_razorpay_key
   ```

5. Run the development server:
   ```
   npm run dev
   ```

6. Open [http://localhost:5173](http://localhost:5173) in your browser to see the application.
