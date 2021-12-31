import {buildFormBlock, buildHeader, buildResultBlock} from "./create-form.js";

import {createLoginForm, showEye} from "./create-login-form.js";
import {createPopup} from "./popup.js";

document.querySelector('#root').prepend(buildHeader());
document.querySelector('#root').append(createLoginForm());
document.querySelector('#root').after(createPopup());


// document.querySelector('#root').append(buildFormBlock());

