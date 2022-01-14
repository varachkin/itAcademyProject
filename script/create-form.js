import {reset} from "./script.js";
import {calculate, toBasket} from "./calculate.js";


const doughArr = ['Standard', 'Thin', 'Thick', 'Calzone', 'Italian'];
const sizeArr = [32, 40, 45];
const componentsArr = ['Cheese', 'Bacon', 'Tomato', 'Paprika', 'Corn', 'Pineapple', 'Olives', 'Shrimp', 'Mushrooms', 'Greens'];
const additionallyArr = ['Cheese_sauce', 'Tomato_sauce', 'Spicy_sauce', 'Mustard_sauce', 'Wasabi'];


// *******************  Функция создания элементов и добавления классов  ********************//
export function createElementDom(tag, className) {
    const el = document.createElement(tag);
    if (className !== undefined) {
        el.classList.add(className);
    }
    return el;
}

// *******************  Функция создания блока input  ***************************************//
function createInput(type, name, value) {
    const fr = document.createDocumentFragment();
    const input = createElementDom('input');
    const label = createElementDom('label', `${name}`);
    label.addEventListener('click', showIcoCheckbox, true);
    input.setAttribute('name', `${name}`);
    input.setAttribute('type', `${type}`);
    const ico = createElementDom('img', 'ico-checkbox');
    ico.setAttribute('alt', 'ico');

    if (typeof (value) === 'string') {
        input.setAttribute('id', `${value}`);
        label.setAttribute('for', `${value}`);
        const text = value[0].toUpperCase() + value.slice(1);
        label.textContent = `${text.replace('_', ' ')}`;
    } else {
        input.setAttribute('id', `Size_${value}`);
        label.setAttribute('for', `Size_${value}`);
        const text = value;
        if (window.screen.width > 350) {
            label.textContent = `Size ${text}`;
        } else {
            label.textContent = `${text} cm`;
        }
    }
    fr.append(input, label, ico);
    return fr;
}

// *******************  Функция создания формы с инпутами  **********************************//
export function buildForm(arr, title) {
    const form = createElementDom('form', 'form');
    const h3 = createElementDom('h3');
    form.append(h3);
    h3.textContent = title[0].toUpperCase() + title.slice(1);
    form.append(createElementDom('ul'));
    const ulForm = form.children[1];
    for (let i = 0; i < arr.length; i++) {
        const li = createElementDom('li');
        ulForm.append(li);
    }

    for (let i = 0; i < Array.from(ulForm.children).length; i++) {
        if (title === 'dough' || title === 'size') {
            const input = createInput('radio', title, arr[i], arr[i]);
            ulForm.children[i].appendChild(input);
        } else {
            const input = createInput('checkbox', title, arr[i], arr[i]);
            ulForm.children[i].appendChild(input);
        }

    }
    return form
}

// *******************  Функция создания блока с формами выбора  ****************************//
export function buildFormBlock() {
    const container = createElementDom('div', 'container');
    const containerForm = createElementDom('div', 'container__form');
    const x = buildForm(doughArr, 'dough');
    const u = buildForm(sizeArr, 'size');
    const y = buildForm(componentsArr, 'filling');
    const z = buildForm(additionallyArr, 'sauce');
    containerForm.append(x, u, y, z);
    container.append(containerForm, buildResultBlock());
    return container;
}

// *******************  Функция отображения иконки чекбокса возле инпута  *******************//
export function showIcoCheckbox() {
    setTimeout(() => {
        if (this.previousSibling.checked) {
            this.nextSibling.src = "ico/pizza-checkbox.png";
        }
    }, 0);
}

// *******************  Функция создания блока для отображения пиццы  ***********************//
export function buildResultBlock() {
    const resultBlock = createElementDom('div', 'result');
    const imageBlockContainer = createElementDom('div', 'information_image');
    const imageBlock = createElementDom('div', 'img_container_block');
    const imgDough = createElementDom('div', 'img_dough_block');
    for (let i = 0; i < 5; i++) {
        imgDough.append(createElementDom('img', 'img_dough'));
    }
    const imgComponents = createElementDom('div', 'img_components_block');
    for (let i = 0; i < 10; i++) {
        imgComponents.append(createElementDom('img', 'img_components'));
    }
    const imgSouse = createElementDom('div', 'img_additionally_block');
    for (let i = 0; i < 5; i++) {
        imgSouse.append(createElementDom('img', 'img_additionally'));
    }
    const infoBlock = createElementDom('div', 'block-btn');
    const resultInfoBlock = createElementDom('div', 'result-info');
    const cost = createElementDom('div', 'information_cost');
    const costSpan = createElementDom('span');
    const costSpanResult = createElementDom('span');
    const costSpanSymbol = createElementDom('span');
    costSpanSymbol.setAttribute('id', 'cost-symbol');
    costSpanResult.setAttribute('id', 'information_cost');
    costSpan.textContent = 'Cost: ';
    cost.append(costSpan, costSpanResult, costSpanSymbol);
    const calories = createElementDom('div', 'information_calories');
    const caloriesSpan = createElementDom('span');
    const caloriesSpanResult = createElementDom('span');
    const caloriesSpanSymbol = createElementDom('span');
    caloriesSpanSymbol.setAttribute('id', 'calories-symbol');
    caloriesSpanResult.setAttribute('id', 'information_calories');
    caloriesSpan.textContent = 'Calories: ';
    calories.append(caloriesSpan, caloriesSpanResult, caloriesSpanSymbol);
    const btnBlock = createElementDom('div', 'block-btn');
    const resetBtn = createElementDom('div', 'btn');
    resetBtn.textContent = 'reset';
    resetBtn.addEventListener('click', reset);
    const calculateBtn = createElementDom('div', 'btn');
    calculateBtn.textContent = 'calculate';
    calculateBtn.addEventListener('click', calculate);
    const toBasketBtn = createElementDom('div', 'btn');
    toBasketBtn.textContent = 'to basket';
    toBasketBtn.addEventListener('click', toBasket);
    resultBlock.append(imageBlockContainer);
    imageBlockContainer.append(imageBlock);
    imageBlock.append(imgDough, imgComponents, imgSouse);
    resultBlock.append(infoBlock);
    infoBlock.append(resultInfoBlock);
    btnBlock.append(resetBtn, calculateBtn, toBasketBtn);
    resultInfoBlock.append(cost, calories, btnBlock);
    return resultBlock;
}

