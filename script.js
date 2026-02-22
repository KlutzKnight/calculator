const calculator = document.querySelector("#calculator");
const display = document.querySelector("#display");

let currentNumber = "";
let storedNumber = null;
let currentOperator = null;
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

function percentage(ope1, ope2) {
    return roundResult(ope1 * ope2 / 100);
}

function modulus(ope1, ope2) {
    return roundResult(ope1 % ope2);
}

function roundResult(result) {
    return Math.round(result * 10000) / 10000;
}

function operate(ope1, ope2, opcode) {
    switch(opcode) {
        case "+": return add(ope1, ope2);
        case "-": return subtract(ope1, ope2);
        case "*": return multiply(ope1, ope2);
        case "÷": case "/": return divide(ope1, ope2);
        case "%": return modulus(ope1, ope2);
        // case "%": return percentage(ope1, ope2);
        default: return null;
    }
}

function isNumericChar(str) {
    // Matches for only numeric
    return "0123456789.".includes(str);
}

function isOperator(str) {
    // Matches for only the basic operations
    return "+-*÷/%".includes(str);
}

function clearDisplay() {
    // Clear the calculator display
    display.value = "";   
}

function clearState() {
    // Reset all the variables
    currentNumber = "";
    storedNumber = null;
    currentOperator = null;
}

function parse(event) {
    let buttonPressed = null;
    if(event.type === "click") {
        // Only proceed if node is a button
        if(event.target.tagName !== "BUTTON")
            return null;
        
        buttonPressed = event.target.textContent; // The button pressed
        console.log("click", buttonPressed);
    }
    else if(event.type === "keydown") {
        event.preventDefault();
        buttonPressed = event.key; // The button pressed
        console.log("keydown", buttonPressed);
    }
    
    // Pressing C clears everything
    if(buttonPressed === "C") {
        clearDisplay();
        clearState();
        resetOnNextInput = false;
        return;
    }
    
    // Backspace button clears current Number
    if(buttonPressed === "CE" || buttonPressed === "Backspace") {
        currentNumber = currentNumber.slice(0, currentNumber.length - 1);
        display.value = currentNumber;
        return;
    }
    
    // Only allow one decimal
    if(buttonPressed === "." ) {
        if(currentNumber.includes("."))
            return;

        if(currentNumber === "") {
            currentNumber = "0.";
            display.value = currentNumber;
            return;
        }
    }
    
    if(buttonPressed === "+/-") {
        currentNumber = -currentNumber;
        display.value = currentNumber;
        return;
    }

    if(buttonPressed === "0" && currentNumber == 0) {
        return;
    }

    if(isNumericChar(buttonPressed)) {
        // reset storedNumber if = was pressed before
        if(resetOnNextInput) {
            currentNumber = "";
            storedNumber = null;
            resetOnNextInput = false
        }
        
        // Store the value in currentNumber
        currentNumber += buttonPressed;
        display.value = currentNumber;
    }

    if(isOperator(buttonPressed) || buttonPressed === "=" || buttonPressed === "Enter") {
        if(currentOperator !== null && currentNumber !== "" && storedNumber !== null) {
            // Evaluate the result
            currentNumber = operate(storedNumber, currentNumber, currentOperator);
            if(currentNumber === null) {
                // Handle division by zero
                display.value = "Can't divide by 0";
                clearState();
                return
            }
            else {
                // display the result
                display.value = currentNumber;
            }
            
            // store the currentNumber and reset it
            storedNumber = currentNumber;
            currentNumber = "";

            resetOnNextInput = true;
        }

        if(buttonPressed !== "=" && buttonPressed !== "Enter") {
            // store the operator
            currentOperator = buttonPressed;
            if(storedNumber === null && currentNumber !== "") {
                storedNumber = currentNumber;
            }
            currentNumber = "";

            resetOnNextInput = false;
        }
    }
    console.log(buttonPressed, currentNumber, storedNumber, currentOperator);
}

clearDisplay();
clearState();
calculator.addEventListener("click", parse);
document.addEventListener("keydown", parse);