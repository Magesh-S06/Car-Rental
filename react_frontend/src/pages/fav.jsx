import "../css/Favorites.css"
import { useMovieContext } from "../contexts/MovieContext"
import MovieCard from "../components/MovieCard"

function Fav(){
    const {favorites} = useMovieContext()
   
    if (favorites && favorites.length>0){
        return  (
        <div className="favorites">
        <h2>Your Favs</h2>
        <div className="cars-grid">
          {favorites.map((movie, index) => (
            <div
              key={movie._id || movie.id}
              className="movie-card-animated"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
        )
    }
    return <div className="fav-empty">
        <h2>No favourite Cars yet </h2>
    </div>

}

export default Fav