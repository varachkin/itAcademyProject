import {createElementDom} from "./create-form.js";

const form = createElementDom('form', 'main-form');

// *******************  Функция создания формы логина  ***************************************//
export function createLoginForm() {
    const wrapper = createElementDom('div', 'wrapper');
    const page = createElementDom('div', 'page');
    wrapper.append(page);
    const imgBlock = createElementDom('div', 'img-block');
    page.append(imgBlock);
    const h2 = createElementDom('h2');
    form.setAttribute('action', '');
    h2.textContent = 'Login form';
    imgBlock.append(h2, form);
    const eyeOpenPass = createElementDom('span', 'eye');
    const eyeOffPass = createElementDom('span', 'eye-off');
    eyeOffPass.classList.add('material-icons');
    eyeOffPass.textContent = 'visibility_off';
    eyeOpenPass.setAttribute('id', 'eye');
    eyeOpenPass.classList.add('material-icons');
    eyeOpenPass.textContent = 'visibility';
    eyeOffPass.setAttribute('id', 'eye-off');
    const labelEmail = createLabel('input-form', 'email', 'email');
    labelEmail.setAttribute('id', 'email');
    const labelPass = createLabel('input-form', 'password', 'password', [eyeOpenPass, eyeOffPass]);
    labelPass.setAttribute('id', 'password');
    form.append(labelEmail, labelPass);
    const btnBlock = createElementDom('div', 'main-form-button-block');
    const reg = createElementDom('div', 'btn');
    reg.textContent = 'Register';
    const sign = createElementDom('div', 'btn');
    sign.textContent = 'Sign in';
    btnBlock.append(reg, sign);
    imgBlock.append(btnBlock);
    for (let i = 1; i < 9; i++) {
        const img = createElementDom('img');
        img.setAttribute('alt', 'pizza');
        img.setAttribute('id', `img-${i}`);
        img.setAttribute('src', `img/startpizza/${i}.png`);
        imgBlock.append(img);
    }
    reg.addEventListener('click', showRegistration);
    return wrapper;
}

// *******************  Функция создания формы регистрации  **********************************//
function showRegistration() {
    const eyeOpenConfPass = createElementDom('span', 'eye');
    const eyeOffConfPass = createElementDom('span', 'eye-off');
    eyeOpenConfPass.classList.add('material-icons');
    eyeOpenConfPass.textContent = 'visibility';
    eyeOffConfPass.classList.add('material-icons');
    eyeOffConfPass.textContent = 'visibility_off';
    const firstName = createLabel('input-form', 'text', 'first name');
    firstName.setAttribute('id', 'first-name');
    const lastName = createLabel('input-form', 'text', 'last name');
    lastName.setAttribute('id', 'last-name');
    const confPass = createLabel('input-form', 'password', 'confirm password', [eyeOpenConfPass, eyeOffConfPass]);
    confPass.setAttribute('id', 'conf-password');
    form.prepend(lastName, firstName);
    form.append(confPass);
}

// *******************  Функция создания label для формы логина  *****************************//
function createLabel(className, type, text, arr) {
    const label = createElementDom('label', className);
    const span = createElementDom('span');
    span.textContent = (text[0].toUpperCase() + text.slice(1)).replace('-', ' ');
    span.style.color = '#404040';
    const input = createElementDom('input');
    input.setAttribute('type', type);
    label.append(span, input);
    if (arr) {
        for (let el of arr) {
            label.append(el);
        }
    }
    return label;
}

// *******************  Функция отображения пароля в поле пароль  ****************************//
// const password = document.querySelector('#password');

export function showEye(eye, eyeOff) {

    if (eye.style.display === 'none') {
        eyeOff.style.display = 'none';
        eye.style.display = 'inline';
        password.setAttribute('type', 'password');
        password.style.color = '#ffffff';
    } else {
        eye.style.display = 'none';
        eyeOff.style.display = 'inline';
        password.setAttribute('type', 'text');
        password.style.color = '#ff4a2a';
    }
}