import {createElementDom} from "./create-form.js";
import {animationPizza} from "./animation-start.js";
import {viewPopup} from "./popup.js";
import {signIn} from "./functions.js";

const form = createElementDom('form', 'main-form');


// *******************  Класс создающий пользователя  *****************************************//
class User {
    constructor(lastName, firstName, email, pass) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.email = email;
        this.pass = encryptPass(pass);
    }
}

// *******************  Функция создания формы логина  ***************************************//
export function createLoginForm() {
    const wrapper = createElementDom('div', 'wrapper');
    const page = createElementDom('div', 'page');
    page.addEventListener('click', animationPizza);
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
    eyeOpenPass.addEventListener('click', showEye);
    eyeOffPass.addEventListener('click', showEye);
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
    sign.addEventListener('click', signIn);
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
    const arrLabel = document.querySelectorAll('.input-form');
    const arrInput = document.querySelectorAll('.input-login');
    const notValidInputArr = document.getElementsByClassName('error-valid');
    console.log(notValidInputArr);
    console.log(arrInput);
    if (arrLabel.length < 3) {
        const eyeOpenConfPass = createElementDom('span', 'eye');
        const eyeOffConfPass = createElementDom('span', 'eye-off');
        eyeOpenConfPass.classList.add('material-icons');
        eyeOpenConfPass.textContent = 'visibility';
        eyeOffConfPass.classList.add('material-icons');
        eyeOffConfPass.textContent = 'visibility_off';
        eyeOpenConfPass.addEventListener('click', showEye);
        eyeOffConfPass.addEventListener('click', showEye);
        const firstName = createLabel('input-form', 'text', 'first name');
        firstName.setAttribute('id', 'first-name');
        const lastName = createLabel('input-form', 'text', 'last name');
        lastName.setAttribute('id', 'last-name');
        const confPass = createLabel('input-form', 'password', 'confirm password', [eyeOpenConfPass, eyeOffConfPass]);
        confPass.setAttribute('id', 'conf-password');
        form.prepend(lastName, firstName);
        form.append(confPass);
    } else {
        const emptyInputArr = Array.from(arrInput).reduce((acc, el) => {
            if (el.value === '') {
                acc.push(el.offsetParent.innerText.replace('visibility', ''));
            }
            return acc;
        }, []);
        console.log(emptyInputArr);
        if (emptyInputArr.length > 0) {
            viewPopup('Registration ERROR', `You need to fill in the fields: ${emptyInputArr.join(', ')}`, 'try again');
            return;
        }
        if (!Array.from(arrInput).reduce((acc, el) => {
            if (el.isValid) {
                return true;
            } else {
                return false;
            }
        }, false)) {
            let arr = Array.from(notValidInputArr).reduce((acc, el) => {
                console.log(el.type);
                acc.push(el.offsetParent.innerText.replace('visibility', ''));
                return acc;
            }, []);
            viewPopup('Registration ERROR', `Incorrectly entered fields of: ${arr.join(', ')}`, 'try again');
            return;
        }
        const passArr = Array.from(document.querySelectorAll('.password'));
        console.log(passArr[0].value);
        console.log(passArr[1].value);
        if (passArr[0].value !== passArr[1].value) {
            viewPopup('Registration ERROR', `Password mismatch`, 'try again');
            return;
        }
        const user = new User(arrInput[0].value, arrInput[1].value, arrInput[2].value, arrInput[3].value);
        for (let key in localStorage) {
            if (key === arrInput[2].value) {
                viewPopup('Registration ERROR', `User named ${arrInput[2].value} already exists`, 'try again');
                return;
            }
        }
        localStorage.setItem(arrInput[2].value, JSON.stringify(user));
        viewPopup('Registration successfully', ``, 'enter the application');
        document.querySelector('#last-name').remove();
        document.querySelector('#first-name').remove();
        document.querySelector('#conf-password').remove();
    }
}

// *******************  Функция создания label для формы логина  *****************************//
function createLabel(className, type, text, arr) {
    const label = createElementDom('label', className);
    const span = createElementDom('span');
    span.textContent = (text[0].toUpperCase() + text.slice(1)).replace('-', ' ');
    span.style.color = '#404040';
    const input = createElementDom('input', 'input-login');
    input.classList.add(type);
    input.setAttribute('type', type);
    input.isValid = false;
    input.addEventListener('keyup', () => {
        validateForm(input)
    });
    input.addEventListener('click', () => {
        validateForm(input)
    });

    label.append(span, input);
    if (arr) {
        for (let el of arr) {
            label.append(el);
        }
    }
    return label;
}

// *******************  Функция отображения пароля в поле пароль  ****************************//
export function showEye() {
    let eye = this;

    if (eye.textContent === 'visibility') {
        eye.textContent = 'visibility_off';
        const input = eye.previousSibling;
        input.setAttribute('type', 'text');
        input.style.color = '#ffa295';
        eye.style.color = '#ffa295';

    } else {
        eye.textContent = 'visibility';
        const input = eye.previousSibling;
        input.setAttribute('type', 'password');
        input.style.color = '#ffffff';
        eye.style.color = '#ffffff';
    }
}

// *******************  Функция валидации формы регистрации  *********************************//
function validateForm(el) {
    const nameRegExp = /^[a-z а-я,.'-]+$/i;
    const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (el.value) {
        if (el.type === 'text') {
            if (el.classList.contains('password')) {
                if (passRegExp.test(el.value)) {
                    el.classList.add('valid');
                    el.classList.remove('error-valid');
                    el.isValid = true;
                } else {
                    el.classList.remove('valid');
                    el.classList.add('error-valid');
                    el.isValid = false;
                }
                return;
            }
            if (el.value.length > 1 && nameRegExp.test(el.value)) {
                el.classList.add('valid');
                el.classList.remove('error-valid');
                el.isValid = true;
            } else {
                el.classList.remove('valid');
                el.classList.add('error-valid');
                el.isValid = false;
            }
            return;
        }
        if (el.type === 'email') {
            if (emailRegExp.test(el.value)) {
                el.classList.add('valid');
                el.classList.remove('error-valid');
                el.isValid = true;
            } else {
                el.classList.remove('valid');
                el.classList.add('error-valid');
                el.isValid = false;
            }
        }
        if (el.type === 'password') {
            if (passRegExp.test(el.value)) {
                el.classList.add('valid');
                el.classList.remove('error-valid');
                el.isValid = true;
            } else {
                el.classList.remove('valid');
                el.classList.add('error-valid');
                el.isValid = false;
            }
        }
    } else {
        el.classList.remove('valid');
        el.classList.remove('error-valid');
        el.isValid = false;
    }

}

// *******************  Функция кодирования пароля  ******************************************//
export function encryptPass(str) {
    const numArr = ['$one$', '$two$', '$three$', '$four$', '$five$', '$six$', '$seven$', '$eight$', '$nine$', '$zero$'];
    let temp = str.split('');
    for (let i = 0; i < temp.length; i++) {
        switch (temp[i]) {
            case '1':
                temp[i] = numArr[0];
                break;
            case '2':
                temp[i] = numArr[1];
                break;
            case '3':
                temp[i] = numArr[2];
                break;
            case '4':
                temp[i] = numArr[3];
                break;
            case '5':
                temp[i] = numArr[4];
                break;
            case '6':
                temp[i] = numArr[5];
                break;
            case '7':
                temp[i] = numArr[6];
                break;
            case '8':
                temp[i] = numArr[7];
                break;
            case '9':
                temp[i] = numArr[8];
                break;
            case '0':
                temp[i] = numArr[9];
                break;
        }
    }
    return temp.join('');
}

// *******************  Функция декодирования пароля  ****************************************//
export function decryptPass(str) {
    str = str.replaceAll('$one$', '1');
    str = str.replaceAll('$two$', '2');
    str = str.replaceAll('$three$', '3');
    str = str.replaceAll('$four$', '4');
    str = str.replaceAll('$five$', '5');
    str = str.replaceAll('$six$', '6');
    str = str.replaceAll('$seven$', '7');
    str = str.replaceAll('$eight$', '8');
    str = str.replaceAll('$nine$', '9');
    str = str.replaceAll('$zero$', '0');
    return str;
}

