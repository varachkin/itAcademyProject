import {buildHeader, showHeader} from "./header.js";
import {createLoginForm} from "./create-login-form.js";
import {createPopup} from "./popup.js";
import {buildFormBlock} from "./create-form.js";
import {addListenersLabel, disableInputs, enableInputs} from "./show-pizza.js";
import {signOut} from "./create-login-form.js";
import {buildLoader} from "./loader.js";


const timeOut = 600;

document.querySelector('#root').append(buildHeader(), buildLoader());

// ****************** функции проверки активности пользователя ******************************//
let notActiveSec = 0;

export function countNotActiveSec() {
    notActiveSec++;
}

export function checkUse() {
    if (notActiveSec >= timeOut && localStorage.getItem('sign in') === 'true') {
        signOut();
    }
    console.log(notActiveSec);
}

export function activeUse() {
    notActiveSec = 0;
}


document.body.addEventListener('mousemove', activeUse);
//**********************************************************************************************//

// *******************  Функция добавления формы логина на странице  *************************//
async function showCreateLoginForm() {
    await document.querySelector('#root').append(createLoginForm());
}

if (localStorage.length === 0 || localStorage.getItem('sign in') === 'false') {
    showCreateLoginForm();
    setTimeout(() => {
        document.querySelector('.img-block').classList.add('img-block-animation')
    }, 500);

} else {
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) === 'sign in') {
            document.querySelector('#root').append(buildFormBlock());
            document.querySelector('h1').textContent = 'Create pizza';
            addListenersLabel();
            const ulHeader = document.querySelector('.header__nav-list');
            ulHeader.children[0].addEventListener('click', showHeader);
            ulHeader.children[1].addEventListener('click', showHeader);
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


