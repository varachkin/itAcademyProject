// *******************  Функция создания popup  ***************************************//
import {createElementDom} from "./create-form.js";

const popup = createElementDom('div', 'popup');
const popupContent = createElementDom('div', 'popup_content');

export function createPopup() {
    popup.setAttribute('id', 'popup');
    const popupContainer = createElementDom('div', 'popup_container');
    popupContent.setAttribute('id', 'popup_content');
    popupContainer.append(popupContent);
    popup.append(popupContainer);
    const closePopupBlock = createElementDom('div', 'close_popup');
    const titlePopup = createElementDom('div', 'title_popup');
    const textPopup = createElementDom('div', 'text_popup');
    textPopup.setAttribute('id', 'text_popup');
    const buttonPopup = createElementDom('div', 'popup_button');
    popupContent.append(closePopupBlock, titlePopup, textPopup, buttonPopup);
    const closeSpan = createElementDom('span', 'material-icons');
    closeSpan.classList.add('close');
    closeSpan.textContent = 'close';
    closePopupBlock.append(closeSpan);
    const btn = createElementDom('div', 'btn');
    btn.textContent = 'return to select';
    buttonPopup.append(btn);
    titlePopup.textContent = 'Lorem';
    textPopup.textContent = 'Lorem';
    closeSpan.addEventListener('click', closePopup);
    btn.addEventListener('click', closePopup);
    return popup;
}

//  *************     Функция отображения popup     ************************************//
export function viewPopup() {
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