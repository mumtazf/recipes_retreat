import React, { useState, useEffect, useCallback } from "react";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const Card = ({list}) => {

    const recipeIds =  list ? list.map((recipe) => recipe.id) : []
    const[nutritionList, setNutritionList] = useState(null)
    const [maxCalorie, setMaxCalorie] = useState({calories: 0, imageUrl: '', title: ''});
    const[maxFat, setMaxFat] = useState({fat: 0, imageUrl: '', title: ''});
    const[maxCarbs, setMaxCarbs] = useState({carbs: 0, imageUrl: '', title: ''});


    console.log("my list is:")
    console.log(list)

    console.log("my recipe ids are")
    console.log(recipeIds)

    useEffect(() =>{
    const getRecipeNutrition = async () => {
        if(nutritionList===null){
            let query = `https://api.spoonacular.com/recipes/informationBulk?apiKey=${API_KEY}&ids=${recipeIds.join(',')}&includeNutrition=true`
            console.log(query)
            //now make the call to the api
            const response = await fetch(query);
            const json = await response.json();

            setNutritionList(json);
            console.log("in card");
            console.log(json);
        }
    }
    getRecipeNutrition().catch(console.error);
    },[]);

    const finalNutrition = nutritionList ? nutritionList.map(recipe => {
        const nutrition = recipe.nutrition.nutrients;
        const calories = nutrition.find(nutrient => nutrient.name ==='Calories')
        const fat = nutrition.find(nutrient => nutrient.name ==='Fat')
        const carbs = nutrition.find(nutrient => nutrient.name ==='Carbohydrates')

        return {
            id: recipe.id,
            title: recipe.title,
            imageUrl: recipe.image,
            calories: calories? calories.amount : 0,
            fat: fat? fat.amount: 0,
            carbs: carbs? carbs.amount : 0
        };
    }) : [] ;

    /*Comparing the nutrition info of each recipe to find the ones with 
        highest calorie, fat, and carbs.
    */

        const maxCalorieFinder = useCallback(() => {
            const maxCalorie = finalNutrition.reduce((max, recipe) => {
                if(max == null || recipe.calories > max.calories){
                    return recipe;
                } else {
                    return max;
                }
            }, {calories:0});

            setMaxCalorie(maxCalorie);
        },[nutritionList]);

        const maxFatFinder = useCallback(() => {
                const maxFat = finalNutrition.reduce((max, recipe) => {
                    if(max == null || recipe.fat > max.fat){
                        return recipe;
                    } else {
                        return max;
                    }
                }, {fat:0});
    
                setMaxFat(maxFat);
            },[nutritionList]);

       
        const maxCarbsFinder = useCallback(() => {
                    const maxCarbs = finalNutrition.reduce((max, recipe) => {
                        console.log("in maxcarbs")
                        console.log(recipe)
                        if(max == null || recipe.carbs > max.carbs){
                            return recipe;
                        } else {
                            console.log('in max of maxcarbs else')
                            return max;
                        }
                    }, {carbs:0});
        
                    setMaxCarbs(maxCarbs);
        },[nutritionList]);

        useEffect(() => {
            maxCarbsFinder();
        },[finalNutrition]);
    
        useEffect(() => {
            maxFatFinder();
        }, [finalNutrition]);
    
        useEffect(() => {
            maxCalorieFinder();
        }, [finalNutrition]);

    return (
        <div className="cards">
            <div className = "card_calories">
                <h2 className="card_title">Highest Carbs</h2>
                <img src = {maxCarbs?.imageUrl?.trim()} alt = {maxCarbs.title} className = "icon"></img>
                <p>{maxCarbs.title}</p>
                <p>{maxCarbs.carbs}</p>
            </div>

            <div className = "card_fat">
                <h2 className="card_title">Highest Fat</h2>
                <img src = {maxFat?.imageUrl?.trim()} alt = {maxFat?.title} className = "icon"></img>
                <p>{maxFat.title}</p>
                <p>{maxFat.fat}</p>
            </div>

            <div className = "card_calories">
            <h2 className="card_title">Highest Calories</h2>
            <img src = {maxCalorie?.imageUrl?.trim()} alt = {maxCalorie?.title} className = "icon"></img>
            <p>{maxCalorie.title}</p>
            <p>{maxCalorie.calories}</p>
        </div>
        </div>
    )


}

export default Card;