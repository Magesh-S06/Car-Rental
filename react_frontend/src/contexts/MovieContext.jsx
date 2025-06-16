import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const MovieContext = createContext()
export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {
    const [favorites, setFavorites] = useState([])
    const token = localStorage.getItem("token")
    const isLoggedIn = !!token

    useEffect(() =>{
        const fetchFavorites = async () =>{
            if(!token){
                console.log("no token found")
                return
            }
            if(isLoggedIn){
                try {
                    const res = await axios.get("http://localhost:5000/api/history/fav",{
                        headers: {Authorization: `Bearer ${token}`}
                    })
                    setFavorites(res.data.data)
                } catch (error) {
                    console.error("Failed to load", error)
                }
            } else {
            const storedFav = localStorage.getItem("favorites")
            if(storedFav) setFavorites(JSON.parse(storedFav))}
        }
        fetchFavorites()
    }, [isLoggedIn,token])

    useEffect(() =>{
        if(!isLoggedIn){
        localStorage.setItem('favorites', JSON.stringify(favorites))}
    },[favorites,isLoggedIn])

    const addtofav = async(movie) =>{
            if (isLoggedIn) {
                try {
                    const res = await axios.post(
                        "http://localhost:5000/api/history/fav",
                        { carId: movie._id },
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    setFavorites(res.data.data); 
                } catch (error) {
                    console.error("Failed to add", error.response?.data || error.message);
                }
            } else {
                setFavorites(prev => [...prev, movie]);
            }
    }

    const removefav = async(movieID) =>{
        if (isLoggedIn) {
            try {
                const res = await axios.delete(
                    `http://localhost:5000/api/history/fav/${movieID}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setFavorites(res.data.data); 
            } catch (error) {
                console.error("Failed to remove", error.response?.data || error.message);
            }
        } else {
            setFavorites(prev => prev.filter(movie => movie._id !== movieID || movie.id !== movieID));

        }
    }

    const isfav = (movieID) =>{
        return favorites.some(movie => movie._id === movieID || movie.id === movieID)
    }

    const value ={
        favorites,
        addtofav,
        removefav,
        isfav
    }

    return <MovieContext.Provider value= {value}>
        {children}
    </MovieContext.Provider>
}

