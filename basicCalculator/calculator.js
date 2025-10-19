const currDisplay = document.querySelector(".curr-display");
const prevDisplay = document.querySelector(".prev-display");
const numbers = document.querySelectorAll(".number");
const clearBtn = document.querySelector(".span-2-clear");
const deleteBtn = document.querySelector(".delete");
const equalBtn = document.querySelector(".span-2-equal");
const operations = document.querySelectorAll(".operation");

let currentOperand = "";
let previousOperand = "";
let operation = null;

function appendNumber(number) {
  if (number === "." && currentOperand.includes(".")) return;
  currentOperand += number;
  currDisplay.innerText = currentOperand;
}

function chooseOperation(operand) {
  if (currentOperand === "") return;
  if (previousOperand !== "") {
    compute();
  }
  operation = operand;
  previousOperand = currentOperand;
  currentOperand = "";
  prevDisplay.innerText = previousOperand + " " + operation;
  currDisplay.innerText = "";
}

function compute() {
  let computation;
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(curr)) return;

  switch (operation) {
    case "+":
      computation = prev + curr;
      break;
    case "-":
      computation = prev - curr;
      break;
    case "*":
      computation = prev * curr;
      break;
    case "/":
      computation = prev / curr;
      break;
    default:
      return;
  }

  currentOperand = computation.toString();
  operation = null;
  previousOperand = "";
  currDisplay.innerText = currentOperand;
  prevDisplay.innerText = "";
}

function clearDisplay() {
  currentOperand = "";
  previousOperand = "";
  operation = null;
  currDisplay.innerText = "";
  prevDisplay.innerText = "";
}

function deleteNumber() {
  currentOperand = currentOperand.toString().slice(0, -1);
  currDisplay.innerText = currentOperand;
}

// --- Event listeners ---
numbers.forEach(button => {
  button.addEventListener("click", () => appendNumber(button.innerText));
});

operations.forEach(button => {
  button.addEventListener("click", () => chooseOperation(button.innerText));
});

equalBtn.addEventListener("click", compute);
clearBtn.addEventListener("click", clearDisplay);
deleteBtn.addEventListener("click", deleteNumber);

const radios = document.querySelectorAll('.theme input[type="radio"]');

radios.forEach(radio => {
  radio.addEventListener('change', () => {
    document.body.setAttribute('data-theme', radio.value);
  });
});

// Optional: make sure the default theme is applied on page load
document.body.setAttribute('data-theme', 'default');
