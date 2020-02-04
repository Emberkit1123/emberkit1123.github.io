const apiKey = "d6981e55";

const searchButton = document.querySelector("#search-button");
const recipeResults = document.querySelector("#recipe-results");
const instructions = document.querySelector("#instructions");
const ingredients = document.querySelector("#ingredients");
const makeRecipe = document.querySelector("#make-recipe");
const saveRecipe = document.querySelector("#save-recipe");
const ingredient = document.querySelector(".ingredient");
const checkbox = document.querySelector(".ingredientName-checkbox");

let ingredientList = [];
let recipeList = {};
let recipe = {};
let recipeInstructions = "";

let result = {};

searchButton.addEventListener("click", async function(){
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/random.php`);
    console.log(response);
    const result = response.data.meals[0];
    ingredientList = [];

    //store recipe ingredients
    for(i=1; i<21; i++){
        //ingredientList.push(`${result.strIngredient}${i}','${result.strMeasure}${i}`);
        let name = `strIngredient${i}`;
        let amount = `strMeasure${i}`;
        console.log(result[name]);
        let ingredientName = result[name];
        let ingredientAmt = result[amount];
        let ingredient = {ingredientName, ingredientAmt}
        if (ingredientName !== "") {
            ingredientList.push(ingredient);
        }
    }

    recipeInstructions = result.strInstructions;

    console.log(ingredientList);

    //generate HTML for recipe
    recipeResults.innerHTML = 
        `<div id=${result.idMeal} class="recipe">
        <img src=${result.strMealThumb} />
        <h3>${result.strMeal}</h3>
        <small>${result.strArea}</small> </div>`;

    //display recipe options
    makeRecipe.style.display = "inline-block";
    saveRecipe.style.display = "inline-block";

    ingredients.innerHTML = "";
    ingredients.style.display = "none";
    instructions.innerHTML = "";
    instructions.style.display = "none";
    
});

makeRecipe.addEventListener("click", async function(){
    ingredients.style.display = "block";
    instructions.style.display = "block";

    instructions.innerHTML += 
        `<h3>Instructions List</h3>
        <p class="instructions-details">${recipeInstructions}</p>`

    ingredients.innerHTML = '<h3 class="ingredient-h3">Ingredient List</h3>';
    // ingredientList.forEach(function (item) {
    //     if (item.ingredientName !== "null"){
    //         ingredients.innerHTML +=
    //             `<div class="ingredient">
    //             <p class="ingredientName">${item.ingredientName}</p>
    //             <p class="ingredientAmt">${item.ingredientAmt}</p>
    //             </div>`
    //     }
    //   });

        ingredientList.forEach(function (item) {
        if (item.ingredientName !== "null"){
            ingredients.innerHTML +=
                `<div class="ingredient">
                    <div class="ingredient-name">
                    <input class="ingredientName-checkbox" type="checkbox" name"${item.ingredientName}"=>${item.ingredientName}</input>
                    </div>
                    <p class="ingredientAmt">${item.ingredientAmt}</p>
                </div>`
        }
      });
});

document.addEventListener("click", async function(e){
    let element = e.target
    if (element.className === "ingredientName-checkbox"){
        console.log("checkbox works");
        ingredient.style.backgroundColor = "coral";
    }    
});