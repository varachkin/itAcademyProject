import {createElementDom} from "./create-form.js";
import {signOut} from "./create-login-form.js";


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
    popupHeader.setAttribute('id', 'popup-header');
    header.append(popupHeader);
    const close = createElementDom('span', 'material-icons');
    close.classList.add('close');
    close.textContent = 'close';
    close.addEventListener('click', closeHeader);
    const ulPopupHeader = document.createElement('ul');

    const popup = createElementDom('div');
    popup.setAttribute('id', 'popup-header');
    const titlePopup = createElementDom('h2', 'popup-header-title');
    const btn = createElementDom('div', 'btn');
    btn.setAttribute('id', 'header-btn');
    const ico = createElementDom('img');
    const h3 = createElementDom('h3', 'name-user');
    h3.setAttribute('id', 'fullNameHeader');
    const btnBlock = createElementDom('div', 'block-btn');

    popupHeader.append(createElementDom('div', 'close_popup'));
    popupHeader.children[0].append(close);

    const icoHeaderPopup = createElementDom('div', 'ico-header-popup');
    popupHeader.append(createElementDom('h2', 'popup-header-title'), icoHeaderPopup, ulPopupHeader);
    icoHeaderPopup.append(ico);
    ico.setAttribute('src', 'img/header-person.png');


    ulPopupHeader.classList.add('popup-header-container-info');
    for (let i = 0; i < 4; i++) {
        let li = document.createElement('li');
        li.classList.add('popup-li');
        const spanTitle = createElementDom('span', 'header-span-title');
        const spanDescription = createElementDom('span', 'header-span-description');
        li.append(spanTitle, spanDescription);
        ulPopupHeader.append(li);
    }
    const arrUlPopup = document.querySelectorAll('.popup-li');
    for (let el of arrUlPopup) {
        el.append(document.createElement("span"));
    }


    btn.textContent = 'sign out';
    btnBlock.append(btn);
    popupHeader.append(h3, ulPopupHeader, btnBlock);


    return header;
}

// *******************  Функция создания popupHeader  ********************************************//
function buildPopupHeader() {


    // popup.append(close)
}

//***************   Функция открытия меню  хедера  ***************************
export function showHeader() {
    const title = document.querySelector('.popup-header-title');
    const fullName = document.querySelector('#fullNameHeader');
    const liArr = Array.from(document.querySelectorAll('.popup-li'));
    const btn = document.querySelector('#header-btn');
    const currentUser = localStorage.getItem('current user');
    const user = JSON.parse(localStorage.getItem(currentUser));
    switch (this.firstChild.id) {
        case 'person':
            title.textContent = 'Personal data';
            fullName.textContent = user.firstName + ' ' + user.lastName;
            liArr[0].firstChild.textContent = 'Email: ';
            liArr[0].lastChild.textContent = user.email;
            liArr[1].firstChild.textContent = 'First name: ';
            liArr[1].lastChild.textContent = user.firstName;
            liArr[2].firstChild.textContent = 'Last name: ';
            liArr[2].lastChild.textContent = user.lastName;
            liArr[3].firstChild.textContent = 'Entry time: ';
            liArr[3].lastChild.textContent = user.date;
            btn.textContent = 'Sign out';
            btn.addEventListener('click', signOut);
            break;
        case 'basket':
            console.log(user);
            title.textContent = 'Your basket';
            fullName.textContent = user.firstName + ' ' + user.lastName;
            liArr[0].firstChild.textContent = 'Dough: ';
            liArr[1].firstChild.textContent = 'Size: ';
            liArr[2].firstChild.textContent = 'Filling: ';
            liArr[3].firstChild.textContent = 'Sauce: ';
            btn.textContent = 'buy now';
            if (user.hasOwnProperty('pizza') && user.pizza.DoughObj.name.length > 0) {
                liArr[0].lastChild.textContent = user.pizza.DoughObj.name;
                liArr[1].lastChild.textContent = user.pizza.SizeObj.name.replaceAll('_', ' ');
                liArr[2].lastChild.textContent = user.pizza.FillingObj.name.join(', ');
                liArr[3].lastChild.textContent = user.pizza.SauceObj.name.join(', ').replaceAll('_', ' ');
            } else {
                liArr[0].lastChild.textContent = 'unknown';

                liArr[1].lastChild.textContent = 'unknown';

                liArr[2].lastChild.textContent = 'unknown';

                liArr[3].lastChild.textContent = 'unknown';


            }
            btn.removeEventListener('click', signOut);
            break;
    }
    const popup = document.querySelector('#popup-header');
    popup.style.transform = 'perspective(500px) translate(0, 0) rotateX(0)';
}

//***************   Функция закрытия меню  хедера  ***************************
export function closeHeader() {
    const popup = document.querySelector('#popup-header');
    popup.style.transform = 'perspective(200px) translate(0, -100%) rotateX(45deg)'
}