//****************************  ОБЪЕКТЫ  *******************************//
export class Pizza {
    constructor(dough, size, components, additionally) {
        this.DoughObj = dough;
        this.SizeObj = size;
        this.FillingObj = components;
        this.SauceObj = additionally;
    }
}

class FinalPizza extends Pizza {
    constructor(dough, size, components, additionally, structure) {
        super(dough, size, components, additionally);
        this.structure = structure;
    }
}

export class Components {
    constructor([name, x, y]) {
        this.name = name;
        this.cost = x;
        this.calories = y;
    }

    validateData(obj, key) {
        if (typeof obj[key]['cost'] !== "number" || typeof obj[key]['calories'] !== "number") {
            return alert('Typeof cost or calories in key ' + key + ' not number');
        }
    }
}

export const ZeroDough = [[], 0, 0];
export const ZeroSize = [[], 0, 0];
export const ZeroComponents = [[], 0, 0];
export const ZeroAdditionally = [[], 0, 0];

export const doughPrice = {
    Thin: [1, 200],
    Thick: [4, 500],
    Calzone: [3, 300],
    Italian: [3, 200],
    Standard: [1, 300],
};

export const sizePrice = {
    Size_32: [0.25, 0.5],
    Size_40: [0.3, 0.7],
    Size_45: [0.5, 1],
};

export const fillingPrice = {
    Cheese: [3, 150],
    Bacon: [6, 230],
    Tomato: [2, 70],
    Paprika: [2, 70],
    Corn: [1, 90],
    Pineapple: [4, 110],
    Olives: [3, 60],
    Shrimp: [4, 130],
    Mushrooms: [8, 110],
    Greens: [1, 20],
};

export const saucePrice = {
    Cheese_sauce: [5, 80],
    Tomato_sauce: [5, 80],
    Spicy_sauce: [5, 80],
    Mustard_sauce: [5, 80],
    Wasabi: [5, 80],
};

export const pizzaObj = new Pizza(ZeroDough, ZeroSize, ZeroComponents, ZeroAdditionally);
export const finalPizzaObj = new FinalPizza(ZeroDough, ZeroSize, ZeroComponents, ZeroAdditionally, '');