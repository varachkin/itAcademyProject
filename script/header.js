import {createElementDom} from "./create-form.js";

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
    person.setAttribute('id', 'person');
    const basket = createElementDom('span', 'material-icons');
    basket.classList.add('header-icons');
    basket.setAttribute('id', 'basket');
    basket.textContent = 'shopping_cart';
    ulHeader.append(createElementDom('li'), createElementDom('li'));
    ulHeader.children[0].append(person);
    ulHeader.children[1].append(basket);
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

//***************   Функция открытия меню  хедера  ***************************
export function showHeader() {
    const popup = document.querySelector('#popup-header');
    const titlePopup = document.querySelector('.popup-header-title');
    switch (this.firstChild.id) {
        case 'person':
            titlePopup.innerText = 'Personal data';
            const ulPopupHeader = document.createElement('ul');
            ulPopupHeader.classList.add('popup-header-container-info');
            for (let i = 0; i < 4; i++) {
                let li = document.createElement('li');
                li.classList.add('popup-li');
                ulPopupHeader.append(li);
            }
            const arrUlPopup = document.querySelectorAll('.popup-li');
            for (let el of arrUlPopup) {
                el.append(document.createElement("span").innerText);
            }
            popup.append(ulPopupHeader);
            break;
        case 'basket':
            titlePopup.innerText = 'Your basket';
            break;
    }

    popup.style.transform = 'perspective(500px) translate(0, 0) rotateX(0)';
}

//***************   Функция закрытия меню  хедера  ***************************
export function closeHeader() {
    const popup = document.querySelector('#popup-header');
    popup.style.transform = 'perspective(200px) translate(0, -100%) rotateX(45deg)'
}