let display = document.getElementById('result');
let currentInput = '0';
let shouldResetDisplay = false;

function updateDisplay() {
    display.value = currentInput;
}

function appendToDisplay(value) {
    if (shouldResetDisplay) {
        currentInput = '0';
        shouldResetDisplay = false;
    }
    
    if (currentInput === '0' && value !== '.') {
        currentInput = value;
    } else {
        currentInput += value;
    }
    
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    updateDisplay();
}

function deleteLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

function calculate() {
    try {
        // Заменяем × на * для вычисления
        let expression = currentInput.replace(/×/g, '*');
        
        // Проверяем деление на ноль
        if (expression.includes('/0')) {
            throw new Error('Деление на ноль');
        }
        
        let result = eval(expression);
        
        // Проверяем на бесконечность и NaN
        if (!isFinite(result)) {
            throw new Error('Ошибка вычисления');
        }
        
        // Округляем результат до 10 знаков после запятой
        result = Math.round(result * 10000000000) / 10000000000;
        
        currentInput = result.toString();
        shouldResetDisplay = true;
        updateDisplay();
    } catch (error) {
        currentInput = 'Ошибка';
        shouldResetDisplay = true;
        updateDisplay();
    }
}

// Поддержка клавиатуры
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9' || key === '.') {
        appendToDisplay(key);
    } else if (key === '+' || key === '-') {
        appendToDisplay(key);
    } else if (key === '*') {
        appendToDisplay('*');
    } else if (key === '/') {
        event.preventDefault();
        appendToDisplay('/');
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    } else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    }
});

// Инициализация
updateDisplay();