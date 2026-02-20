const calculator = document.querySelector("#calculator");
const display = document.querySelector("#display");
let clearDisplayFlag = true;
let expression;

function add(a, b) {
    return parseInt(a) + parseInt(b);
}

function subtract(a, b) {
    return parseInt(a) - parseInt(b);
}

function multiply(a, b) {
    return parseInt(a) * parseInt(b);
}

function divide(a, b) {
    return parseInt(a) / parseInt(b);
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
    let regExp = /^[0-9]+$/;
    return regExp.test(str);
}

function isOperation(str) {
    // Matches for only the basic operations
    let regExp = /^[-+*÷]+$/;
    return regExp.test(str);
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

    let i = 0;
    // Get operand 1
    while(!isOperation(expression[i])) {
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

    display.value = operate(ope1, ope2, opcode);
    return display.value;
}

function parse(node) {
    if(node.tagName != "BUTTON")
        return null;

    let keyPressed = node.textContent;
    // If C is pressed clear everything and return
    if(keyPressed == "C") {
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
    if(keyPressed == "=") {
        expression = calculate(expression);
        clearDisplayFlag = true;
    }
}

clearDisplay();
clearExpression();
calculator.addEventListener("click", e => parse(e.target));