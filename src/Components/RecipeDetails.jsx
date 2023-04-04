import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const API_KEY = import.meta.env.VITE_APP_API_KEY;


const RecipeDetails = () => {
    let params = useParams();
    const [nutritionList, setNutritionList] = useState(null);
    console.log(params);
    console.log("in recipe, my id is:", params.id)

    useEffect(()=> {
    const getRecipeNutrition = async () => {

        let query = `https://api.spoonacular.com/recipes/informationBulk?apiKey=${API_KEY}&ids=${params.id}&includeNutrition=true`
        console.log(query)
        console.log("ids?", params.id)
        //now make the call to the api
        const response = await fetch(query);
        const json = await response.json();
            
        console.log("json", json)
        console.log("json.data", json.data);
        setNutritionList(json);
    }
    getRecipeNutrition().catch(console.error);
    console.log("nutritionList in card:", nutritionList);
},[]);
        

    return (
        <div>
            {nutritionList? (
                 nutritionList.map((recipe) =>  {
                    return(
                 <div>
                    <h1>{recipe.title}</h1>
                    <img src = {recipe.image} />
                    <p>{recipe.summary}</p>
                 </div>
     ) })) : null
            }
        </div>
    )

}

export default RecipeDetails;