let billValueInput = document.querySelector('[data-bill]');
let customTipInput = document.querySelector('[data-custom-tip]');
let numberOfPeopleInput = document.querySelector('[data-people-ammount]');
let tipPercentageButton = document.querySelectorAll('[data-tip-value]');
let tipPerPerson = document.querySelector('[data-tip-person]');
let totalPerPerson = document.querySelector('[data-total-person]');
let resetButton = document.querySelector('[data-reset-button]');
let peopleError = document.querySelector('.people-error');

let billValue = 0;
let tipPercentage = 0;
let numberOfPeople = 0;
let tipPercentageButtonSelected = [];

function tipCalculator(){
    if ((billValue > 0) && (tipPercentage > 0) && (numberOfPeople > 0)){
        resetButton.disabled = false;
        let resultTipPerson = ((billValue*(tipPercentage/100)/numberOfPeople)).toFixed(2);
        let resultTotalPerson = (((billValue/numberOfPeople)+parseFloat(resultTipPerson))).toFixed(2);
        tipPerPerson.innerHTML = resultTipPerson;
        totalPerPerson.innerHTML = resultTotalPerson;
    }
}

function removeSelectedClass(){
    tipPercentageButtonSelected = document.querySelectorAll('.selected');
    tipPercentageButtonSelected.forEach(function(el) {
        el.classList.remove("selected");
    });
}

function reset(){
    removeSelectedClass();
    customTipInput.value="";
    billValueInput.value="";
    numberOfPeopleInput.value="";
    tipPerPerson.innerHTML = "0.00";
    totalPerPerson.innerHTML = "0.00";
    billValue = 0;
    tipPercentage = 0;
    numberOfPeople = 0;
    tipPercentageButtonSelected = [];
    resetButton.disabled = true;
}

function load() {
    for (let i = 0; i < tipPercentageButton.length; i++) {
        tipPercentageButton[i].addEventListener("click", function() {
            removeSelectedClass();
            tipPercentageButton[i].classList.add("selected");
            tipPercentage = parseInt(tipPercentageButton[i].getAttribute("data-tip-value"));
            customTipInput.value="";
            tipCalculator()
        });
    }

    billValueInput.addEventListener("keyup", function() {
        billValue = parseFloat(billValueInput.value);
        if (billValueInput.value>0){
            billValueInput.classList.remove("invalid");
            billValueInput.classList.add("valid");
        }else{
            billValueInput.classList.remove("valid");
            billValueInput.classList.add("invalid");
        }
        tipCalculator()
    });

    customTipInput.addEventListener("keyup", function() {
        if (customTipInput.value>0){
            customTipInput.classList.remove("invalid");
            customTipInput.classList.add("valid");
        }else{
            customTipInput.classList.remove("valid");
            customTipInput.classList.add("invalid");
        }
        
        tipPercentage = parseInt(customTipInput.value);
        if (tipPercentage > 0){
            removeSelectedClass();
            tipCalculator()
        }
    });

    numberOfPeopleInput.addEventListener("keyup", function() {
        numberOfPeople = parseInt(numberOfPeopleInput.value);
        if (numberOfPeopleInput.value>0){
            numberOfPeopleInput.classList.remove("invalid");
            numberOfPeopleInput.classList.add("valid");
            peopleError.style.display="none";
        }else{
            numberOfPeopleInput.classList.remove("valid");
            numberOfPeopleInput.classList.add("invalid");
            peopleError.style.display="inline-block";
        }
        tipCalculator()
    });
    
    resetButton.addEventListener("click", reset);

}

document.addEventListener("DOMContentLoaded", load);