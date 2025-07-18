import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios"

const CartContext = createContext()
export const useCartContext = () => useContext(CartContext)

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([])
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [selectedItems, setSelectedItems] = useState([])
    const token = localStorage.getItem("token")
    const isLoggedIn = !!token

     useEffect(() =>{
        const fetchCart = async ()=>{
            if(!token){
                console.log("No token found")
                return
            }
            if(isLoggedIn){
                try {
                    const res = await axios.get("https://car-rental-y1mj.onrender.com/api/history/cart",{
                        headers: {Authorization: `Bearer ${token}`}
                    })
                    setCart(res.data.data)
                } catch (error) {
                    console.error("Failed to load",error)
                }
            } else{
            const storedCart = localStorage.getItem('cart')
            if(storedCart) setCart(JSON.parse(storedCart))
            }
        }
        fetchCart()
    }, [isLoggedIn, token])

    useEffect(() =>{
        if(!isLoggedIn){
        localStorage.setItem('cart', JSON.stringify(cart))}
    },[cart, isLoggedIn])

    const addtocart = async(movie) =>{
        if (isLoggedIn) {
            try {
                const res = await axios.post(
                    "https://car-rental-y1mj.onrender.com/api/history/cart",
                    { carId: movie._id },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setCart(res.data.data); 
            } catch (error) {
                console.error("Failed to add", error.response?.data || error.message);
            }
        } else {
            setCart(prev =>[...prev, movie])
        }
    }

    const removecart = async(movieID) =>{
        if (isLoggedIn) {
            try {
                const res = await axios.delete(
                    `https://car-rental-y1mj.onrender.com/api/history/cart/${movieID}`,
                    { headers: { Authorization: `Bearer ${token}`}}
                );
                setCart(res.data.data); 
            } catch (error) {
                console.error("Failed to remove", error.response?.data || error.message);
            }
        } else {
            setCart(prev => prev.filter(movie => movie._id !== movieID || movie.id !== movieID));

        }
    }

    const iscart = (movieID) =>{
        return cart.some(movie => movie._id === movieID || movie.id === movieID)
    }

    const buyNow = (movie) =>{
        setSelectedMovie(movie)
        setSelectedItems([])
    }

    const buyAll = (items)=>{
        setSelectedItems(items)
        setSelectedMovie(null)
    }

    const clearCart = async () => {
        if (isLoggedIn) {
            try {
                const cartIds = cart.map((item) => item._id || item.id);
                // Loop through all items and delete each one
                await Promise.all(
                    cartIds.map((id) =>
                        axios.delete(`https://car-rental-y1mj.onrender.com/api/history/cart/${id}`, {
                            headers: { Authorization: `Bearer ${token}` },
                        })
                    )
                );
                setCart([]);
            } catch (error) {
                console.error("Failed to clear cart:", error.response?.data || error.message);
            }
        } else {
            setCart([]);
            localStorage.removeItem('cart');
        }
    };    

    const value ={
        cart,
        addtocart,
        removecart,
        iscart,
        selectedMovie,
        setSelectedMovie,
        selectedItems,
        setSelectedItems,
        buyNow,
        buyAll,
        clearCart
    }

    return <CartContext.Provider value= {value}>
        {children}
    </CartContext.Provider>
}

