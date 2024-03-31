// Functions for basic math operations
const add = (a, b) => +a + +b;
const subtract = (a, b) => +a - +b;
const multiply = (a, b) => +a * +b;
const divide = (a, b) => +a / +b;

// Variable for calculations
let operand1;
let operand2;
let operator;

//
function operate (operand1, operator, operand2) {
  if (operator === '+') return add(operand1, operand2);
  if (operator === '-') return subtract(operand1, operand2);
  if (operator === '*') return multiply(operand1, operand2);
  if (operator === '/') {
    if (operand2 === '0') {
      alert('No division by 0');
      return ''
    }
    else return divide(operand1, operand2);
  }
}

//DOM elements selection
const container = document.querySelector('#container')
const display = container.querySelector('#display > p')

let displayValue = '';

function calculate() {
  if (displayValue.split(' ').length !== 3) return
  displayValue = round(operate(...displayValue.split(' ')),4)
}

function round(num, nbOfDigits) {
  if (typeof num === 'number') return Math.floor(num*(10**nbOfDigits))/10**nbOfDigits
  return num
}

function calculator(e) {
  const btn = e.target.dataset.value || e.key
  if (btn === 'clear') displayValue = ''
  if (!btn || displayValue.length > 14) return
  switch (btn) {
    case 'Enter':
    case '=': calculate(); break;

    case '+':
    case '-':
    case '*':
    case '/': 
      if (/[\+\-\*\/]/.test(displayValue)) calculate();
      displayValue += ' ' + btn + ' '; 
      break;

    case 'Backspace':
    case 'back' :
      if (displayValue.at(-1) === ' ') displayValue = displayValue.slice(0,-3);
      else displayValue = displayValue.slice(0,-1);
      break;

    case '.': if (/\./.test(displayValue)) break;
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':displayValue += btn; break;
  }
  display.textContent = displayValue
}

container.addEventListener('click', calculator)

document.addEventListener('keydown', calculator)