const ac = document.querySelector('.ac');
const plusMinus = document.querySelector('.plus-minus');
const percent = document.querySelector('.percent');
const divide = document.querySelector('.divide');
const multiplication = document.querySelector('.multiplication');
const minus = document.querySelector('.minus');
const plus = document.querySelector('.plus');
const dott = document.querySelector('.dott');
const equal = document.querySelector('.equal');
const displayedResult = document.querySelector('.result');
const allOperators = document.querySelectorAll('.operator');

let currentNumber = '';
let previousNumber = '';
let operation = '';
displayedResult.textContent = '0';

const selectAllNumbers = Array.from(document.querySelectorAll('.number'));

// ------------------------------------  Activate the "appendNumber" function when the numerical buttons are clicked 
selectAllNumbers.forEach( button => {
    button.addEventListener('click', () => {
        currentNumber = currentNumber.toString();

        //if the numer alreadi contains a "." (dott) then don't add another one
        if (currentNumber.includes('.') && button.textContent == '.') {
            return;
        }
        else {
            currentNumber = currentNumber.toString() + button.textContent.toString();
            appendNumber();
        }      
    });
} );

// ------------------------------------  Form the numbers by clicking the numerical buttons   ------------------------------------
function appendNumber() {
    displayedResult.textContent = currentNumber.toString();
}


allOperators.forEach( button => {
    button.addEventListener('click', () => {
        // if you press on an operation before selectin the second number, then no math is done
        if (currentNumber == '') 
            return;

            // I STILL NEED TO IMPROVE THIS PART
        // if(button.textContent == "+/-") {
        //     currentNumber = -1 * currentNumber;
        //     console.log(typeof(currentNumber));
        // }

        compute();
     
       operation = button.textContent;
       previousNumber = currentNumber;
       currentNumber = '';
       console.log("------------------------------------");
       console.log('allOperators: ')
       console.log("Operator: " + operation);
       console.log("Prev: " + previousNumber);
       console.log("Curr: " + currentNumber);
    });
} );


function compute () {
    let computation;

    // convert the strings to a number so we can do some math
    let prevNumb = parseFloat(previousNumber);
    let curNumb = parseFloat(currentNumber);

    if (isNaN(prevNumb) || isNaN(curNumb))
        return;

    switch (operation) {
        case '+':
            computation = prevNumb + curNumb;
            break;
        
        case '-':
            computation = prevNumb - curNumb;
            break;
        
        case 'x':
            computation = prevNumb * curNumb;
            break;
        
        case '÷':
            computation = prevNumb / curNumb;
            break;

        default:
            return;
    }

    displayedResult.textContent = computation;
    currentNumber = computation;
    operation = undefined;
    previousNumber = '';

    console.log("------------------------------------");
    console.log('Compute: ')
    console.log("Prev: " + previousNumber);
    console.log("Curr: " + currentNumber);
}

// ------------------------------------  Clears every number an operation  ------------------------------------
function clearEverything() {
    currentNumber = '';
    previousNumber = '';
    operation = undefined;
    displayedResult.textContent = '0';
}

function removeHightlight() {
    allOperators.forEach( button => {
        button.classList.remove("activate");  
    } );
}

function addHighlight(e) {
    removeHightlight();
    e.target.classList.add('activate');
}

function changeSign() {
    currentNumber = Number(currentNumber) * (-1);
    currentNumber = currentNumber.toString();
    displayedResult.textContent = currentNumber;
}

function calculatePercentage() {
    if (previousNumber == '')
        return;

    let percentageResult;
    previousNumber = Number(previousNumber);
    currentNumber = Number(currentNumber);

    percentageResult = (currentNumber / 100) * previousNumber;
    currentNumber = percentageResult.toString();
    previousNumber = previousNumber.toString();
    displayedResult.textContent = currentNumber;
}

percent.addEventListener('click', calculatePercentage);

plusMinus.addEventListener('click', changeSign);

divide.addEventListener('click', addHighlight);
multiplication.addEventListener('click', addHighlight);
minus.addEventListener('click', addHighlight);
plus.addEventListener('click', addHighlight);

ac.addEventListener('click', clearEverything);
ac.addEventListener('click', removeHightlight);
equal.addEventListener('click', compute);
equal.addEventListener('click', removeHightlight);