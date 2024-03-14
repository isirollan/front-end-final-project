import { React, useEffect, useState, useContext } from "react";
import { RecipeContext } from "../App";
import { useNavigate } from "react-router-dom";
import Home from "../Home/Home";
import axios from "axios";
import "./RecipeGrid.css";


const RecipeGrid = () => {
    // Importing global states
    const { setMealId, searchInput } = useContext(RecipeContext);

    // creating function to navigate to recipe details
    const navigate = useNavigate();

    // This is the state that stores all the returned recipes to show in the grid - that can be further propogated
    const [returnedRecipes, setReturnedRecipes] = useState(['']);

    // Adds space and capitalizes the first letter for display on top of the page
    const displaySearchInput = (input) => {

        
        if (input == '') {
            let emptymessage = "...nothing yet, go ahead and search."
            return emptymessage
        }      
        else {
            let temp_input = input
            temp_input = temp_input.replace('_',' ')
            temp_input = temp_input.replace(',',', ')
            return temp_input
        }
    }
    
    // Function that makes the API call on the basis of the search input
    const getRecipeData = async () => {
        
        if (typeof(searchInput) !== 'string' || searchInput === '') {
            console.log('Waiting for input...')
            return null
        } else {
            try {
                const allrecipes = await axios.get(`https://www.themealdb.com/api/json/v2/9973533/filter.php?i=${searchInput}`);
                return allrecipes.data.meals

            } catch (error) {
                console.error(error);
          }
        }
    };

    // Text that is displayed if no results are found. 
    const emptyDisplay = () => {
        return (<>
            <p className="no-results">Sorry, no results for your search. Try again!</p>
        </>)
    }

    useEffect(() => {
        
        // Runs the API call and sets the state to the returned array - dependency array is currently empty
        getRecipeData().then(mealdata => {
            setReturnedRecipes(mealdata);
        })

    }, [searchInput] )

    // When user click on specific meal, set mealId and redirect to full recipe page
    const handleClick = (e) => {
        e.preventDefault();
        setMealId(e.target.value);
        navigate("/recipe");
    }


    return (
        <>
            <Home />
            <h1>Results for <span>{displaySearchInput(searchInput)}</span></h1>
            <div className="grid-container"> 
                {/* Returns card for each item in the list returned by API */}
                {returnedRecipes===null ? emptyDisplay() :  (returnedRecipes.map((recipe) => {
                    return (        
                        <div className="grid-item">
                            <ul>
                                <li key={recipe.idMeal}>
                                    <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                                    <p>{recipe.strMeal}</p>
                                    <button value={recipe.idMeal} onClick={handleClick}>I want to make this!</button>
                                </li> 
                            </ul>
 
                        </div>
                        
                    )
                })) 
                }
        </div>
        </>

    )
}

export default RecipeGrid