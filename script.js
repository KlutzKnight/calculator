const calculator = document.querySelector("#calculator");
const display = document.querySelector("#display");

let currentNumber = null;
let storedNumber = null;
let operator = null;

let resetOnNextInput = false;

function add(a, b) {
    return roundResult(Number(a) + Number(b));
}

function subtract(a, b) {
    return roundResult(Number(a) - Number(b));
}

function multiply(a, b) {
    return roundResult(Number(a) * Number(b));
}

function divide(a, b) {
    let numA = Number(a);
    let numB = Number(b);
    if(numB === 0)
        return null;
    return roundResult(numA/numB);
}

function roundResult(result) {
    return Math.round(result * 10000) / 10000;
}

function operate(ope1, ope2, opcode) {
    switch(opcode) {
        case "+": return add(ope1, ope2);
        case "-": return subtract(ope1, ope2);
        case "*": return multiply(ope1, ope2);
        case "÷": return divide(ope1, ope2);
        default: return null;
    }
}

function isNumericChar(str) {
    // Matches for only numeric
    return "0123456789.".includes(str);
}

function isOperator(str) {
    // Matches for only the basic operations
    return "+-*÷=".includes(str);
}

function clearDisplay() {
    // Clear the calculator display
    display.value = "";   
}

function clearState() {
    // Reset all the variables
    currentNumber = null;
    storedNumber = null;
    operator = null;
}

function parse(node) {
    // Only proceed if node is a button
    if(node.tagName !== "BUTTON")
        return null;
    
    let buttonPressed = node.textContent; // The button pressed
    
    // Pressing C clears everything
    if(buttonPressed === "C") {
        clearDisplay();
        clearState();
        return;
    }
    
    // Only allow one decimal
    if(buttonPressed === "." && currentNumber.includes(".")) {
        return
    }
    
    if(isNumericChar(buttonPressed)) {
        // reset storedNumber if = was pressed before
        if(resetOnNextInput) {
            storedNumber = null;
            resetOnNextInput = false;
        }
        
        // Store the value in currentNumber
        if(currentNumber === null)
            currentNumber = buttonPressed;
        else
            currentNumber += buttonPressed;
        display.value = currentNumber;
    }

    if(isOperator(buttonPressed)) {
        if(operator !== null && currentNumber !== null && storedNumber !== null) {
            // Evaluate the result
            currentNumber = operate(storedNumber, currentNumber, operator);
            if(currentNumber === null) {
                // Handle division by zero
                display.value = "Can't divide by 0";
                clearState();
                return
            }
            else {
                // display the result
                display.value = currentNumber;
                operator = null;
            }

            // store the currentNumber and reset it
            storedNumber = currentNumber;
            currentNumber = null;
            // Set the flag to reset stored number if another number is pressed
            resetOnNextInput = true; 
        }

        if(buttonPressed !== "=") {
            // store the operator
            operator = buttonPressed;
            if(storedNumber === null) {
                storedNumber = currentNumber;
            }
            currentNumber = null;
        }
    }
    console.log(buttonPressed, currentNumber, storedNumber, operator);
}

clearDisplay();
clearState();
calculator.addEventListener("click", e => parse(e.target));