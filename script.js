function findOptimalCombination(rolls, target) {
    const n = rolls.length;
    const targetInMM = target * 1000;
    const dp = Array(targetInMM + 1).fill(0);
    const choice = Array(targetInMM + 1).fill(-1);

    for (let i = 0; i < n; i++) {
        const rollInMM = rolls[i] * 1000;
        for (let j = targetInMM; j >= rollInMM; j--) {
            if (dp[j - rollInMM] + rollInMM > dp[j]) {
                dp[j] = dp[j - rollInMM] + rollInMM;
                choice[j] = i;
            }
        }
    }

    let bestSum = dp[targetInMM];
    const result = [];
    while (bestSum > 0 && choice[bestSum] != -1) {
        result.push(rolls[choice[bestSum]]);
        bestSum -= rolls[choice[bestSum]] * 1000;
    }

    // Сортировка от большего к меньшему
    result.sort((a, b) => b - a);

    return result;
}

function calculate() {
    const targetInput = document.getElementById("target").value.replace(',', '.').trim();
    const rollsInput = document.getElementById("rolls").value.replace(/,/g, '.').trim();
    
    if (targetInput === "" && rollsInput === "") {
        document.getElementById("result").textContent = "Пожалуйста, заполните все поля.";
        return;
    }
    if (targetInput === "") {
        document.getElementById("result").textContent = "Пожалуйста, заполните поле целевой длины.";
        return;
    }
    if (rollsInput === "") {
        document.getElementById("result").textContent = "Пожалуйста, заполните поле списка рулонов.";
        return;
    }

    const target = parseFloat(targetInput);
    const rolls = rollsInput.split(/\s+/).map(item => parseFloat(item));
    const optimalCombination = findOptimalCombination(rolls, target);

    if (optimalCombination.length === 0) {
        document.getElementById("result").textContent = "Оптимальная комбинация рулонов: не найдено";
    } else {
        const totalLength = optimalCombination.reduce((sum, roll) => sum + roll, 0);
        const resultText = `Оптимальная комбинация рулонов: ${optimalCombination.join(", ")}\nСуммарная длина: ${parseFloat(totalLength.toFixed(3)).toString()} метров`;
        document.getElementById("result").textContent = resultText;
    }
}

function restrictInput(event, field) {
    const char = String.fromCharCode(event.which);
    if (field === 'rolls' && !/[0-9\s.,]/.test(char)) {
        event.preventDefault();
    }
    if (field === 'target' && !/[0-9.,]/.test(char)) {
        event.preventDefault();
    }
}
