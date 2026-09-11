let current = "0";
let previous = "";
let operator = null;
let shouldResetScreen = false;

const currentDisplay = document.getElementById("current");
const previousDisplay = document.getElementById("previous");

function updateDisplay() {
    currentDisplay.textContent = current;
    previousDisplay.textContent =
        previous && operator
            ? previous + " " + getOperatorSymbol(operator)
            : "";
}

function getOperatorSymbol(op) {
    if (op === "*") return "×";
    if (op === "/") return "÷";
    if (op === "-") return "−";
    return "+";
}

function appendNumber(number) {
    if (current === "Error" || shouldResetScreen) {
        current = "";
        shouldResetScreen = false;
    }

    if (number === "." && current.includes(".")) {
        return;
    }

    if (current === "" && number === ".") {
        current = "0";
    }

    if (current === "0" && number !== ".") {
        current = number;
    } else {
        current += number;
    }

    updateDisplay();
}

function chooseOperator(op) {
    if (current === "Error") return;

    if (operator !== null) {
        calculate();
    }

    previous = current;
    operator = op;
    shouldResetScreen = true;

    updateDisplay();
}

function calculate() {
    if (operator === null || previous === "") return;

    const first = parseFloat(previous);
    const second = parseFloat(current);

    let result;

    switch (operator) {
        case "+":
            result = first + second;
            break;

        case "-":
            result = first - second;
            break;

        case "*":
            result = first * second;
            break;

        case "/":
            if (second === 0) {
                current = "Error";
                previous = "";
                operator = null;
                updateDisplay();
                return;
            }
            result = first / second;
            break;
    }

    current = Number(result.toFixed(10)).toString();

    previous = "";
    operator = null;
    shouldResetScreen = true;

    updateDisplay();
}

function clearDisplay() {
    current = "0";
    previous = "";
    operator = null;
    shouldResetScreen = false;

    updateDisplay();
}

function deleteNumber() {
    if (current === "Error" || shouldResetScreen) {
        current = "0";
        shouldResetScreen = false;
    } else {
        current = current.length > 1
            ? current.slice(0, -1)
            : "0";
    }

    updateDisplay();
}

function percentage() {
    if (current === "Error") return;

    current = (parseFloat(current) / 100).toString();
    updateDisplay();
}

document.addEventListener("keydown", function(event) {

    if (
        event.key >= "0" &&
        event.key <= "9"
    ) {
        appendNumber(event.key);
    }

    if (event.key === ".") {
        appendNumber(".");
    }

    if (
        event.key === "+" ||
        event.key === "-" ||
        event.key === "*" ||
        event.key === "/"
    ) {
        chooseOperator(event.key);
    }

    if (event.key === "Enter" || event.key === "=") {
        calculate();
    }

    if (event.key === "Backspace") {
        deleteNumber();
    }

    if (event.key === "Escape") {
        clearDisplay();
    }

});