import './css/App.css'
import Fav from "./pages/fav"
import Home from './pages/home'
import AddtoCart from './pages/cart'
import Buy from './pages/buy'
import Order from './pages/order.jsx'
import Navbar from "./components/Navbar"
import {Routes, Route, Navigate} from 'react-router-dom'
import {MovieProvider} from "./contexts/MovieContext.jsx"
import { CartProvider } from './contexts/AddCartContext.jsx'
import { OrderProvider } from './contexts/OrderContext.jsx'
import usePageTitle from "./contexts/UsePageTitle.jsx"
import Login from './components/Login/Login.jsx'
import Signup from './components/Signup/Signup.jsx'

function App() { 
const user = localStorage.getItem("token")
usePageTitle()

  return (
    <MovieProvider>
      <CartProvider>
        <OrderProvider>
      {user && <Navbar/>}
    <main className="main-content">
      <Routes>
        {user?(<>
        <Route path="/" element={<Home/>}/>
        <Route path="/fav" element={<Fav/>}/>
        <Route path="/cart" element={<AddtoCart/>}/>
        <Route path="/order" element={<Order/>}/>
        <Route path="/buypage" element={<Buy/>}/>
        </>):
          (
            <Route path="/" element={<Navigate replace to="/login" />} />
          )}
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </main>
    </OrderProvider>
    </CartProvider>
    </MovieProvider>
  )
}


export default App
