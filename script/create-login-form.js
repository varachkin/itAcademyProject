import {buildFormBlock, createElementDom} from "./create-form.js";
import {animationPizza} from "./animation-start.js";
import {viewPopup} from "./popup.js";
import {addListenersLabel, disableInputs} from "./show-pizza.js";
import {closeHeader, showHeader} from "./header.js";
import {closeLoader, showLoader} from "./loader.js";

const form = createElementDom('form', 'main-form');


// *******************  Класс создающий пользователя  *****************************************//
class User {
    constructor(lastName, firstName, email, pass, date) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.email = email;
        this.pass = encryptPass(pass);
        this.date = date;
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
    h2.textContent = 'Login';
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
    labelEmail.setAttribute('aria-label', 'Examle: email@email.email');
    labelEmail.setAttribute('data-microtip-position', 'bottom-right');
    labelEmail.setAttribute('role', 'tooltip');
    const labelPass = createLabel('input-form', 'password', 'password', [eyeOpenPass, eyeOffPass]);
    labelPass.setAttribute('aria-label', 'Minimum 8 characters (A-a, 0-9)');
    labelPass.setAttribute('data-microtip-position', 'bottom-right');
    labelPass.setAttribute('role', 'tooltip');
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

    async function createImg() {
        for (let i = 1; i < 9; i++) {
            const img = createElementDom('img');
            img.setAttribute('alt', 'pizza');
            img.setAttribute('id', `img-${i}`);
            await img.setAttribute('src', `img/startpizza/${i}.png`);
            await imgBlock.append(img);
        }
    }

    createImg();
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
        firstName.setAttribute('aria-label', 'Minimum 2 characters (A-a, 0-9)');
        firstName.setAttribute('data-microtip-position', 'bottom-right');
        firstName.setAttribute('role', 'tooltip');
        const lastName = createLabel('input-form', 'text', 'last name');
        lastName.setAttribute('id', 'last-name');
        lastName.setAttribute('aria-label', 'Minimum 2 characters (A-a, 0-9)');
        lastName.setAttribute('data-microtip-position', 'bottom-right');
        lastName.setAttribute('role', 'tooltip');
        const confPass = createLabel('input-form', 'password', 'confirm password', [eyeOpenConfPass, eyeOffConfPass]);
        confPass.setAttribute('id', 'conf-password');
        confPass.setAttribute('aria-label', 'Minimum 6 characters (A-a, 0-9)');
        confPass.setAttribute('data-microtip-position', 'bottom-right');
        confPass.setAttribute('role', 'tooltip');
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
            viewPopup('Registration ERROR', `You need to fill in the fields:`, `${emptyInputArr.join(', ')}`, '', 'try again');
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
            viewPopup('Registration ERROR', `Incorrectly entered fields of: `, `${arr.join(', ')}`, '', 'try again');
            return;
        }
        const passArr = Array.from(document.querySelectorAll('.password'));
        console.log(passArr[0].value);
        console.log(passArr[1].value);
        if (passArr[0].value !== passArr[1].value) {
            viewPopup('Registration ERROR', `Password mismatch`, '', '', 'try again');
            return;
        }
        const user = new User(arrInput[0].value, arrInput[1].value, arrInput[2].value, arrInput[3].value);
        for (let key in localStorage) {
            if (key === arrInput[2].value) {
                viewPopup('Registration ERROR', `User name already exists: `, `${arrInput[2].value} `, '', 'try again');
                return;
            }
        }
        localStorage.setItem(arrInput[2].value, JSON.stringify(user));
        viewPopup('Registration successfully', ``, '', '', 'enter the application');
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

// *******************  Функция входа в приложение  ******************************************//
export function signIn() {
    const arrLabel = document.querySelectorAll('.input-form');
    if (arrLabel.length > 2) {
        document.querySelector('#last-name').remove();
        document.querySelector('#first-name').remove();
        document.querySelector('#conf-password').remove();
        return;
    }
    const emptyInputArr = Array.from(document.getElementsByClassName('input-login')).reduce((acc, el) => {
        if (el.value === '') {
            acc.push(el.offsetParent.innerText.replace('visibility', ''));
        }
        return acc;
    }, []);
    if (emptyInputArr.length > 0) {
        viewPopup('Entrance is not possible', `You need to fill in the fields:`, ` ${emptyInputArr.join(', ')}`, '', 'try again');
    } else {
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);

            if (key === document.querySelector('.email').value) {
                const objUser = JSON.parse(localStorage.getItem(key));
                if (decryptPass(objUser.pass) === document.querySelector('.password').value) {
                    showLoader();
                    setTimeout(() => {
                        document.querySelector('.wrapper').style.display = 'none';
                        document.querySelector('h1').textContent = 'Create pizza';
                        const formBlock = document.querySelector('.container');
                        if (formBlock === null) {
                            document.querySelector('#root').append(buildFormBlock());
                        } else {
                            formBlock.style.display = 'block'
                        }
                        const ulHeader = document.querySelector('.header__nav-list');
                        ulHeader.children[0].addEventListener('click', showHeader);
                        ulHeader.children[1].addEventListener('click', showHeader);
                        localStorage.setItem('current user', `${document.querySelector('.email').value}`);
                        addListenersLabel();
                        disableInputs();
                        const d = new Date();
                        const hour = d.getHours().toString().length === 1 ? '0' + d.getHours() : d.getHours();
                        const min = d.getMinutes().toString().length === 1 ? '0' + d.getMinutes() : d.getMinutes();
                        const sec = d.getSeconds().toString().length === 1 ? '0' + d.getSeconds() : d.getSeconds();
                        const date = hour + ':' + min + ':' + sec;
                        const user = JSON.parse(localStorage.getItem(`${document.querySelector('.email').value}`));
                        user.date = date;
                        localStorage.setItem(`${localStorage.getItem('current user')}`, `${JSON.stringify(user)}`);
                        localStorage.setItem('sign in', 'true');
                        setTimeout(signOut, 600000);
                        closeLoader();
                    }, 3000);

                } else {
                    viewPopup('Error password', `Password is not correct `, '', '', 'try again')
                }
                return;
            }
        }

        const email = document.querySelector('.email').value;
        viewPopup('Error login', `User named`, ` ${email} `, `does not exist. Check the correctness of the entry or register`, 'try again');
    }
}

// *******************  Функция выхода из приложение  ****************************************//
export function signOut() {
    const formBlock = document.querySelector('.container');
    const formBlockSign = document.querySelector('.wrapper');
    const inputPass = document.querySelector('.password');
    const h1 = document.querySelector('h1');
    console.dir(inputPass);
    if (document.querySelector('.img-block') !== null) {
        document.querySelector('.img-block').classList.add('img-block-animation');
    }

    if (inputPass !== null) {
        inputPass.value = '';
        inputPass.classList.remove('valid');
        inputPass.classList.remove('valid-error');
    }
    formBlock.style.display = 'none';
    if (formBlockSign !== null) {
        formBlockSign.style.display = 'block';
    } else {
        document.querySelector('#root').append(createLoginForm());
        document.querySelector('.img-block').classList.add('img-block-animation');
    }
    h1.textContent = 'Pizza shop';
    const ulHeader = document.querySelector('.header__nav-list');
    ulHeader.children[0].removeEventListener('click', showHeader);
    ulHeader.children[1].removeEventListener('click', showHeader);
    localStorage.setItem('sign in', 'false');
    localStorage.setItem('current user', '');
    closeHeader();
}