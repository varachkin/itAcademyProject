// *******************  Функция анимации пиццы при появлении формы логина  *****************//
export function animationPizza() {
    const pizzaPiece = document.querySelectorAll('div.img-block > img');
    const body = document.querySelector('body');
    for (let i = 0; i < pizzaPiece.length; i++) {
        pizzaPiece[i].classList.add(`img-${i + 1}`);
    }

    setTimeout(function () {
        for (let i = 0; i < pizzaPiece.length; i++) {
            pizzaPiece[i].style.display = 'none';
        }
    }, 2800);
    setTimeout(function () {
        body.style.overflow = 'auto';
    }, 3000);
}