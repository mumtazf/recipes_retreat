import { useState, useEffect} from 'react'
import './App.css'
import SideNav from "../src/Components/SideNav"
import Card from "../src/Components/Card"
const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
    
  const[list, setList] = useState([]);

    useEffect(() => {
      const fetchAllRecipesData = async() => {
        let query = `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=2&tags=dessert`
        const response = await fetch(query);
        const json = await response.json();

        setList(json.recipes);
        console.log(json.recipes);

        console.log("hi")
        console.log(list)
      };

      fetchAllRecipesData().catch(console.error);
     
   // Send it to the compare function here: 
   // Save it to another list
    },[]);


  return (
    <div className="container">
     <SideNav />
     <Card list = {list}/>
      <div className='content'>
      {list.map((recipe) => (
        <div key = {recipe.id}>
          <h3>{recipe.title}</h3>
          <img src = {recipe.image} alt = {recipe.title}/>
          <p>{recipe.summary}</p>
          </div>
      ))}

      </div>
    </div>
  )
}

export default App
