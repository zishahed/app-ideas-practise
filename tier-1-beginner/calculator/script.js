const inputDisplay = document.getElementById('inputDisplay');
const resultDisplay = document.getElementById('resultDisplay');
const acBtn = document.getElementById('acBtn');
const delBtn = document.getElementById('delBtn');
const rndBtn = document.getElementById('rndBtn');
const ansBtn = document.getElementById('ansBtn');
const equalsBtn = document.getElementById('equalsBtn');

const functionBtns = document.querySelectorAll('.btn-function');
const bracketBtns = document.querySelectorAll('.btn-bracket');
const numberBtns = document.querySelectorAll('.btn-number');
const operatorBtns = document.querySelectorAll('.btn-operator');

let currentInput = '';
let previousResult = null;

function updateDisplay() {
    inputDisplay.textContent = currentInput || '';
}

function clearAll() {
    currentInput = '';
    resultDisplay.textContent = '0';
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.trim();
    if (currentInput.endsWith(' ')) {
        currentInput = currentInput.slice(0, -3).trim();
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

function convertToEvaluatable(input) {
    let expression = input;

    expression = expression.replace(/RanInt#\((\d+),(\d+)\)/g, (match, min, max) => {
        const minNum = parseInt(min);
        const maxNum = parseInt(max);
        return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    });

    expression = expression.replace(/×/g, '*');
    expression = expression.replace(/÷/g, '/');
    expression = expression.replace(/−/g, '-');

    expression = expression.replace(/log\(/g, 'Math.log10(');
    expression = expression.replace(/ln\(/g, 'Math.log(');

    expression = expression.replace(/asin\(([^)]+)\)/g, (match, value) => {
        return `(Math.asin(${value}) * 180 / Math.PI)`;
    });
    expression = expression.replace(/acos\(([^)]+)\)/g, (match, value) => {
        return `(Math.acos(${value}) * 180 / Math.PI)`;
    });
    expression = expression.replace(/atan\(([^)]+)\)/g, (match, value) => {
        return `(Math.atan(${value}) * 180 / Math.PI)`;
    });

    expression = expression.replace(/cosec\(([^)]+)\)/g, (match, value) => {
        return `(1 / Math.sin((${value}) * Math.PI / 180))`;
    });
    expression = expression.replace(/(?<!co)sec\(([^)]+)\)/g, (match, value) => {
        return `(1 / Math.cos((${value}) * Math.PI / 180))`;
    });
    expression = expression.replace(/cot\(([^)]+)\)/g, (match, value) => {
        return `(1 / Math.tan((${value}) * Math.PI / 180))`;
    });

    expression = expression.replace(/(?<![a.])sin\(([^)]+)\)/g, (match, value) => {
        return `Math.sin((${value}) * Math.PI / 180)`;
    });
    expression = expression.replace(/(?<![a.])cos\(([^)]+)\)/g, (match, value) => {
        return `Math.cos((${value}) * Math.PI / 180)`;
    });
    expression = expression.replace(/(?<![a.])tan\(([^)]+)\)/g, (match, value) => {
        return `Math.tan((${value}) * Math.PI / 180)`;
    });

    expression = expression.replace(/([0-9.]+)%/g, '($1/100)');

    return expression;
}

function calculate() {
    if (!currentInput) return;

    try {
        let expression = convertToEvaluatable(currentInput);
        console.log('Expression:', expression);

        let result = eval(expression);
        result = Math.round(result * 1000000000) / 1000000000;

        previousResult = result;
        resultDisplay.textContent = result;
    } catch (error) {
        resultDisplay.textContent = 'Error';
        console.error('Calculation error:', error);
    }
}

acBtn.addEventListener('click', clearAll);
delBtn.addEventListener('click', deleteLast);

rndBtn.addEventListener('click', () => {
    currentInput += 'RanInt#(';
    updateDisplay();
});

ansBtn.addEventListener('click', () => {
    if (previousResult !== null) {
        currentInput += previousResult.toString();
        updateDisplay();
    }
});

equalsBtn.addEventListener('click', calculate);

numberBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const value = btn.getAttribute('data-value');
        currentInput += value;
        updateDisplay();
    });
});

operatorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const value = btn.getAttribute('data-value');
        switch (value) {
            case '/':
                currentInput += ' ÷ ';
                break;
            case '*':
                currentInput += ' × ';
                break;
            case '-':
                currentInput += ' − ';
                break;
            case '+':
                currentInput += ' + ';
                break;
            case '%':
                currentInput += '%';
                break;
            default:
                currentInput += value;
        }
        updateDisplay();
    });
});

functionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const func = btn.getAttribute('data-function');
        currentInput += func + '(';
        updateDisplay();
    });
});

bracketBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const value = btn.getAttribute('data-value');
        currentInput += value;
        updateDisplay();
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        currentInput += e.key;
        updateDisplay();
    }

    if (e.key === '.') {
        currentInput += '.';
        updateDisplay();
    }

    if (e.key === '+') {
        currentInput += ' + ';
        updateDisplay();
    }
    if (e.key === '-') {
        currentInput += ' − ';
        updateDisplay();
    }
    if (e.key === '*') {
        currentInput += ' × ';
        updateDisplay();
    }
    if (e.key === '/') {
        currentInput += ' ÷ ';
        updateDisplay();
    }

    if (e.key === '(') {
        currentInput += '(';
        updateDisplay();
    }
    if (e.key === ')') {
        currentInput += ')';
        updateDisplay();
    }

    if (e.key === 'Enter') {
        e.preventDefault();
        calculate();
    }

    if (e.key === 'Backspace') {
        e.preventDefault();
        deleteLast();
    }

    if (e.key === 'Escape') {
        clearAll();
    }
});

updateDisplay();