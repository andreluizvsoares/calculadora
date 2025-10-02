class Calculator {
    constructor() {
        this.previousOperandElement = document.querySelector('.previous-operand');
        this.currentOperandElement = document.querySelector('.current-operand');
        this.clear();

        // Adicionar event listeners para teclas do teclado
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') this.currentOperand = '0';
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString();
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
        this.animateButton(number);
    }

    chooseOperation(operation) {
        if (this.currentOperand === '0') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '0';
        this.animateButton(operation);
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    alert('Não é possível dividir por zero!');
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }

        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
    }

    animateButton(value) {
        const button = Array.from(document.querySelectorAll('button')).find(btn => 
            btn.textContent === value.toString());
        if (button) {
            button.style.transform = 'scale(1.2)';
            setTimeout(() => {
                button.style.transform = '';
            }, 100);
        }
    }

    handleKeyboard(e) {
        if (e.key >= '0' && e.key <= '9' || e.key === '.') this.appendNumber(e.key);
        if (e.key === '=' || e.key === 'Enter') this.compute();
        if (e.key === 'Backspace') this.delete();
        if (e.key === 'Escape') this.clear();
        if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
            const operation = e.key === '*' ? '×' : e.key === '/' ? '÷' : e.key;
            this.chooseOperation(operation);
        }
    }

    updateDisplay() {
        this.currentOperandElement.textContent = this.currentOperand;
        if (this.operation != null) {
            this.previousOperandElement.textContent = `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandElement.textContent = this.previousOperand;
        }
    }
}

const calculator = new Calculator();

document.querySelectorAll('.number, .operator').forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('number')) {
            calculator.appendNumber(button.textContent);
        } else {
            calculator.chooseOperation(button.textContent);
        }
        calculator.updateDisplay();
    });
});

document.querySelector('.equals').addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

document.querySelector('.clear').addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

document.querySelector('.delete').addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});