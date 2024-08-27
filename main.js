// Отображение курса валют

const valutes = {};
const elUSD = document.querySelector('[data-value="USD"]');
const elEUR = document.querySelector('[data-value="EUR"]');
const elGBP = document.querySelector('[data-value="GBP"]');

// Инпуты вводы суммы, выбор вылюты и инпут с результатом
const valueInput = document.querySelector('#input');
const inputResult = document.querySelector('#result');
const inputSelect = document.querySelector('#select');

const rubInUSD = document.querySelector('#rubInUSD');
const rubInEUR = document.querySelector('#rubInEUR');
const rubInGBP = document.querySelector('#rubInGBP');

getCurrencies();
getRub();

// Функция вывода 1 рубля в валюте
async function getRub() {
    const response= await fetch('https://www.cbr-xml-daily.ru/latest.js');
    const data = await response.json();
    const result = await data;

    rubInUSD.textContent = '1 RUB = ' + result.rates.USD + ' USD';
    rubInEUR.textContent = '1 RUB = ' + result.rates.EUR + ' EUR';
    rubInGBP.textContent = '1 RUB = ' + result.rates.GBP + ' EUR';
}

// Функция получения валют и отображения
async function getCurrencies() {
    // Получаем данные с сервера и потребляем Promise 
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const data = await response.json();
    const result = await data;

    valutes.USD = result.Valute.USD;
    valutes.EUR = result.Valute.EUR;
    valutes.GBP = result.Valute.GBP;

    // Округляем полученные данные
    elUSD.textContent = valutes.USD.Value.toFixed(2);
    elEUR.textContent = valutes.EUR.Value.toFixed(2);
    elGBP.textContent = valutes.GBP.Value.toFixed(2);


    // Изменение цвета информера
    if (valutes.USD.Value < valutes.USD.Previous) {
        elUSD.classList.add('bottom');
    } else {
        elUSD.classList.add('top');

    }

    if (valutes.EUR.Value < valutes.EUR.Previous) {
        elEUR.classList.add('bottom');
    } else {
        elEUR.classList.add('top');

    }

    if (valutes.GBP.Value < valutes.GBP.Previous) {
        elGBP.classList.add('bottom');
    } else {
        elGBP.classList.add('top');

    }
}

// Функция конвертации - Обращаясь к элементу массива, записываем полученные и округленные данных в инпут 
valueInput.oninput = function () {
    console.log('Победа');
    inputResult.value = (parseFloat(valueInput.value) / valutes[select.value].Value).toFixed(2);
}
