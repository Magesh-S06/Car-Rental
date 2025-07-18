import MovieCard from "../components/MovieCard"
import {useState, useEffect} from "react"
import axios from 'axios'
import "../css/Home.css"


function Home(){
    const [searchQuery, setSearchQuery] = useState("")
    const [cars, setCars] = useState([])
    const [allCars, setAllCars] = useState([]);
    const[error, setError] = useState(null)
    const[loading, setLoading] = useState(true)

    useEffect(() =>{
        const fetchCars = async () =>{
            try{
                const res = await axios.get("https://car-rental-y1mj.onrender.com/api/cardata")
                setCars(res.data.data)
                setAllCars(res.data.data)
                setError(null)
            } catch(err){
                console.log(err)
                setError("Failed to Load Cars...")
            }
            finally{
                setLoading(false)
            }
        }
        fetchCars()
    },[])

   const handleSearch = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!searchQuery.trim()) {
      setCars(allCars); 
    } else {
      const filtered = allCars.filter((car) =>
        car.make.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setCars(filtered);
    }
  }, [searchQuery, allCars]); 
  
  
    return <div className="home">
        <form onSubmit={handleSearch} className="search-form">
            <input type="text" 
            className="search-input" 
            placeholder="Search for cars..."  
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}/>
            <button type="submit" className="search-btn">Search</button>
        </form> 
        {error && <div className="error-message"> <center> Error Wait for sometime...</center></div>}
        {loading ? (
            <div class="loader">
            <span class="loader-text">loading</span>
                <span class="load"></span>
            </div>
            ): 
            (
              <div className="movies-grid">
                {cars.map((car, index) => (
                  <div
                    key={car.id}
                    className="movie-card-animated"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <MovieCard movie={car} />
                  </div>
                ))}
              </div>
            )}
    </div>
}

export default Home