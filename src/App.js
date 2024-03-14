import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import RecipeGrid from './RecipeGrid/RecipeGrid';
import FullRecipe from './FullRecipe/FullRecipe';
import About from './About/About';
import Contact from './Contact/Contact';
import './styles/app.css';


export const RecipeContext = createContext();

// This Context set the state for a particular mealID and a ingredient to search
function App() {
  const [mealId, setMealId] = useState('52772');
  const [searchInput, setSearchInput] = useState('');

  return (
    <>
      <RecipeContext.Provider
        value={{
          mealId, setMealId,
          searchInput, setSearchInput,
        }}
      >
        {/*Setting all the pages to display */}
        <Router>

          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/result" element={<RecipeGrid />}></Route>
            <Route exact path="/recipe" element={<FullRecipe />}></Route>
            <Route exact path="/about" element={<About />}></Route>
            <Route exact path="/contact" element={<Contact />}></Route>
          </Routes>

        </Router>
      </RecipeContext.Provider>
    </>
  );
}

export default App;
