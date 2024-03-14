import React from 'react';
import { useContext, useEffect } from "react";
import { RecipeContext } from "../App";
import { useNavigate } from "react-router-dom";
import "../styles/searchBar.css";
import axios from "axios";


const SearchBar = () => {

    const { searchInput, setSearchInput } = useContext(RecipeContext);

    const navigate = useNavigate();

    useEffect(() => {
        

    }, [searchInput])

    const handleSubmit = (e) => {
        e.preventDefault();
        let temp_variable = e.target.query.value;
        
        

        // Below will split up the query string into list so that each can be 'cleaned' independently
        let query_array = temp_variable.split(",")
        let cleanedSearchArray = []
        let cleanedSearchInput = []

        // Function that checks each query on the normal API - if the query term returns a null, it is not included the the cleaned array
        // Otherwise, it will be included in the new array which is then joined to form the final search string that will be passed to the API
        query_array.map(async (searchquery) => {
            searchquery = searchquery.trim()
            searchquery = searchquery.replace(' ', '_');
            searchquery = searchquery.toLowerCase();
                    
            try {
                const ingredientCheck = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchquery}`);
                if (ingredientCheck.data.meals !== null) {
                    cleanedSearchArray.push(searchquery)

                } if (ingredientCheck.data.meals == null) {
                    console.log('This element is not available in the API...')
                    }
                  
                    } catch (error) {
                    console.log('API error')
                    }

                cleanedSearchInput = cleanedSearchArray.join(",")
                setSearchInput(cleanedSearchInput)
            })
        

        
        setSearchInput(cleanedSearchInput);
        navigate("/result");
    }

    return (
        <>
            <div id="searchComponent">
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>

                <form id="searchBar" onSubmit={handleSubmit}>
                    <i className="material-icons" id ="searchIcon">search</i>

                    <input type="text" placeholder="Enter ingredients separated by a comma (e.g: chicken breast, rice, salt)" id="inputBox" name="query" />
                    
                    <button type="submit" className="submit" id="btn">Get cooking!</button>
                </form>
            </div>
            <div id="ingredient_images">
                <img src="https://www.themealdb.com/images/ingredients/Chicken.png" alt="chicken"/>
                <img src="https://www.themealdb.com/images/ingredients/Salmon.png" alt="salmon"/>
                <img src="https://www.themealdb.com/images/ingredients/Spinach.png" alt="spinach"/>
                <img src="https://www.themealdb.com/images/ingredients/Lime.png" alt="lime"/>
                <img src="https://www.themealdb.com/images/ingredients/Cheese.png" alt="cheese"/>
            </div>
        </>
    );
}

export default SearchBar;