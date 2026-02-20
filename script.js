const calculator = document.querySelector("#calculator");
const display = document.querySelector("#display");
let clearDisplayFlag = true;
let expression = "";

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
        return "Can't divide by zero";
    return Math.round((numA/numB) * 10000) / 10000;
}

function operate(ope1, ope2, opcode) {
    let result;
    switch(opcode) {
        case "+": result = add(ope1, ope2); break;
        case "-": result = subtract(ope1, ope2); break;
        case "*": result = multiply(ope1, ope2); break;
        case "÷": result = divide(ope1, ope2); break;
        default: return null;
    }

    return result;
}

function isNumeric(str) {
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

function clearExpression() {
    expression = "";
}

function calculate(expression) {
    // expresssion is a string
    let ope1 = "";
    let ope2 = "";
    let opcode = "";
    let ope1Negative = false;

    let i = 0;
    
    // Check for negative sign at the start
    if(expression[i] === "-") {
        ope1Negative = true;
        i++
    }
    // Get operand 1
    while(i < expression.length && !isOperation(expression[i])) {
        ope1 += expression[i];
        i++;
    }

    // Get operation Code
    opcode = expression[i++];

    // Get operand 2
    while(i < expression.length && expression[i] != "=") {
        ope2 += expression[i];
        i++;
    }

    if(ope1Negative)
        ope1 = -ope1;

    return operate(ope1, ope2, opcode);
}

function parse(node) {
    if(node.tagName !== "BUTTON")
        return null;

    let keyPressed = node.textContent;
    // If C is pressed clear everything and return
    if(keyPressed === "C") {
        clearDisplay();
        clearExpression();
        return;
    }

    // Clear the display if the flag is set
    if(clearDisplayFlag && isNumeric(keyPressed)) {
        clearDisplay();
        clearDisplayFlag = false;
        if(!isOperation(expression.at(-1)))
            clearExpression();
    }

    // Display text on screen
    if(isNumeric(keyPressed)) {
        display.value += keyPressed;
    }
    // Sets the clear display flag so it is cleared on next input
    else if(isOperation(keyPressed)) {
        clearDisplayFlag = true;
    }

    // Evaluate and Clear the expression and display
    expression += keyPressed;
    if(keyPressed === "=") {
        let result = calculate(expression);
        if(!isNaN(result)) {
            display.value = result;
            expression = display.value;
        }
        else {
            alert(result);
            clearExpression();
            clearDisplay();
        }
        clearDisplayFlag = true;
    }
}

clearDisplay();
clearExpression();
calculator.addEventListener("click", e => parse(e.target));