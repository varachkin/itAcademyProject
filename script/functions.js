'use strict';

const eye = document.querySelector('#eye');
const eyeOff = document.querySelector('#eye-off');
const password = document.querySelector('#password');

function showEye() {
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