const doughEl = document.getElementsByName('dough');
const sizeEl = document.getElementsByName('size');
const fillingEl = document.getElementsByName('filling');
const sauceEl = document.getElementsByName('sauce');


export function disableInputs() {
    fillingEl.forEach((el) => {
        el.setAttribute('disabled', 'disabled')
    });
    sauceEl.forEach((el) => {
        el.setAttribute('disabled', 'disabled')
    });
}

function enableInputs() {
    fillingEl.forEach((el) => {
        el.removeAttribute('disabled');
    });
    sauceEl.forEach((el) => {
        el.removeAttribute('disabled');
    });
}

export function addListenersLabel() {
    for (let el of doughEl) {
        el.addEventListener('click', viewImgDough);
    }
    for (let el of sizeEl) {
        const x = parseInt(el.id.replace('Size_', ''));
        el.addEventListener('click', () => {
            viewImgSize(+x)
        });
    }
    for (let el of fillingEl) {
        el.addEventListener('click', viewImgComponents);
    }
    for (let el of sauceEl) {
        el.addEventListener('click', viewImgAdditionally);
    }
}

// **************************************  Функция отображения теста **************************************//
export function viewImgDough() {
    const img = document.querySelectorAll('.img_dough');

    setTimeout(() => {
        for (let i = 0; i < Array.from(doughEl).length; i++) {
            if (doughEl[i].checked) {
                img[i].setAttribute('alt', 'dough');
                img[i].setAttribute('src', `img/dough/${doughEl[i].id.toLowerCase()}.png`);
                img[i].style.opacity = 1;
            } else {
                img[i].style.opacity = 0;
            }
        }
    }, 0);
    enableInputs();
}

// *******************************   Функция отображения размера пиццы   ************************************//
export function viewImgSize(num) {
    if (num === 32) {
        for (let i = 0; i < doughEl.length; i++) {
            document.querySelectorAll('.img_dough_block img')[i].style.width = "85%";
            document.querySelectorAll('.img_dough_block img')[i].style.height = "85%";
        }
        document.querySelector('.img_dough_block img').style.width = "85%";
        document.querySelector('.img_dough_block img').style.height = "85%";
        for (let n = 0; n < fillingEl.length; n++) {
            document.querySelectorAll('.img_components')[n].style.width = "71%";
            document.querySelectorAll('.img_components')[n].style.height = "71%";
        }
    }
    if (num === 40) {

        for (let i = 0; i < doughEl.length; i++) {
            document.querySelectorAll('.img_dough_block img')[i].style.width = "100%";
            document.querySelectorAll('.img_dough_block img')[i].style.height = "100%";
        }
        for (let n = 0; n < fillingEl.length; n++) {
            document.querySelectorAll('.img_components')[n].style.width = "87%";
            document.querySelectorAll('.img_components')[n].style.height = "87%";
        }
    }
    if (num === 45) {
        for (let i = 0; i < doughEl.length; i++) {
            document.querySelectorAll('.img_dough_block img')[i].style.width = "114%";
            document.querySelectorAll('.img_dough_block img')[i].style.height = "114%";
        }
        for (let n = 0; n < fillingEl.length; n++) {
            document.querySelectorAll('.img_components')[n].style.width = "100%";
            document.querySelectorAll('.img_components')[n].style.height = "100%";
        }
    }
}

// *******************************   Функция отображения компонентов пиццы   ************************************//
export function viewImgComponents() {

    const imgComponent = document.querySelectorAll('.img_components');

    for (let el of Array.from(doughEl)) {
        if (el.checked) {
            for (let i = 0; i < Array.from(fillingEl).length; i++) {
                setTimeout(() => {
                    if (fillingEl[i].checked) {
                        imgComponent[i].setAttribute('src', `img/components/${fillingEl[i].id.toLowerCase()}.png`);
                        imgComponent[i].style.opacity = 1;
                    } else {
                        imgComponent[i].style.opacity = 0;
                    }
                }, 0);
            }
        } else {
            imgComponent.forEach((el) => {
                el.style.opacity = 0
            });
        }
    }
}

// *******************************   Функция отображения соусов для пиццы   ************************************//
export function viewImgAdditionally() {
    const imgSauce = document.querySelectorAll('.img_additionally');
    setTimeout(() => {
        for (let i = 0; i < Array.from(sauceEl).length; i++) {
            if (sauceEl[i].checked) {

                imgSauce[i].setAttribute('src', `img/additionally/${sauceEl[i].id.replace('_sauce', '').toLowerCase()}.png`);
                imgSauce[i].style.opacity = 1;
            } else {
                imgSauce[i].style.opacity = 0;
            }
        }
    }, 0);
}