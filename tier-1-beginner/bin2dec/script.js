const clearBtn = document.getElementById('clearBtn');
const convertBtn = document.getElementById('convertBtn');
const decimalOutput = document.getElementById('decimalOutput');
const binaryInput = document.getElementById('binaryInput');
const errorMessage = document.getElementById('errorMessage');

function isValidBinary(input) {
    if (input.length == 0) {
        return {
            valid: false,
            message: "Please enter a binary number"
        };
    }

    for (let i = 0; i < input.length; i++) {
        if (input[i] != 0 && input[i] != 1) {
            return {
                valid: false,
                message: "Please enter 0 or 1"
            };
        }
    }
    if (input.length > 8) {
        return {
            valid: false,
            message: "Cannot exceed 8 digit"
        };
    }
    return {
        valid: true,
        message: null
    };
}

function binaryToDecimal(binary) {
    let decimal = 0, pos = 0;
    for (let i = binary.length - 1; i >= 0; i--) {
        if (binary[i] == 1) {
            decimal += Math.pow(2, pos);
        }
        pos++;
    }
    return decimal;
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

function hideError() {
    errorMessage.classList.add('hidden');
}

function handleConvert() {
    const binary = binaryInput.value.trim();
    const validation = isValidBinary(binary);

    if (!validation.valid) {
        showError(validation.message);
        decimalOutput.textContent = '-';
        return;
    }

    hideError();
    const decimal = binaryToDecimal(binary);
    decimalOutput.textContent = decimal;
    decimalOutput.style.transform = 'scale(1.1)';
    setTimeout(() => { decimalOutput.style.transform = 'scale(1)'; }, 200);
}

function handleClear() {
    binaryInput.value = null;
    decimalOutput.textContent = null;
    hideError();
    binaryInput.focus();
}

convertBtn.addEventListener('click', handleConvert);
clearBtn.addEventListener('click', handleClear);

binaryInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleConvert();
    }
});