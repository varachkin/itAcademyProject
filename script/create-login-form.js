import {createElementDom} from "./create-form.js";


// *******************  Функция создания формы логина  ***************************************//
export function createLoginForm() {
    const wrapper = createElementDom('div', 'wrapper');
    const page = createElementDom('div', 'page');
    wrapper.append(page);
    const imgBlock = createElementDom('div', 'img-block');
    page.append(imgBlock);
    const h2 = createElementDom('h2');
    const form = createElementDom('form', 'main-form');
    form.setAttribute('action', '');
    h2.textContent = 'Login form';
    imgBlock.append(h2, form);
    const eyeOpen = createElementDom('span', 'eye');
    eyeOpen.setAttribute('id', 'eye');
    eyeOpen.classList.add('material-icons');
    eyeOpen.textContent = 'visibility';
    const eyeOff = createElementDom('span', 'eye-off');
    eyeOff.setAttribute('id', 'eye-off');
    eyeOff.classList.add('material-icons');
    eyeOff.textContent = 'visibility_off';
    const labelEmail = createLabel('input-form', 'email');
    const labelPass = createLabel('input-form', 'password', [eyeOpen, eyeOff]);
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
    return wrapper;
}

// *******************  Функция создания label для формы логина  *****************************//
function createLabel(className, type, arr) {
    const label = createElementDom('label', className);
    const span = createElementDom('span');
    span.textContent = (type[0].toUpperCase() + type.slice(1)).replace('-', ' ');
    span.style.color = '#404040';
    const input = createElementDom('input');
    input.setAttribute('id', type);
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
export function showEye(eye, eyeOff) {
    const password = document.querySelector('#password');
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