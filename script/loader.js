import {createElementDom} from "./create-form.js";

// *******************  Функция создания label для формы логина  *****************************//

export function buildLoader() {
    const loaderBlock = createElementDom('div', 'loader-block');
    loaderBlock.setAttribute('id', 'loader-block');
    loaderBlock.append(createElementDom('div'), createElementDom('div'), createElementDom('div'), createElementDom('div'));
    loaderBlock.style.display = 'none';
    return loaderBlock;
}