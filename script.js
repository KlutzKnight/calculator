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

function clearExpression() {
    expression = "";
}

function calculate(expression) {
    // expresssion is a string
    let ope1 = "";
    let ope2 = "";
    let opcode = null;
    let result = 0;
    let ope1Negative = false;
    let disableDecimalFlag = false;

    let i = 0;
    // Check for any operation code at the start and ignore them
    while(i < expression.length && isOperation(expression[i])) {
        i++;
    }

    // If - right before ope1, set the flag to negate it
    if(expression[i-1] === "-") {
        ope1Negative = true;
    }

    // Get operand 1
    while(i < expression.length && !isOperation(expression[i])) {
        // Ignore Multiple decimal points
        if(expression[i] === ".") {
            if(disableDecimalFlag) {
                i++;
                continue;
            }
            else disableDecimalFlag = true;
        }
        ope1 += expression[i];
        i++;
    }

    // Get operation Code
    while(i < expression.length && isOperation(expression[i])) {
        opcode = expression[i];
        i++;
    }

    disableDecimalFlag = false;
    // Get operand 2
    while(i < expression.length && (expression[i] !== "=") && !isOperation(expression[i])) {
        // Ignore Multiple decimal points
        if(expression[i] === ".") {
            if(disableDecimalFlag) {
                i++;
                continue;
            }
            else disableDecimalFlag = true;
        }
        ope2 += expression[i];
        i++;
    }

    if(ope1Negative)
        ope1 = -ope1;

    result = operate(ope1, ope2, opcode);
    
    while(i < expression.length && expression[i] !== "=") {
        // Get operation Code
        while(i < expression.length && isOperation(expression[i])) {
            opcode = expression[i];
            i++;
        }
        
        disableDecimalFlag = false;
        // Get operand 2
        ope2 = "";
        while(i < expression.length && (expression[i] !== "=") && !isOperation(expression[i])) {
            // Ignore Multiple decimal points
            if(expression[i] === ".") {
                if(disableDecimalFlag) {
                    i++;
                    continue;
                }
                else disableDecimalFlag = true;
            }
            ope2 += expression[i];
            i++;
        }
        result = operate(result, ope2, opcode);
    }

    return result;
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
    if(clearDisplayFlag && isNumericChar(keyPressed)) {
        clearDisplay();
        clearDisplayFlag = false;
        if(!isOperation(expression.at(-1)))
            clearExpression();
    }

    // Display text on screen
    if(isNumericChar(keyPressed)) {
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