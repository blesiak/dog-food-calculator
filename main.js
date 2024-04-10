class DogCalculator {
    // Dog weight input element
    dog_weight_input = document.querySelector('input[name=dog-weight]');
    // Meat earn input element
    meat_earn_input = document.querySelector('input[name=meat-earn]');

    // Unit for measurements
    unit = 'g';
    // Amount of meat required per kg
    meat_per_kg = 10;
    // Amount of carbohydrates required per kg
    carbohydrates_per_kg = 5;
    // Amount of vegetables required per kg
    vegetables_per_kg = 3.5
    // Food quantity in a jar
    food_in_jar = 500;
    // Food quantity in a pot
    food_per_pot = 1500;

    constructor() {
        let that = this;

        // Calculate food requirement per kg of dog's body weight
        this.printData('foodPerKg', this.calculateFoodPerKg());

        // Event listener for dog weight input
        this.dog_weight_input.oninput = function() {
            // Calculate when a valid number is entered
            if (!isNaN(this.value)) {
                that.onInputCalculateAction();
            }
        }

        // Event listener for meat earn input
        this.meat_earn_input.oninput = function() {
            // Calculate when a valid number is entered
            if (!isNaN(this.value)) {
                that.onInputCalculateAction()
            }
        }
    }

    // Perform actions when inputs are updated
    onInputCalculateAction() {
        // Calculate daily food requirement
        this.printData('daily', this.calculateDaily());

        // Calculate food proportions based on the quantity of processed meat
        this.printData('food', this.calculateFood());
        this.printPackage();
    }

    // Display calculated data
    printData(id_prefix, calculatedData) {
        Object.entries(calculatedData).forEach(([key, value]) => {
            document.querySelector(`#${id_prefix}${key}`).innerHTML = value + this.unit;
        })
    }

    // Template for nutritional data output
    calculateArrayTemplateOutput(meat, carbohydrates, vegetables) {
        return {
            'Meat': parseInt(meat),
            'Carbohydrates': parseInt(carbohydrates),
            'Vegetables': parseInt(vegetables),
        }
    }

    // Calculate food requirement per kg of dog's body weight
    calculateFoodPerKg() {
        let meat = this.meat_per_kg;
        let carbohydrates = this.carbohydrates_per_kg;
        let vegetables = this.vegetables_per_kg;

        return this.calculateArrayTemplateOutput(meat, carbohydrates, vegetables);
    }

    // Calculate daily food requirement
    calculateDaily() {
        let meat = this.meat_per_kg * this.dog_weight_input.value;
        let carbohydrates = this.carbohydrates_per_kg * this.dog_weight_input.value;
        let vegetables = this.vegetables_per_kg * this.dog_weight_input.value;

        return this.calculateArrayTemplateOutput(meat, carbohydrates, vegetables);
    }

    // Calculate food proportions based on the quantity of meat
    calculateFood() {
        let meat = this.meat_earn_input.value;
        let carbohydrates = (this.meat_earn_input.value * this.carbohydrates_per_kg) / this.meat_per_kg;
        let vegetables = (this.meat_earn_input.value * this.vegetables_per_kg) / this.meat_per_kg;

        return this.calculateArrayTemplateOutput(meat, carbohydrates, vegetables);
    }

    // Calculate the number of daily portions from the meat quantity, required jars, and cycles in a pressure cooker
    printPackage() {
        let portionsTD = document.querySelector('#portions');
        let jarsTD = document.querySelector('#jars');
        let potTD = document.querySelector('#pot');

        portionsTD.innerHTML = (this.meat_earn_input.value / this.calculateDaily()['Meat']).toFixed(2);
        jarsTD.innerHTML = Math.ceil(this.meat_earn_input.value / this.food_in_jar);
        potTD.innerHTML = Math.ceil(this.meat_earn_input.value / this.food_per_pot);
    }
}

// Instantiate DogCalculator object
const calculateDogFood = new DogCalculator();
