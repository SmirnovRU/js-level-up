class Hamburger {
    constructor(size, stuffing){
        this.container= this.container
        this.size = size;
        this.stuffing = stuffing;
        this.getSize();
    }

    addTopping (){
    }
    
    removeTopping (){
    }

    getTopping () {
    }

    getSize () {
        let size = document.querySelectorAll('input')
        let btnCalculate = document.querySelector('.result__button');
        let titeSummPrice = document.querySelector('.result__price .result__summprice')
        let titleSummCalories = document.querySelector('.result__calories .result__summcalories')
        btnCalculate.addEventListener('click', function(event) {
        let sumPrice = 0;
        let sumCalories = 0;
            size.forEach(item => {
                if (item.checked) {
                    console.log(item)
                    sumPrice = sumPrice + Number(item.dataset.price)
                    sumCalories = sumCalories + Number(item.dataset.calories)
                }
            })
        titeSummPrice.innerText = sumPrice;
        titleSummCalories.innerText = sumCalories;
        })
    }

    getStuffing() {
    }

    calculatePrice() {
    }

    calculateCalories() {
    }
}

let list = new Hamburger();
