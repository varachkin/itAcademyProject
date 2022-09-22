import {doughPrice, fillingPrice, pizzaObj, saucePrice, sizePrice} from "./Objects.js";
import {Components} from "./Objects.js";
import {viewPopup} from "./popup.js";

// *******************  Функция расчета стоимости пиццы  ***************************************//
export function calculate() {
    const doughArr = document.getElementsByName('dough');
    const sizeArr = document.getElementsByName('size');
    const fillingArr = document.getElementsByName('filling');
    const sauceArr = document.getElementsByName('sauce');
    let cost = 0;
    let calories = 0;

    pizzaObj.DoughObj = new Components([[], 0, 0]);
    for (let el of doughArr) {
        if (el.checked) {
            pizzaObj.DoughObj = new Components([`${el.id}`, doughPrice[`${el.id}`][0], doughPrice[`${el.id}`][1]]);
        }
    }
    pizzaObj.SizeObj = new Components([[], 0, 0]);
    for (let el of sizeArr) {
        if (el.checked) {
            pizzaObj.SizeObj = new Components([`${el.id}`, sizePrice[`${el.id}`][0], sizePrice[`${el.id}`][1]]);
        }
    }

    pizzaObj.FillingObj = new Components([[], 0, 0]);
    for (let el of fillingArr) {
        if (el.checked) {
            pizzaObj.FillingObj.name.push(`${el.id}`);
            pizzaObj.FillingObj.cost += fillingPrice[`${el.id}`][0];
            pizzaObj.FillingObj.calories += fillingPrice[`${el.id}`][1];
        }
    }

    pizzaObj.SauceObj = new Components([[], 0, 0]);
    for (let el of sauceArr) {
        if (el.checked) {
            pizzaObj.SauceObj.name.push(`${el.id}`);
            pizzaObj.SauceObj.cost += saucePrice[`${el.id}`][0];
            pizzaObj.SauceObj.calories += saucePrice[`${el.id}`][1];
        }
    }
    cost = (pizzaObj.DoughObj.cost + pizzaObj.FillingObj.cost + pizzaObj.SauceObj.cost) * pizzaObj.SizeObj.cost;
    calories = (pizzaObj.DoughObj.calories + pizzaObj.FillingObj.calories + pizzaObj.SauceObj.calories) * pizzaObj.SizeObj.calories;

    if (pizzaObj.DoughObj.name.length === 0) {
        viewPopup('The cost cannot be calculated', "You didn't choose the ", 'dough', '', 'RETURN TO SELECT')
    } else {
        if (pizzaObj.SizeObj.name.length === 0) {
            viewPopup('The cost cannot be calculated', "You didn't choose the ", 'size', '', 'RETURN TO SELECT')
        } else {
            if (pizzaObj.FillingObj.name.length < 3) {
                viewPopup('The cost cannot be calculated', "The number of ", 'fillings', ' must be at least 3', 'RETURN TO SELECT')
            } else {
                document.querySelector('#information_cost').textContent = `${cost.toFixed(2)}`;
                document.querySelector('#cost-symbol').textContent = '$';

                document.querySelector('#information_calories').textContent = `${calories.toFixed(0)}`;
                document.querySelector('#calories-symbol').textContent = 'Kcal';

            }
        }
    }


    console.log(pizzaObj);
}

// *******************  Функция добавления пиццы в корзину ***************************************//
export function toBasket() {
    calculate();
    if (pizzaObj.DoughObj.name.length > 0 && pizzaObj.SizeObj.name.length > 0 && pizzaObj.FillingObj.name.length >= 3) {
        const currentUser = localStorage.getItem('current user');
        const user = JSON.parse(localStorage.getItem(currentUser));
        user.pizza = pizzaObj;
        localStorage.setItem(`${localStorage.getItem('current user')}`, JSON.stringify(user));
        const span = document.querySelector('.span_popup');
        span.classList.add('material-icons');
        span.style.textDecoration = 'none';
        viewPopup('Successfully', 'Your pizza is in shopping cart  ', 'shopping_cart', '', 'continue');
        document.querySelector('.num').style.opacity = 1;
    }
}