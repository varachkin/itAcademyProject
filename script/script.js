'use strict'

let doughEl = document.getElementsByName("dough");
let sizeEl = document.getElementsByName("size");
let componentsEl = document.getElementsByName("components");
let additionallyEl = document.getElementsByName("additionally");

let num_components = 0;
let sendObj = {};

//   Стоимость пиццы до наценки
let costPizza = 0;

//   Калорийность пиццы
let caloriesPizza = 0;

//   Сумма наценки
let taxCost;

//   Стоимость пиццы ПОСЛЕ наценки
let finalCostPizza;


//   Функция заполнения объекта свойствами готовой пиццы
function cooking(){
    costPizza = 0;
    caloriesPizza = 0;
    pizzaObj.DoughObj.cost = pizzaObj.DoughObj.calories = pizzaObj.SizeObj.cost = pizzaObj.SizeObj.calories = pizzaObj.ComponentsObj.cost = pizzaObj.ComponentsObj.calories = pizzaObj.AdditionallyObj.cost = pizzaObj.AdditionallyObj.calories = 0;
    console.log(pizzaObj);
    console.log(finalPizzaObj);
    console.log(DoughObj);
    console.log(SizeObj);
    console.log(ComponentsObj);
    console.log(AdditionallyObj);

    if(doughEl){
        for(let i = 0; i < doughEl.length; i++){
            if(doughEl[i].checked){
                for(let key in DoughObj){
                    if(doughEl[i].id === key){
                        pizzaObj.DoughObj.cost = DoughObj[key]['cost'];
                        pizzaObj.DoughObj.calories = DoughObj[key]['calories'];
                        if(sizeEl){
                            for(let x = 0; x < sizeEl.length; x++){
                                if(sizeEl[x].checked && doughEl[i].checked){
                                    for(let key in SizeObj){
                                        if(sizeEl[x].id === key){
                                            pizzaObj.SizeObj.cost = SizeObj[key]["cost"] * pizzaObj.DoughObj.cost;
                                            pizzaObj.SizeObj.calories = SizeObj[key]["calories"] * pizzaObj.DoughObj.calories;
                                        }
                                    }
                                    if(componentsEl){
                                        for(let i = 0; i < componentsEl.length; i++){
                                            if(componentsEl[i].checked){
                                                num_components++;
                                                for(let key in ComponentsObj){
                                                    if(componentsEl[i].id === key){
                                                        pizzaObj.ComponentsObj.cost += ComponentsObj[key]["cost"];
                                                        pizzaObj.ComponentsObj.calories += ComponentsObj[key]["calories"];
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            if(additionallyEl){
                                for(let i = 0; i < additionallyEl.length; i++){
                                    if(additionallyEl[i].checked){
                                        for(let key in AdditionallyObj){
                                            if(additionallyEl[i].id === key){
                                                pizzaObj.AdditionallyObj.cost += AdditionallyObj[key]["cost"];
                                                pizzaObj.AdditionallyObj.calories += AdditionallyObj[key]["calories"];
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    console.log(finalPizzaObj);
    costPizza = pizzaObj.DoughObj.cost + pizzaObj.SizeObj.cost + pizzaObj.ComponentsObj.cost + pizzaObj.AdditionallyObj.cost;
    caloriesPizza = pizzaObj.DoughObj.calories + pizzaObj.SizeObj.calories + pizzaObj.ComponentsObj.calories + pizzaObj.AdditionallyObj.calories;
    console.log('Стоимость: ' + pizzaObj.DoughObj.cost + ' / ' + pizzaObj.SizeObj.cost + ' / ' + pizzaObj.ComponentsObj.cost + ' / ' + pizzaObj.AdditionallyObj.cost);
    console.log('Калории:  ' + pizzaObj.DoughObj.calories + ' / ' + pizzaObj.SizeObj.calories + ' / ' + pizzaObj.ComponentsObj.calories + ' / ' + pizzaObj.AdditionallyObj.calories);
    console.log(costPizza);
    console.log(caloriesPizza);
    console.log(pizzaObj);
    cost(costPizza);
    console.log(num_components);

    if(finalCostPizza !== 0){
        document.getElementById('information_cost').innerHTML = 'Cost: ' + costPizza.toFixed(2) + ' + ' + taxCost.toFixed(2) + ' = ' + ' $' + '<span>' + finalCostPizza.toFixed(2) + '</span>';
        document.getElementById('information_calories').innerHTML = 'Calories: ' + '<span>' + caloriesPizza + '</span>' + '  Kkal';
    }
    if(pizzaObj.DoughObj['cost'] === 0){
        document.getElementById('text_popup').innerHTML = 'No <span>dough</span> type selected. Select the type of pizza <span>dough</span> !!!';
        viewPopup();
        return;
    }
    if(finalPizzaObj.SizeObj['cost'] === 0){
        document.getElementById('text_popup').innerHTML = 'No dough <span>size</span> selected. Select the type of pizza <span>size</span> !!!';
        viewPopup();
        return;
    }
    if(pizzaObj.ComponentsObj['cost'] === 0){
        document.getElementById('text_popup').innerHTML = 'No <span>components</span> selected. Select the <span>components</span> of pizza !!!';
        viewPopup();
    }else{
        if(num_components < 3){
            document.getElementById('text_popup').innerHTML = 'You added too few <span>components</span> to the pizza. <br>The minimum number of <span>components</span> is 3 !!!';
            viewPopup();
            num_components = 0;
            return;
        }
    }
    sendObj = finalPizzaObj;
    sendObj["total_cost"] = finalCostPizza.toFixed(2);
    console.log("Объект для отправки");
    console.log(sendObj);
    fetch('http://localhost:3000/pizza', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sendObj)
    }).then(res => res.json()).then(console.log);

    num_components = 0;
}

//   Функция отображения предупреждения
function viewPopup(){
    document.getElementById('popup').style.opacity = '1';
    document.getElementById('popup').style.visibility = 'visible';
    document.getElementById('popup_content').style.transform = 'perspective(600px) translate(0, 0) rotateX(0)';
}

//   Функция закрытия предупреждения
function closePopup(){
    document.getElementById('popup').style.opacity = '0';
    document.getElementById('popup').style.visibility = 'hidden';
    document.getElementById('popup_content').style.transform = 'perspective(600px) translate(0, -200%) rotateX(45deg)';
}

//   Функция расчитывающая стоимость пиццы.
function cost(num){
    finalPizzaObj.structure = '';
    //   Запись информации о тесте в объект finalPizzaObj
    finalPizzaObj.DoughObj["cost"] = pizzaObj.DoughObj["cost"];
    for(let x = 0; x < doughEl.length; x++) {
        if (doughEl[x].checked) {
            for (let key in DoughObj) {
                if (doughEl[x].id === key) {
                    finalPizzaObj.DoughObj["name"] = key;
                }
            }
        }
    }
    //   Запись информации о размере в finalPizzaObj
    finalPizzaObj.SizeObj["cost"] = pizzaObj.SizeObj["cost"] * pizzaObj.DoughObj["cost"];
    for(let x = 0; x < sizeEl.length; x++) {
        if (sizeEl[x].checked) {
            for (let key in SizeObj) {
                if (sizeEl[x].id === key) {
                    finalPizzaObj.SizeObj["name"] = key;
                }
            }
        }
    }

    //   Запись информации о добавленных ингредиентах в объект finalPizzaObj
    for(let i = 0; i < componentsEl.length; i++) {
        if (componentsEl[i].checked) {
            for (let key in ComponentsObj) {
                if (componentsEl[i].id === key) {
                    finalPizzaObj.structure += key + ', ';
                }
            }
        }
    }
    finalPizzaObj.ComponentsObj['cost'] = pizzaObj.ComponentsObj['cost'];

    //   Запись информации о дополнительных ингредиентах в объект finalPizzaObj
    for(let i = 0; i < additionallyEl.length; i++) {
        if (additionallyEl[i].checked) {
            for (let key in AdditionallyObj) {
                if (additionallyEl[i].id === key) {
                    finalPizzaObj.structure += key + ', ';
                }
            }
        }
    }
    finalPizzaObj.AdditionallyObj['cost'] = pizzaObj.AdditionallyObj['cost'];
    console.log(finalPizzaObj);

    //   Расчет конечной стоимости пиццы с учетом наценки
    if(num < 100){
        finalCostPizza = num + num * 0.2;
        taxCost = num * 0.2;
    }
    if(num >= 20 && num <= 35){
        finalCostPizza = num + num * 0.15;
        taxCost = num * 0.15;
    }
    if(num > 35){
        finalCostPizza = num + num * 0.1;
        taxCost = num * 0.1;
    }
    console.log('Final cost pizza = ' + finalCostPizza);
    return finalCostPizza;
}

//   Функция отображения теста
function viewImgDough(){
    for(let i = 0; i < doughEl.length; i++){
        if(doughEl[i].checked){
            document.querySelectorAll('.img_dough_block img')[i].style.opacity = "1";
        }else{
            document.querySelectorAll('.img_dough_block img')[i].style.opacity = "0";
        }
    }
}

//   Функция отображения размера пиццы
function viewImgSize(num){
    if(num === 32){
        for(let i = 0; i < doughEl.length; i++){
            document.querySelectorAll('.img_dough_block img')[i].style.width = "260px";
            document.querySelectorAll('.img_dough_block img')[i].style.height = "260px";
            }
        for(let n = 0; n < componentsEl.length; n++){
            document.querySelectorAll('.img_components_block img')[n].style.width = "227px";
            document.querySelectorAll('.img_components_block img')[n].style.height = "227px";
        }
    }
    if(num === 40){
        for(let i = 0; i < doughEl.length; i++){
            document.querySelectorAll('.img_dough_block img')[i].style.width = "320px";
            document.querySelectorAll('.img_dough_block img')[i].style.height = "320px";
        }
        for(let n = 0; n < componentsEl.length; n++){
            document.querySelectorAll('.img_components_block img')[n].style.width = "280px";
            document.querySelectorAll('.img_components_block img')[n].style.height = "280px";
        }
    }
    if(num === 45){
        for(let i = 0; i < doughEl.length; i++){
            document.querySelectorAll('.img_dough_block img')[i].style.width = "370px";
            document.querySelectorAll('.img_dough_block img')[i].style.height = "370px";
        }
        for(let n = 0; n < componentsEl.length; n++){
            document.querySelectorAll('.img_components_block img')[n].style.width = "320px";
            document.querySelectorAll('.img_components_block img')[n].style.height = "320px";
        }
    }
}

//   Функция отображения компонентов пиццы
function viewImgComponents(){
    for(let i = 0; i < componentsEl.length; i++){
        if(componentsEl[i].checked){
            document.querySelectorAll('.img_components_block img')[i].style.opacity = "1";
            for(let n = 0; n < doughEl.length; n++){
                if(doughEl[n].checked){
                    componentsEl[i].checked = true;
                    document.querySelectorAll('.img_components_block img')[i].style.opacity = "1";
                    break;
                }
                document.querySelectorAll('.img_components_block img')[i].style.opacity = "0";
                componentsEl[i].checked = false;
            }
        }else{
            document.querySelectorAll('.img_components_block img')[i].style.opacity = "0";
        }
    }
}

//   Функция отображения дополнительных ингридиентов
function viewImgAdditionally(){
    for(let i = 0; i < additionallyEl.length; i++){
        if(additionallyEl[i].checked){
            document.querySelectorAll('.img_additionally_block img')[i].style.opacity = "1";
        }else{
            document.querySelectorAll('.img_additionally_block img')[i].style.opacity = "0";
        }
    }
}

//   Функция сброса
function reset(){
    for(let i =0; i < doughEl.length; i++){
        doughEl[i].checked = false;
    }
    for(let i =0; i < sizeEl.length; i++){
        sizeEl[i].checked = false;
    }
    for(let i =0; i < componentsEl.length; i++){
        componentsEl[i].checked = false;
    }
    for(let i =0; i < additionallyEl.length; i++){
        additionallyEl[i].checked = false;
    }

    viewImgDough();
    viewImgSize(32);
    viewImgComponents();
    viewImgAdditionally();
    document.getElementById('information_cost').innerHTML = 'Cost: ';
    document.getElementById('information_calories').innerHTML = 'Calories: ';

    num_components = 0;
}


