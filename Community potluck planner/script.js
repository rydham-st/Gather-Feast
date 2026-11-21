
// Available dish categories

const categories = [
    "Appetizers",
    "Main Course",
    "Salads & Sides",
    "Desserts",
    "Beverages"
];

const target = 3;


// Array to store registered dishes

let dishes = [];


// Selecting HTML elements

const form = document.getElementById("dishForm");

const dishBoard = document.getElementById("dishBoard");

const quotaBoard = document.getElementById("quotaBoard");

const noAllergen = document.getElementById("noAllergen");


// Handle None of these checkbox

noAllergen.addEventListener("change", function() {

    if (noAllergen.checked) {

        const checkboxes = document.querySelectorAll(
            'input[name="allergen"]'
        );

        checkboxes.forEach(function(item) {
            item.checked = false;
        });

    }

});


// Handle individual allergen checkboxes

const allergenInputs = document.querySelectorAll(
    'input[name="allergen"]'
);

allergenInputs.forEach(function(item) {

    item.addEventListener("change", function() {

        if (item.checked) {
            noAllergen.checked = false;
        }

    });

});


// Register a new dish

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("dishName").value.trim();

    const category = document.getElementById("category").value;

    const portions = document.getElementById("portions").value;

    const temperature = document.getElementById("temperature").value;


    // Get selected allergens

    const selectedAllergens = document.querySelectorAll(
        'input[name="allergen"]:checked'
    );

    const allergenList = [];


    selectedAllergens.forEach(function(item) {
        allergenList.push(item.value);
    });


    // Validate allergen declaration

    if (allergenList.length === 0 && !noAllergen.checked) {

        alert("Please complete the allergen declaration.");

        return;

    }


    if (noAllergen.checked) {
        allergenList.push("None of these");
    }


    // Create dish object

    const dish = {

        name: name,
        category: category,
        portions: portions,
        temperature: temperature,
        allergens: allergenList

    };


    // Add dish to array

    dishes.push(dish);


    // Reset form and update display

    form.reset();

    displayDishes();

    updateQuota();

});


// Display registered dishes

function displayDishes() {

    dishBoard.innerHTML = "";


    // Show message if board is empty

    if (dishes.length === 0) {

        dishBoard.textContent = "No dishes registered yet. Be the first to contribute!";

        return;

    }


    // Display every dish

    dishes.forEach(function(dish, index) {

        const card = document.createElement("div");

        card.className = "dish-card";


        const title = document.createElement("h3");

        title.textContent = dish.name;


        const category = document.createElement("p");

        category.textContent = "Category: " + dish.category;


        const portions = document.createElement("p");

        portions.textContent = "Portions: " + dish.portions;


        const temperature = document.createElement("p");

        temperature.textContent = "Serving Type: " + dish.temperature;


        const allergens = document.createElement("p");

        allergens.textContent = "Allergens: " + dish.allergens.join(", ");


        // Remove button

        const removeButton = document.createElement("button");

        removeButton.textContent = "Remove Dish";


        removeButton.addEventListener("click", function() {

            dishes.splice(index, 1);

            displayDishes();

            updateQuota();

        });


        // Add elements to dish card

        card.appendChild(title);

        card.appendChild(category);

        card.appendChild(portions);

        card.appendChild(temperature);

        card.appendChild(allergens);

        card.appendChild(removeButton);


        dishBoard.appendChild(card);

    });

}


// Update category counters

function updateQuota() {

    quotaBoard.innerHTML = "";


    categories.forEach(function(category) {


        // Count dishes in each category

        const count = dishes.filter(function(dish) {

            return dish.category === category;

        }).length;


        // Calculate remaining dishes

        const remaining = Math.max(0, target - count);


        // Create quota card

        const card = document.createElement("div");

        card.className = "quota-card";


        const title = document.createElement("h3");

        title.textContent = category;


        const status = document.createElement("p");


        if (remaining === 0) {

            status.textContent = "Category Full!";

        } else {

            status.textContent = remaining + " More Needed";

        }


        // Add information to card

        card.appendChild(title);

        card.appendChild(status);

        quotaBoard.appendChild(card);

    });

}


// Initial display when website opens

displayDishes();

updateQuota();
