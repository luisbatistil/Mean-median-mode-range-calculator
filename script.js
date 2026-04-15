const inputbox = document.getElementById('inputbox');

document.getElementById('inputadd').onclick = function() {
    let container = document.createElement('div');
    container.innerHTML = `
        <input type="text" class="value">  
        <button class="delete">delete</button>    
    `;
    inputbox.append(container);

    container.querySelector('.delete').onclick = function() {
        container.remove();
    }
}


document.getElementById('deleteall').onclick = function() {
    inputbox.innerHTML = '';
    document.getElementById('mean').textContent = ``;
    document.getElementById('median').textContent = ``;
    document.getElementById('mode').textContent = ``;
    document.getElementById('range').textContent = ``;
}


document.getElementById('calculate').onclick = function() {
    document.getElementById('mean').textContent = calculateMean();
    document.getElementById('median').textContent = calculateMedian();
    document.getElementById('mode').textContent = calculateMode();
    document.getElementById('range').textContent = calculaterange();
}


function getAllInputValues() {
    const inputs = inputbox.querySelectorAll('.value');
    return Array.from(inputs)
        .map(input => Number(input.value))
        .filter(val => !isNaN(val));
}

function calculateMean() {
    const numbers = getAllInputValues();
    if (numbers.length === 0) return '';
    const sum = numbers.reduce((a, b) => a + b, 0);
    const mean = sum / numbers.length;
    return mean.toFixed(2);
}

function calculateMedian() {
    const numbers = getAllInputValues().sort((a, b) => a - b);
    if (numbers.length === 0) return '';
    const mid = Math.floor(numbers.length / 2);
    if (numbers.length % 2 === 0) {
        return (numbers[mid - 1] + numbers[mid]) / 2;
    } else {
        return numbers[mid];
    }
}

function calculateMode() {
    const numbers = getAllInputValues();
    if (numbers.length === 0) return '';
    const freq = {};
    numbers.forEach(num => freq[num] = (freq[num] || 0) + 1);
    let maxFreq = 0;
    let modes = [];
    for (let num in freq) {
        if (freq[num] > maxFreq) {
            maxFreq = freq[num];
            modes = [Number(num)];
        } else if (freq[num] === maxFreq) {
            modes.push(Number(num));
        }
    }
    if (modes.length === numbers.length) return 'No mode';
    return modes.join(', ');
}

function calculaterange() {
    const numbers = getAllInputValues();
    if (numbers.length === 0) return '';
    return Math.max(...numbers) - Math.min(...numbers);
}


