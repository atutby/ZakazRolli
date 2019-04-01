main();

function main() {
    const divEmptyBasket = document.getElementById('emptyBasket');
    const divNotEmptyBasket = document.getElementById('notEmptyBasket');
    // const divAddButton = document.getElementById('addButton');
    const divNumber = document.getElementById('number');
    const divCommonNumber = document.getElementById('commonNumber');

    let currentInBasket = 0;
    let currentNumber = +divNumber.innerText;

    divNotEmptyBasket.style.display = 'none';

    document
        .getElementById('plus')
        .addEventListener('click', () => {
            currentNumber++;
            updateState();
        });

    document
        .getElementById('minus')
        .addEventListener('click', () => {
            if (currentNumber > 1) {
                currentNumber--;
            }
            updateState();
        });

    document
        .getElementById('addButton')
        .addEventListener('click', () => {
        currentInBasket += currentNumber;

        if(currentInBasket) {
            divNotEmptyBasket.style.display = 'block';
            divEmptyBasket.style.display = 'none';
        }
    });

    function updateState() {
        divNumber.innerText = '' + currentNumber;
        divCommonNumber.innerText = divNumber.innerText;
    }
}