import "../css/MovieCard.css"
import {useMovieContext} from "../contexts/MovieContext.jsx"
import { useCartContext } from "../contexts/AddCartContext.jsx"
import { useNavigate } from "react-router-dom"
import carImages from "../utils/ImageLoader.js"

function MovieCard({movie}){
    const {isfav, addtofav, removefav} = useMovieContext()
    const {iscart, addtocart,buyNow,  removecart} = useCartContext()
    const favorite = isfav(movie.id || movie._id)
    const cart = iscart(movie.id || movie._id)
    const navigate = useNavigate()
    const showremoveButton = location.pathname==="/cart" 
    const showaddButton=location.pathname!=="/cart" 
    const showbuyButton = location.pathname!="/buypage"

    function FAVCLICK(e){
        e.preventDefault()
        if (favorite) removefav(movie._id)
        else addtofav(movie)
    }

    function ADDTOCARTCLICK(e){
        e.preventDefault()
       if(!cart) addtocart(movie)
        
    }

    function REMOVECART(e){
        e.preventDefault()
        if(cart) removecart(movie._id)
        
    }

    function BUYPAGE(){
        buyNow(movie)
        navigate("/buypage")
    }

    const imageKey = `${movie.make.name} ${movie.name}`.replace(/\s+/g, ' ');
    const movieImage = carImages[imageKey]

    return <div className="movie-card">
        <div className="movie-poster">
            <img src={movieImage} alt={movie.name}/>
            <div className="movie-overlay">
            <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={FAVCLICK}>
            ♡</button>
                </div>
        </div>
        
        <div className="movie-info">
            <h3>{movie.make.name +" " +movie.name}</h3>
            <p>₹{movie.price}</p>
            {showbuyButton && <button onClick={BUYPAGE}>Buy Now</button>}
            { showaddButton &&<button className={`cart-btn ${cart ? "active": ""}`} onClick={ADDTOCARTCLICK}>{cart? "Added to Cart✅":"Add to cart"}</button>}
            {showremoveButton && cart? <button className={`cart-btn ${cart ? "active": ""}`} onClick={REMOVECART}>Remove from cart</button>:null}
        </div>
    </div>
}

export default MovieCard 