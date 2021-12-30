import {buildFormBlock, buildHeader, buildResultBlock} from "./create-form.js";
import {animationPizza} from "./animation-start.js";
import {createLoginForm, showEye} from "./create-login-form.js";
import {createPopup} from "./popup.js";

setTimeout(animationPizza, 500);
document.querySelector('#root').prepend(buildHeader());
document.querySelector('#root').append(createLoginForm());
document.querySelector('#root').after(createPopup());

document.querySelector('#eye').addEventListener('click', () => {
    showEye(document.querySelector('#eye'), document.querySelector('#eye-off'))
});
document.querySelector('#eye-off').addEventListener('click', () => {
    showEye(document.querySelector('#eye'), document.querySelector('#eye-off'))
});
// document.querySelector('#root').append(buildFormBlock());

