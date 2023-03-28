// import React, { useState, useEffect } from "react";
// const API_KEY = import.meta.env.VITE_APP_API_KEY;

// const Card = ({list}) => {

//     const[nutritionList, setNutritionList] = useState([])
//     const [maxCalorie, setMaxCalorie] = useState({calories: 0, imageUrl: '', title: ''});
//     const[maxFat, setMaxFat] = useState({fat: 0, imageUrl: '', title: ''});
//     const[maxCarbs, setMaxCarbs] = useState({carbs: 0, imageUrl: '', title: ''});
//     const recipeIds =  list ? list.map((recipe) => recipe.id) : [];

//     console.log("my list is:")
//     console.log(list)


//     useEffect(() =>{

//         console.log("my recipe ids are")
//         console.log(recipeIds)

//         console.log("within card list")
//         console.log(list)

//     const getRecipeNutrition = async () => {

//             let query = `https://api.spoonacular.com/recipes/informationBulk?apiKey=${API_KEY}&ids=${recipeIds.join(',')}&includeNutrition=true`
//             console.log(query)
//             console.log("ids?", recipeIds)
//             //now make the call to the api
//             const response = await fetch(query);
//             const json = await response.json();

//             console.log("json", json[0])
//             setNutritionList(json.data);
//     }
//     getRecipeNutrition().catch(console.error);
//     console.log("nutritionList in card:", nutritionList);

//     },[recipeIds]);

   
//     const finalNutrition = nutritionList ? nutritionList.map(recipe => {
//             const nutrition = recipe.nutrition.nutrients || [];
//             const calories = nutrition.find(nutrient => nutrient.name ==='Calories')
//             const fat = nutrition.find(nutrient => nutrient.name ==='Fat')
//             const carbs = nutrition.find(nutrient => nutrient.name ==='Carbohydrates')
//             console.log("nutritionList:", nutritionList);

//             return {
//                 id: recipe.id,
//                 title: recipe.title,
//                 imageUrl: recipe.image,
//                 calories: calories? calories.amount : 0,
//                 fat: fat? fat.amount: 0,
//                 carbs: carbs? carbs.amount : 0
//             };
//     }) : [];
    
//     useEffect(() => {

//         console.log("within second useeffect")
//         console.log("finalNutrition:", finalNutrition);

//     let calorie = finalNutrition[0];
//     let carb = finalNutrition[0];
//     let fat = finalNutrition[0];
//     console.log(finalNutrition)

//     finalNutrition.forEach(recipe => {
//         if (recipe.calories > calorie) {
//                 calorie = recipe;
//                 console.log("hi from foreach")
//                 console.log(recipe)
//             }
//             if (recipe.carb > carb) {
//                 carb = recipe.carb;
//             }
//             if (recipe.fat > fat) {
//                 fat = recipe.fat;
//             }});
//             setMaxCalorie(calorie);                
//             setMaxFat(fat)
//             setMaxCarbs(carb);      
//     },[finalNutrition])
    
//     return (
//         <div className="cards">
//             <div className = "card_carbs">
//                 <h2 className="card_title">Highest Carbs</h2>
//                 <img src = {maxCarbs?.imageUrl?.trim()} alt = {maxCarbs?.title} className = "icon"></img>
//                 <p>{maxCarbs.title}</p>
//                 <p>{maxCarbs.carbs}</p>
//             </div>

//             <div className = "card_fat">
//                 <h2 className="card_title">Highest Fat</h2>
//                 <img src = {maxFat?.imageUrl?.trim()} alt = {maxFat?.title} className = "icon"></img>
//                 <p>{maxFat.title}</p>
//                 <p>{maxFat.fat}</p>
//             </div>

//             <div className = "card_calories">
//             <h2 className="card_title">Highest Calories</h2>
//             <img src = {maxCalorie?.imageUrl?.trim()} alt = {maxCalorie?.title} className = "icon"></img>
//             <p>{maxCalorie.title}</p>
//             <p>{maxCalorie.calories}</p>
//         </div>
//     </div>
//   );
// }

// export default Card;