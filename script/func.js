import {showHeader} from "./functions.js";
import {closeHeader} from "./functions.js";
import {reset, cooking} from "./script.js";


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

// *******************  Функция создания header  ********************************************//
export function buildHeader() {
    const header = createElementDom('div', 'header');
    const h1 = createElementDom('h1');
    h1.textContent = 'Pizza shop';
    const headerNav = createElementDom('nav', 'header__nav');
    header.append(h1, headerNav);
    const ulHeader = createElementDom('ul', 'header__nav-list');
    const person = createElementDom('span', 'material-icons');
    person.classList.add('header-icons');
    person.textContent = 'person';
    const basket = createElementDom('span', 'material-icons');
    basket.classList.add('header-icons');
    basket.textContent = 'shopping_cart';
    ulHeader.append(createElementDom('li'), createElementDom('li'));
    ulHeader.children[0].append(person);
    ulHeader.children[0].addEventListener('click', () => {
        showHeader('person')
    });
    ulHeader.children[1].append(basket);
    ulHeader.children[1].addEventListener('click', () => {
        showHeader('basket')
    });
    headerNav.append(ulHeader);
    const popupHeader = createElementDom('div', 'popup-header');
    popupHeader.id = 'popup-header';
    const close = createElementDom('span', 'material-icons');
    close.classList.add('close');
    close.textContent = 'close';
    popupHeader.append(createElementDom('div', 'close_popup'));
    popupHeader.children[0].append(close);
    header.append(popupHeader);
    popupHeader.append(createElementDom('h2', 'popup-header-title'));
    close.addEventListener('click', closeHeader);
    return header;
}

// *******************  Функция создания блока input  ***************************************//
function createInput(type, name, value) {
    const fr = document.createDocumentFragment();
    const input = createElementDom('input', `${name}`);
    const label = createElementDom('label');
    label.addEventListener('click', showIcoCheckbox, true);
    input.setAttribute('name', `${name}`);
    input.setAttribute('type', `${type}`);
    if (typeof (value) === 'string') {
        input.setAttribute('id', `${value}`);
        label.setAttribute('for', `${value}`);
        const text = value[0].toUpperCase() + value.slice(1);
        label.textContent = `${text.replace('_', ' ')}`;
    } else {
        input.setAttribute('id', `Size_${value}`);
        label.setAttribute('for', `Size_${value}`);
        const text = value;
        label.textContent = `Size ${text} cm`;
    }

    fr.append(input, label);
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

    for (let i = 0; i < ulForm.children.length; i++) {
        if (title === 'dough' || title === 'size') {
            ulForm.children[i].appendChild(createInput('radio', title, arr[i], arr[i]));
        } else {
            ulForm.children[i].appendChild(createInput('checkbox', title, arr[i], arr[i]));
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
    const y = buildForm(componentsArr, 'components');
    const z = buildForm(additionallyArr, 'additionally');
    containerForm.append(x, u, y, z);
    container.append(containerForm, buildResultBlock());
    return container;
}

// *******************  Функция отображения иконки чекбокса возле инпута  *******************//
export function showIcoCheckbox() {
    const ico = createElementDom('img');
    ico.src = "ico/pizza-checkbox.png";
    ico.setAttribute('alt', 'ico');
    this.before(ico);
}

// *******************  Функция создания блока для отображения пиццы  ***********************//
export function buildResultBlock() {
    const resultBlock = createElementDom('div', 'result');
    const imageBlockContainer = createElementDom('div', 'information_image');
    const imageBlock = createElementDom('div', 'img_container_block');
    const imgDough = createElementDom('div', 'img_dough_block');
    const imgComponents = createElementDom('div', 'img_dough_block');
    const imgSouse = createElementDom('div', 'img_dough_block');
    resultBlock.append(imageBlockContainer);
    imageBlockContainer.append(imageBlock);
    imageBlock.append(imgDough, imgComponents, imgSouse);
    const infoBlock = createElementDom('div', 'block-btn');
    resultBlock.append(infoBlock);
    const resultInfoBlock = createElementDom('div', 'result-info');
    infoBlock.append(resultInfoBlock);
    const cost = createElementDom('div', 'information_cost');
    cost.setAttribute('id', 'information_cost');
    cost.textContent = 'Cost';
    const calories = createElementDom('div', 'information_calories');
    calories.setAttribute('id', 'information_calories');
    calories.textContent = 'Calories';
    const btnBlock = createElementDom('div', 'block-btn');
    const resetBtn = createElementDom('div', 'btn');
    resetBtn.textContent = 'reset';
    resetBtn.addEventListener('click', reset);
    const calculateBtn = createElementDom('div', 'btn');
    calculateBtn.textContent = 'calculate';
    calculateBtn.addEventListener('click', cooking);
    const toBasketBtn = createElementDom('div', 'btn');
    toBasketBtn.textContent = 'to basket';
    btnBlock.append(resetBtn, calculateBtn, toBasketBtn);
    resultInfoBlock.append(cost, calories, btnBlock);

    return resultBlock;
}

