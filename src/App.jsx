import { useState, useEffect} from 'react'
import './App.css'
import SideNav from "../src/Components/SideNav"
// import Card from './Components/Card';
import Recipe from "./Components/Recipe"
const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
    
  const[list, setList] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
      const fetchAllRecipesData = async() => {
        let query = `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=10&tags=dessert`
        const response = await fetch(query);
        const json = await response.json();

        setList(json.recipes);
        console.log(json.recipes);

       
      };

      fetchAllRecipesData().catch(console.error);
      console.log("in app.jsx show me")
        console.log(list)
   // Send it to the compare function here: 
   // Save it to another list
    },[]);

    const searchItems = searchValue => {
      setSearchInput(searchValue);
  
      if(searchValue!== ""){
        const filteredData = list.filter((title) =>
        Object.values(title)
        .join("")
        .toLowerCase()
        .includes(searchValue.toLowerCase())
        )
  
        setFilteredResults(filteredData)
      } else {
        setFilteredResults(Object.keys(list));
      }
    };

  return (
    <div className="container">
     <SideNav />
     {/* {list.length > 0 ? <Card list = {list}/> : <p>Loading</p>} */}
      <div className='content'>
        <input 
        type = "text"
        placeholder="Search food!"
        onChange = {(inputString) => searchItems(inputString.target.value)}
        />

      {searchInput.length > 0 ? 
        filteredResults.map((recipe) => 
        <Recipe 
          id = {recipe.id}
          title = {recipe.title}
          image = {recipe.image} 
          vegetarian = {recipe.vegetarian}
          minutes = {recipe.readyInMinutes}
        />
     )
      : list.map((recipe) => 
        <Recipe 
        id = {recipe.id}
        title = {recipe.title}
        image = {recipe.image} 
        vegetarian = {recipe.vegetarian}
        minutes = {recipe.readyInMinutes}
      />
      )}

        </div>
      </div>
      )
    } 

export default App
