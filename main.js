class DogCalculator {
    dog_weight_input     = document.querySelector('input[name=dog-weight]');
    meat_earn_input      = document.querySelector('input[name=meat-earn]');

    unit                 = 'g';
    meat_per_kg          = 10;
    carbohydrates_per_kg = 5;
    vegetables_per_kg    = 3.5
    food_in_jar          = 500;
    food_per_pot         = 1500;

    constructor() {
        let that = this;

        // wyliczamy zapotrzebowanie na kg masy ciała
        this.printData('foodPerKg', this.calculateFoodPerKg());

        this.dog_weight_input.oninput = function() {
            if (!isNaN(this.value)) {
                that.onInputCalculateAction();
            }
        }

        this.meat_earn_input.oninput = function(){
            if (!isNaN(this.value)) {
                that.onInputCalculateAction()
            }
        }
    }

    onInputCalculateAction(){
        // wyliczenie dziennego zapotrzebowania karmy
        this.printData('daily', this.calculateDaily());

        // wyliczamy proporcje na podstawie gramatury obrabianego mięsa
        this.printData('food', this.calculateFood());
        this.printPackage();
    }

    // wyświetlenie wyliczonych danych 
    printData(id_prefix, calculatedData){
        Object.entries(calculatedData).forEach(([key, value]) => {
            document.querySelector(`#${id_prefix}${key}`).innerHTML = value + this.unit;
        })
    }

    // szablon żywieniowych danych wyjściowych
    calculateArrayTemplateOutput(meat, carbohydrates, vegetables){
        return {
            'Meat' : parseInt(meat),
            'Carbohydrates' : parseInt(carbohydrates),
            'Vegetables' : parseInt(vegetables),
        }
    }

    // wyliczenie zapotrzebowania jedzenia na kg masy ciała
    calculateFoodPerKg(){
        let meat          = this.meat_per_kg;
        let carbohydrates = this.carbohydrates_per_kg;
        let vegetables    = this.vegetables_per_kg;
        
        return this.calculateArrayTemplateOutput(meat, carbohydrates, vegetables);
    }

    // wyliczenie dziennego zapotrzebowania jedzenia
    calculateDaily(){
        let meat          = this.meat_per_kg * this.dog_weight_input.value;
        let carbohydrates = this.carbohydrates_per_kg * this.dog_weight_input.value;
        let vegetables    = this.vegetables_per_kg * this.dog_weight_input.value;

        return this.calculateArrayTemplateOutput(meat, carbohydrates, vegetables);
    }

    // wyliczenie proporcji gotowanego jedzenia na podstawie gramatury mięsa
    calculateFood(){
        let meat          = this.meat_earn_input.value;
        let carbohydrates = ( this.meat_earn_input.value * this.carbohydrates_per_kg ) / this.meat_per_kg;
        let vegetables    = ( this.meat_earn_input.value * this.vegetables_per_kg ) / this.meat_per_kg;

        return this.calculateArrayTemplateOutput(meat, carbohydrates, vegetables);
    }

    // wyliczenie ilości dziennych porcji z gramatury mięsa, potrzebnych słoików oraz cykli w szybkowarze
    printPackage(){
        let portionsTD = document.querySelector('#portions');
        let jarsTD     = document.querySelector('#jars');
        let potTD      = document.querySelector('#pot');

        portionsTD.innerHTML = (this.meat_earn_input.value / this.calculateDaily()['Meat']).toFixed(2);
        jarsTD.innerHTML     = Math.ceil(this.meat_earn_input.value / this.food_in_jar);
        potTD.innerHTML      = Math.ceil( this.meat_earn_input.value / this.food_per_pot );
    }
}

const calculateDogFood = new DogCalculator();
