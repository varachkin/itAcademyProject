import {buildHeader, showHeader} from "./header.js";
import {createLoginForm} from "./create-login-form.js";
import {createPopup} from "./popup.js";
import {buildFormBlock} from "./create-form.js";
import {addListenersLabel, disableInputs, enableInputs} from "./show-pizza.js";
import {signOut} from "./create-login-form.js";
import {buildLoader} from "./loader.js";

document.querySelector('#root').append(buildHeader(), buildLoader());

if (localStorage.length === 0 || localStorage.getItem('sign in') === 'false') {
    document.querySelector('#root').append(createLoginForm())
} else {
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) === 'sign in') {
            document.querySelector('#root').append(buildFormBlock());
            document.querySelector('h1').textContent = 'Create pizza';
            addListenersLabel();
            const ulHeader = document.querySelector('.header__nav-list');
            ulHeader.children[0].addEventListener('click', showHeader);
            ulHeader.children[1].addEventListener('click', showHeader);
            setTimeout(signOut, 600000);
        }
    }
    const doughArr = document.getElementsByName('dough');
    for (let el of Array.from(doughArr)) {
        if (!el.checked) {
            disableInputs();
        } else {
            enableInputs();
            break;
        }
    }
}

document.querySelector('#root').after(createPopup());


