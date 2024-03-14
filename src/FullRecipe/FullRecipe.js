import React, { useEffect, useState, useContext }from "react";
import { RecipeContext } from "../App";
import Header from "../Header/Header";
import './FullRecipe.css';
import axios from "axios";


const FullRecipe = () => {
    
    const { mealId } = useContext(RecipeContext);

    // Local states for all the variables the API gives given a mealID: Name, Photo, ingredients, measure of each ingredient and directions.
    const [recipeName, setRecipeName] = useState('');
    const [recipePhoto, setRecipePhoto] = useState('');
    const [direction, setDirection] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [measures, setMeasures] = useState([]);
    
    // Fetch full meal details from API
    // Sample url: www.themealdb.com/api/json/v1/1/lookup.php?i=52772
    // It is asyncronous to make sure the webpage will render and wait for the answer of the API
    async function getRecipeData() {
        try {
            const recipeData = await axios.get(`https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=${mealId}`);
            return recipeData.data.meals[0];
          } catch (error) {
            console.error(error);
          }
    }

    // Render different recipe when mealId changes
    const regIngredient = "strIngredient";
    const regMeasure = "strMeasure";
    let ingredient = [];
    let measure = [];

    useEffect(() => {
        getRecipeData().then(data => {
            
            // Set recipe photo, name and direction
            setRecipeName(data.strMeal);
            setRecipePhoto(data.strMealThumb);
            setDirection(data.strInstructions);
            
            // Filter and set valid ingredients
            Object.keys(data).map(ingredientKey => {
                if (ingredientKey.match(regIngredient) && data[ingredientKey] !== '' && data[ingredientKey]) {                 
                    const newIngredient = data[ingredientKey];
                    ingredient.push(newIngredient);
                    setIngredients(ingredient);
                }
            });

            // Filter and set valid measures
            Object.keys(data).map(ingredientKey => {
                if (ingredientKey.match(regMeasure) && data[ingredientKey] !== '' && data[ingredientKey]) {                 
                    const newMeasure = data[ingredientKey];
                    measure.push(newMeasure);
                    setMeasures(measure);
                }
            });
        })
    }, [mealId])


    return (
        <>
        <Header />
        <section id="container">
            {/* Recipe photo */}
            <div id="photo">
                <img src={recipePhoto} alt={recipeName} />
            </div>
            {/* Detailed Recipe */}
            <div id="instruction">
                <h1>{recipeName}</h1>
                {/* Ingredients */}
                <div className="ingredients">
                    <table>
                        <tbody>
                            <tr>
                                <th>Ingredients</th>
                                {ingredients.map((obj,index) => <td key={index}>{obj}</td>)}
                            </tr>
                            <tr>
                                <th>Measures</th>
                                {measures.map((obj,index) => <td key={index}>{obj}</td>)}
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* Directions */}
                <div className="directions">
                    <h3 id="directions">Directions</h3>
                    <p>{direction}</p>
                </div>
            </div>
        </section>
        </>
    )
}

export default FullRecipe