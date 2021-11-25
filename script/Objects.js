'use strict'
//****************************  ОБЪЕКТЫ  *******************************//
class Pizza {
    constructor(dough, size, components, additionally) {
        this.DoughObj = dough;
        this.SizeObj = size;
        this.ComponentsObj = components;
        this.AdditionallyObj = additionally;
    }
}
class FinalPizza extends Pizza{
    constructor(dough, size, components, additionally, structure) {
        super(dough, size, components, additionally);
        this.structure = structure;
    }
}

class Components {
    constructor(x, y) {
        this.cost = x;
        this.calories = y;
    }
    validateData(obj, key){
        if(typeof obj[key]['cost'] !== "number" || typeof obj[key]['calories'] !== "number" ){
            return alert('Typeof cost or calories in key '+ key + ' not number');
        }
    }
}

let ZeroDough = new Components(0, 0)
let ZeroSize = new Components(0, 0)
let ZeroComponents = new Components(0, 0)
let ZeroAdditionally = new Components(0, 0)

let Thin = new Components(1,200);
let Thick = new Components(4,500);
let Calzone = new Components(3,300);
let Italian = new Components(3,200);
let Standard = new Components(1,300);

let Size_32 = new Components(0.01, 0.01);
let Size_40 = new Components(0.3, 0.3);
let Size_45 = new Components(0.5, 0.5);

let Cheese = new Components(3, 150);
let Bacon = new Components(6, 230);
let Tomato = new Components(2, 70);
let Paprika = new Components(2, 70);
let Corn = new Components(1, 90);
let Pineapple = new Components(4, 110);
let Olives = new Components(3, 60);
let Shrimp = new Components(4, 130);
let Mushrooms = new Components(8, 110);
let Greens = new Components(1, 20);

let Cheese_sauce = new Components(5, 80);
let Tomato_sauce = new Components(5, 80);
let Spicy_sauce = new Components(5, 80);
let Mustard_sauce = new Components(5, 80);
let Wasabi = new Components(5, 80);

let pizzaObj = new Pizza(ZeroDough,ZeroSize,ZeroComponents,ZeroAdditionally);
let finalPizzaObj = new FinalPizza(ZeroDough,ZeroSize,ZeroComponents,ZeroAdditionally,'');

//   Объект с видами теста
let DoughObj = {
    Thin,
    Thick,
    Calzone,
    Italian,
    Standard,
};

//   Объект с размерами пиццы
let SizeObj = {
    Size_32,
    Size_40,
    Size_45,
};

//   Объект с видами компонентов
let ComponentsObj = {
    Cheese,
    Bacon,
    Tomato,
    Paprika,
    Corn,
    Pineapple,
    Olives,
    Shrimp,
    Mushrooms,
    Greens,
};

//   Объект с дополнительными ингредиентами
let AdditionallyObj = {
    Cheese_sauce,
    Tomato_sauce,
    Spicy_sauce,
    Mustard_sauce,
    Wasabi,
};
//****************************  ОБЪЕКТЫ  *******************************//

for(let key in DoughObj){
    DoughObj[key].validateData(DoughObj, key);
}
for(let key in SizeObj){
    SizeObj[key].validateData(SizeObj, key);
}
for(let key in ComponentsObj){
    ComponentsObj[key].validateData(ComponentsObj, key);
}
for(let key in AdditionallyObj){
    AdditionallyObj[key].validateData(AdditionallyObj, key);
}