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

function calculate(ope1, ope2, opcode) {
    let result;
    switch(opcode) {
        case "+": result = add(ope1, ope2); break;
        case "-": result = subtract(ope1, ope2); break;
        case "*": result = multiply(ope1, ope2); break;
        case "/": result = divide(ope1, ope2); break;
        default: return null;
    }

    return result;
}