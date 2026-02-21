const calculator = document.querySelector("#calculator");
const display = document.querySelector("#display");

let resetDisplay = true;
let resultEvaluated = false;

let result = 0;
let operand = "";
let operation = "+";

function add(a, b) {
    return Number(a) + Number(b);
}

function subtract(a, b) {
    return Number(a) - Number(b);
}

function multiply(a, b) {
    return Number(a) * Number(b);
}

function divide(a, b) {
    let numA = Number(a);
    let numB = Number(b);
    if(numB === 0)
        return null;
    return Math.round((numA/numB) * 10000) / 10000;
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

function isOperation(str) {
    // Matches for only the basic operations
    return "+-*÷".includes(str);
}

function clearDisplay() {
    display.value = "";   
}

function clearState() {
    result = 0;
    operand = "";
    operation = "+";
}

function parse(node) {
    if(node.tagName !== "BUTTON")
        return null;

    let buttonPressed = node.textContent;
    // If C is pressed, clear everything and return
    if(buttonPressed === "C") {
        clearDisplay();
        clearState();
        return;
    }

    if(resultEvaluated) {
        if(isNumericChar(buttonPressed)) {
            clearDisplay();
            clearState();
        }
        resultEvaluated = false;
    }

    // Clear the display
    if(resetDisplay) {
        clearDisplay();
        resetDisplay = false;   
    }

    if(buttonPressed === "=") {
        // Evaluate and display the result
        result = operate(result, operand, operation);
        if(result == null) {
            display.value = "Can't Divide by 0";
        }
        else {
            display.value = result;
        }
        operand = "";
        resultEvaluated = true;
        return;
    }


    if(!isOperation(buttonPressed)) {
        display.value += buttonPressed;
        operand += buttonPressed;
    }

    if(isOperation(buttonPressed)) {
        result = operate(result, operand, operation);
        operation = buttonPressed;
        operand = "";
        resetDisplay = true;
    }
}

clearDisplay();
clearState();
calculator.addEventListener("click", e => parse(e.target));