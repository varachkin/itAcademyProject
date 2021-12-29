function createInputForm(x) {
    const form = document.querySelector('.main-form');
    const confPass = document.createElement('label');
    confPass.className = 'input-form';
    const btnBlock = document.querySelector('.main-form-button-block');
    confPass.innerHTML = `
            <span>Confirm Password</span>
            <input type="password" id="confirmPassword">
            <span class="material-icons eye" id="eye" onclick="showEye()">visibility</span>
            <span class="material-icons eye-off" id="eye-off" onclick="showEye()">visibility_off</span>`;
    form.insertBefore(confPass, btnBlock);
}

//***************   Функция открытия меню  хедера  ***************************
export function showHeader(item) {
    const popup = document.querySelector('#popup-header');
    const titlePopup = document.querySelector('.popup-header-title');
    switch (item) {
        case 'person':
            titlePopup.innerText = 'Personal data';
            const ulPopupHeader = document.createElement('ul');
            ulPopupHeader.classList.add('popup-header-container-info');
            for (let i = 0; i < 4; i++) {
                let li = document.createElement('li');
                li.classList.add('popup-li');
                ulPopupHeader.append(li);
            }
            const arrUlPopup = document.querySelectorAll('.popup-li');
            for (let el of arrUlPopup) {
                el.append(document.createElement("span").innerText);
            }
            popup.append(ulPopupHeader);
            break;
        case 'basket':
            titlePopup.innerText = 'Your basket';
            break;
    }

    popup.style.transform = 'perspective(500px) translate(0, 0) rotateX(0)';
}

//***************   Функция закрытия меню  хедера  ***************************
export function closeHeader() {
    const popup = document.querySelector('#popup-header');
    popup.style.transform = 'perspective(200px) translate(0, -100%) rotateX(45deg)'
}

//  *************     Функция отображения предупреждения     *****************
function viewPopup() {
    popup.style.opacity = '1';
    popup.style.visibility = 'visible';
    popupContent.style.transform = 'perspective(600px) translate(0, 0) rotateX(0)';
}

// **************      Функция закрытия предупреждения    *********************
function closePopup() {
    popup.style.opacity = '0';
    popup.style.visibility = 'hidden';
    popupContent.style.transform = 'perspective(600px) translate(0, -230%) rotateX(45deg)';
}