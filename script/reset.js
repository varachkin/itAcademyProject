import {viewImgDough, viewImgComponents, viewImgSize, viewImgAdditionally, disableInputs} from "./show-pizza.js";

let doughEl = document.getElementsByName('dough');
let sizeEl = document.getElementsByName("size");
let componentsEl = document.getElementsByName("filling");
let additionallyEl = document.getElementsByName("sauce");

// *******************  Функция обнуления всех форм  *******************************//
export function reset() {
    for (let i = 0; i < doughEl.length; i++) {
        doughEl[i].checked = false;
    }
    for (let i = 0; i < sizeEl.length; i++) {
        sizeEl[i].checked = false;
    }
    for (let i = 0; i < componentsEl.length; i++) {
        componentsEl[i].checked = false;
    }
    for (let i = 0; i < additionallyEl.length; i++) {
        additionallyEl[i].checked = false;
    }

    viewImgDough();
    viewImgSize(40);
    viewImgComponents();
    viewImgAdditionally();
    document.getElementById('information_cost').textContent = '';
    document.getElementById('information_calories').textContent = '';
    document.querySelector('#cost-symbol').textContent = '';
    document.querySelector('#calories-symbol').textContent = '';
    disableInputs();
}

