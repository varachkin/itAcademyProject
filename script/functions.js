import {viewPopup} from "./popup.js";
import {decryptPass} from "./create-login-form.js";
import {buildFormBlock} from "./create-form.js";
import {addListenersLabel, disableInputs} from "./show-pizza.js";

function createInputForm(x) {
    const form = document.querySelector('.main-form');
    const confPass = document.createElement('label');
    confPass.className = 'input-form';
    const btnBlock = document.querySelector('.main-form-button-block');
    confPass.innerHTML = `
            <span>Confirm Password</span>
            <input type="password" id="confirmPassword">
            <span class="material-icons eye" id="eye" onclick="showEye()">visibility</span>
            <span class="material-icons eye-off" id="eye-off" onclick="showEye()">visibility_off</span>`;
    form.insertBefore(confPass, btnBlock);
}

//***************   Функция открытия меню  хедера  ***************************
export function showHeader(item) {
    const popup = document.querySelector('#popup-header');
    const titlePopup = document.querySelector('.popup-header-title');
    switch (item) {
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
        viewPopup('Entrance is not possible', `You need to fill in the fields: ${emptyInputArr.join(', ')}`, 'try again');
    } else {
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);

            if (key === document.querySelector('.email').value) {
                const objUser = JSON.parse(localStorage.getItem(key));
                if (decryptPass(objUser.pass) === document.querySelector('.password').value) {
                    document.querySelector('.wrapper').remove();
                    document.querySelector('h1').textContent = 'Create pizza';
                    document.querySelector('#root').append(buildFormBlock());
                    addListenersLabel();
                    disableInputs();
                    return;
                } else {
                    viewPopup('Error password', `Password is not correct `, 'try again')
                }
                return;
            }
        }
        const email = document.querySelector('.email').value;
        viewPopup('Error login', `User named ${email} does not exist. Check the correctness of the entry or register`, 'try again');
    }
}