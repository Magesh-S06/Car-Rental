import { useCartContext } from "../contexts/AddCartContext"
import { useOrderContext } from "../contexts/OrderContext"
import { useNavigate } from "react-router-dom"
import MovieCard from "../components/MovieCard"
import "../css/Buy.css"
import axios from "axios"

function Buy(){
    const {cart, selectedMovie, selectedItems, clearCart} = useCartContext()
    const {placeOrder} = useOrderContext()
    const movieToShow = selectedMovie? [selectedMovie]:selectedItems
    const navigate = useNavigate()
    //console.log(import.meta.env.VITE_RAZORPAY_KEY)

    const loadRazorpay = (src) =>
        new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = () => resolve(true);
          script.onerror = () => resolve(false);
          document.body.appendChild(script);
        });
    
    const handleBuy = async(e)=> {
        e.preventDefault()
        if(movieToShow.length===0){
            alert("No items selected for purchase");
            return
        }
        const total = movieToShow.reduce((sum, item) => sum + item.price, 0);

    const res = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load");
      return;
    }

    
        try {
            const { data } = await axios.post("https://car-rental-y1mj.onrender.com/api/razorpay/create-order", {
                amount: total,
              });
        
              const options = {
                // key: "rzp_test_RTT67mmolf8Qca",
                key: import.meta.env.VITE_RAZORPAY_KEY,
                amount: data.order.amount,
                currency: data.order.currency,
                name: "Car Booking",
                description: "Booking Payment",
                order_id: data.order.id,
                handler: async () => {
                  await placeOrder(movieToShow.map((movie) => movie._id || movie.id));
                  await clearCart();
                  alert("Payment successful and order placed");
                  navigate("/order");
                },
                prefill: {
                  name: "Customer",
                  email: "test@example.com",
                },
                theme: {
                  color: "#3399cc",
                },
              };
        
              const paymentObject = new window.Razorpay(options);
              paymentObject.open();
            // await placeOrder(movieToShow.map((movie)=> movie._id || movie.id))
            // alert("Purchase successful")
            // await clearCart()
            // navigate("/order")
        } catch (err) {
            console.error("Purchase Failed",err)
            alert("Something went wrong during purchase.")
        }
    }
    return (
        <>
        <h2>Buy Page</h2>
        <div className="buy-page-container">
            <div className="cart-section">
            {movieToShow.length > 0 ? (
                movieToShow.map((movie) => (
                    <MovieCard movie={movie} key={movie._id || movie.id}/>
                    ))): (
                <p>No items selected for purchase.</p>
            )}
            </div>
            <div className="form-section">
                <form onSubmit={handleBuy}>
                <input type="text" placeholder="Full Name" required />
                <input type="email" placeholder="Email" required /> 
                <button type="submit">Confirm Booking</button>
                </form>
            </div>
        </div>
        </>
    );
}

export default Buy