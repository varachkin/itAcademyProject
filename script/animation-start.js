// Добавляет классы
function addClassInArr() {
    const pizzaPiece = document.querySelectorAll('div.img-block > img');
    const body = document.querySelector('body');
    for (let i = 0; i < pizzaPiece.length; i++) {
        pizzaPiece[i].classList.add(`img-${i + 1}`);
    }

    setTimeout(function () {
        for (let i = 0; i < pizzaPiece.length; i++) {
            pizzaPiece[i].style.display = 'none';
        }
    }, 2000);
    setTimeout(function () {
        body.style.overflow = 'auto';
    }, 2300);
}

setTimeout(addClassInArr, 2000);