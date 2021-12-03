'use strict';

const password = document.querySelector('#password');

function showEye() {
    const eye = document.querySelector('.eye');
    const eyeOff = document.querySelector('.eye-off');
    if (eye.style.display === 'none') {
        eyeOff.style.display = 'none';
        eye.style.display = 'inline';
        password.type = 'password';
    } else {
        eye.style.display = 'none';
        eyeOff.style.display = 'inline';
        password.type = 'text';
    }
}

function createInputForm(x) {
    const form = document.querySelector('.main-form');
    const confPass = document.createElement('label');
    const btnBlock = document.querySelector('.main-form-button-block');
    confPass.innerHTML = `
            <span>Confirm Password</span>
            <input type="password" id="confirmPassword">
            <span class="material-icons eye" id="eye" onclick="showEye()">visibility</span>
            <span class="material-icons eye-off" id="eye-off" onclick="showEye()">visibility_off</span>`;
    form.insertBefore(confPass, btnBlock);
}