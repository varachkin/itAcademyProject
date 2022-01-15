// *******************  Функция отправки запроса на сервер  ****************************************//
import {closeHeader} from "./header.js";
import {viewPopup} from "./popup.js";
import {ZeroDough, ZeroSize, ZeroComponents, ZeroAdditionally} from "./Objects.js";
import {Pizza, Components} from "./Objects.js";
import {reset} from "./script.js";

export function sendRequest() {
    const loader = document.querySelector('#loader-block');
    loader.style.display = 'inline-block';
    closeHeader();
    const currentUser = localStorage.getItem('current user');
    const user = JSON.parse(localStorage.getItem(currentUser));
    if (user.pizza.DoughObj.name.length > 0) {
        setTimeout(() => {
            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => {
                    return response.json()
                })
                .catch((er) => {
                    viewPopup('Error', er)
                })
                .then((json) => {
                    const pizzaStr = `${json.pizza.DoughObj.name}, 
                ${json.pizza.SizeObj.name.replaceAll('_', ' ')}, 
                ${json.pizza.FillingObj.name.join(', ').replaceAll('_', ' ')},
                ${json.pizza.SauceObj.name.join(', ').replaceAll('_', ' ')}`;
                    const cost = (json.pizza.DoughObj.cost + json.pizza.FillingObj.cost + json.pizza.SauceObj.cost) * json.pizza.SizeObj.cost;
                    viewPopup('Your order is accepted', `Your order № ${json.id}: `, `${pizzaStr}.`, ` Order cost: $ ${cost}`, 'OK');
                    const user = localStorage.getItem('current user');
                    const pizzaZero = new Pizza(new Components(ZeroDough), new Components(ZeroSize), new Components(ZeroComponents), new Components(ZeroAdditionally));
                    console.log(pizzaZero);
                    const p = JSON.parse(localStorage.getItem(`${user}`));
                    p.pizza = pizzaZero;
                    localStorage.setItem(`${user}`, JSON.stringify(p));
                    console.log(json)
                })
                .finally(() => {
                    loader.style.display = 'none';
                    reset();
                })
        }, 3000);
    } else {
        loader.style.display = 'none';
        viewPopup('Error', 'No pizza in the basket ', '', '', 'Ясно, понятно');
    }

}