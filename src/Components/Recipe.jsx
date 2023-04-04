import { Link } from "react-router-dom";

const Recipe = ({id,title,image,vegetarian,minutes}) => {
console.log("in recipe, my id is:", id)
    return(
        <div>
    <li className = "main-list" key = {id}>
        <div key = {id}>
        <Link to = {`/RecipeDetails/${id}`} key = {id}>
        <h3 className="recipe_title">{title}</h3>
        </Link> 
          <img src = {image} alt = {title}/>
          <p>{vegetarian? "Vegetarian": "Not vegetarian"}</p>
          <p>Ready in minutes: {minutes}</p>
        </div> 
    </li>

        </div>
    )
}

export default Recipe;