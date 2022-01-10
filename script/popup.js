import {createElementDom} from "./create-form.js";

const popup = createElementDom('div', 'popup');
const popupContent = createElementDom('div', 'popup_content');


// *******************  Функция создания popup  ***************************************//
export function createPopup() {
    popup.setAttribute('id', 'popup');
    const popupContainer = createElementDom('div', 'popup_container');
    popupContent.setAttribute('id', 'popup_content');
    popupContainer.append(popupContent);
    popup.append(popupContainer);
    const closePopupBlock = createElementDom('div', 'close_popup');
    const titlePopup = createElementDom('div', 'title_popup');
    titlePopup.setAttribute('id', 'title_popup');
    const textPopup = createElementDom('div', 'text_popup');
    textPopup.setAttribute('id', 'text_popup');
    const buttonPopup = createElementDom('div', 'popup_button');

    popupContent.append(closePopupBlock, titlePopup, textPopup, buttonPopup);
    const closeSpan = createElementDom('span', 'material-icons');
    closeSpan.classList.add('close');
    closeSpan.textContent = 'close';
    closePopupBlock.append(closeSpan);
    const btn = createElementDom('div', 'btn');
    btn.setAttribute('id', 'popup_button');
    btn.textContent = 'return to select';
    buttonPopup.append(btn);
    titlePopup.textContent = 'Lorem';
    textPopup.textContent = 'Lorem';
    closeSpan.addEventListener('click', closePopup);
    btn.addEventListener('click', closePopup);
    return popup;
}

//  *************     Функция отображения popup     ************************************//
export function viewPopup(title, text = '', btn = 'RETURN TO SELECT') {
    const titlePop = document.querySelector('#title_popup');
    const textPop = document.querySelector('#text_popup');
    const button = document.querySelector('#popup_button');
    titlePop.textContent = title;
    textPop.textContent = text;
    button.textContent = btn;
    popup.style.opacity = '1';
    popup.style.visibility = 'visible';
    popupContent.style.transform = 'perspective(600px) translate(0, 0) rotateX(0)';

}

// **************      Функция закрытия popup    **************************************//
export function closePopup() {
    popup.style.opacity = '0';
    popup.style.visibility = 'hidden';
    popupContent.style.transform = 'perspective(600px) translate(0, -230%) rotateX(45deg)';
}