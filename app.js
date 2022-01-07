const ac = document.querySelector('.ac');
const plusMinus = document.querySelector('.plus-minus');
const percent = document.querySelector('.percent');
const divide = document.querySelector('.divide');
const multiplication = document.querySelector('.multiplication');
const minus = document.querySelector('.minus');
const three = document.querySelector('.three');
const plus = document.querySelector('.plus');
const dott = document.querySelector('.dott');
const equal = document.querySelector('.equal');
const result = document.querySelector('.result');

let currentNumber = '';
let previousNumber = '';
let lastOperation = '';

const selectAllButtons = Array.from(document.querySelectorAll('.button-style'));

for (let i = 0; i < selectAllButtons.length; i++) {
    selectAllButtons[i].addEventListener('click', calcuate);
}

function calcuate(event) {
    if (event.target.classList.contains('number')) {    // if a number is pressed
        if (currentNumber.length <= 6) {
            currentNumber += event.target.innerText;
            result.innerText = currentNumber;
            clearWhiteBackground();
            ac.innerText = 'C';
        }   
    }

    else if (event.target.classList.contains('percent')) {
        if (previousNumber == '') {
            error();
        }
        else {
            currentNumber = parseFloat(currentNumber)/100 * parseFloat(previousNumber);
            result.innerText = currentNumber.toFixed(2);
        }
    }

    else if (event.target.classList.contains('plus-minus')) {
        if (result.innerText != '') {
            currentNumber = parseFloat(currentNumber) * (-1)
            result.innerText = currentNumber;
        }     
    }

    else if (event.target.classList.contains('dott')) {
        if (currentNumber != '') {
            currentNumber = currentNumber + '.';
            result.innerText = currentNumber;
        }
    }

    else if (event.target.classList.contains('operator')) {  // if a mathematical operation is pressed
        previousNumber = currentNumber;
        currentNumber = '';
        lastOperation = event.target.innerText;

        if (event.target.classList.contains('divide')) {    // and that mathematical operation is divide
            clearWhiteBackground();
            divide.classList.add('activate');   // make it white
        }
        else if (event.target.classList.contains('multiplication')) {   
            clearWhiteBackground();
            multiplication.classList.add('activate');   
        }
        else if (event.target.classList.contains('plus')) {    
            clearWhiteBackground();
            plus.classList.add('activate');   
        }
        else if (event.target.classList.contains('minus')) {    
            clearWhiteBackground();
            minus.classList.add('activate');  
        }
       
    }

    else if (event.target.classList.contains('ac')) {   
        if (ac.innerText == 'C' && previousNumber != '') {
            currentNumber = '';
        }
        else if (ac.innerText == 'C' && previousNumber == '') {
            previousNumber = '';
            currentNumber = '';
            result.innerText = '';
        }
        else if (ac.innerText == 'C' && currentNumber == '') {
            ac.innerText = 'AC';
        }
        else {
            clearWhiteBackground();
            currentNumber = '';
            previousNumber = '';
            result.innerText = '';
        }
    }

    else if (event.target.classList.contains('equal')) {
        if (currentNumber != '' ) {
            if (lastOperation == '+') {
                result.innerText = (parseFloat(previousNumber) + parseFloat(currentNumber));
                currentNumber = result.innerText;
                ac.innerText = 'AC';
                error();
            }
            else if (lastOperation == '-') {
                result.innerText = (parseFloat(previousNumber) - parseFloat(currentNumber));
                currentNumber = result.innerText;
                ac.innerText = 'AC';
                error();
            }
            else if (lastOperation == 'x') {
                result.innerText = (parseFloat(previousNumber) * parseFloat(currentNumber));
                currentNumber = result.innerText;
                ac.innerText = 'AC';
                error();
            }
            else if (lastOperation == '÷') {
                result.innerText = (parseFloat(previousNumber) / parseFloat(currentNumber));
                currentNumber = result.innerText;
                ac.innerText = 'AC';
                error();
            }
        }
    } 
    
    console.log('previous: ' + previousNumber);
    console.log('current: ' + currentNumber);
    console.log('result: ' + result.innerText);
    console.log('#######################');
}


function clearWhiteBackground() {
    // remove the activate class (whitch remove the white)
    divide.classList.remove('activate');
    multiplication.classList.remove('activate');
    minus.classList.remove('activate');
    plus.classList.remove('activate');
}

function error() {
    if (result.innerText.length > 7) {
        result.innerText = 'Err';
        previousNumber = '';
        currentNumber = '';
    }
}