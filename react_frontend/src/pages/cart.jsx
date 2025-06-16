import "../css/Favorites.css"
import { useCartContext } from "../contexts/AddCartContext"
import MovieCard from "../components/MovieCard"
import { useNavigate } from "react-router-dom"

function AddtoCart (){
    const navigate = useNavigate()
    const {cart, setSelectedItems} = useCartContext()

    function BUYPAGE(){
        setSelectedItems(cart)
    navigate("/buypage") 
    }

    if (cart && cart.length>0){
        return  (
            <div className="favorites">
                <h2>Your Cart</h2>
                <div className="movies-grid">
          {cart.map((movie, index) => (
            <div
              key={movie._id || movie.id}
              className="movie-card-animated"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
        <div className="buy-btn-container">
          <button className="buy-all-btn" onClick={BUYPAGE}>
            Buy All Items
          </button>
        </div>
      </div>
    )
    }

    return <div className="fav-empty">
        <h2>No Cars added to cart yet </h2>
    </div>
}

export default AddtoCart