import { useState } from "react";
import "./App.scss";
import axios from "axios";
import { Picture } from "./components/Picture";
import { Footer } from "./components/Footer";

export const App = () => {
  const [search, setSearch] = useState("")
  const [photos, setPhotos] = useState([])

  const searchImages = (e) => {
    e.preventDefault()
    if (!search){
      alert("Please enter a search term")
    }else{
      // Call API
      fetchImages()
    }
  }

  const fetchImages = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}?page=1&query=${search}&client_id=${import.meta.env.VITE_API_KEY}`
      const response = await axios.get(url)
      const { results } = response.data
      if  (results.length === 0) {
        alert("No images found, please try again")
        setSearch("")
      } else {
        console.log("API Response :", results);
        setPhotos(results)
      }
    } catch (error) {
      console.error("Error fetching images: ", error)
    }
  }

  return (
    <div className="search-container">
      <h1>Search Images With API</h1>
      <form onSubmit={searchImages}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search images here!" />
        <button type="submit">Search</button>
      </form>
      {/*Show Images Results */}
      <div className="search-result">
        {photos.map((data,index) => {
          return (
            <Picture {...data} key={index}/>
          )
        })}
      </div>
      <Footer/>
    </div>
  );
};
