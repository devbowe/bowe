const btnForm = document.querySelector(".btn-form");
const inputName = document.querySelector("input[name='name']");
const inputEmail = document.querySelector("input[name='email']");
const inputPhone = document.querySelector("input[name='phone']");

btnForm.addEventListener("click", (e) => {
    if (inputName.value.trim() === "") {
        showValidationError(inputName, e);
        return;
    } else {
        removeValidationError(inputName);
    }

    if (inputEmail.value.trim() === "" || !validacaoEmail(inputEmail.value)) {
        showValidationError(inputEmail, e);
        return;
    } else {
        removeValidationError(inputEmail);
    }

    if (inputPhone.value.trim() === "" || inputPhone.value.length !== 15) {
        showValidationError(inputPhone, e);
        return;
    } else {
        removeValidationError(inputPhone);
    }

    console.log("Enviou o form!");
});

function showValidationError(field, e) {
    field.classList.add("invalid");
    field.nextElementSibling.textContent = "Campo obrigatório";
    e.preventDefault();
}

function removeValidationError(field, e) {
    field.classList.remove("invalid");
    field.nextElementSibling.textContent = "";
}

// ------------------------- Phone Mask -------------------------
inputPhone.addEventListener("input", handlePhoneInput, false);

function handlePhoneInput(e) {
    e.target.value = phoneMask(e.target.value);
}

function phoneMask(phone) {
    return phone
        .replace(/\D/g, "")
        .replace(/^(\d)/, "($1")
        .replace(/^(\(\d{2})(\d)/, "$1) $2")
        .replace(/(\d{5})(\d{1,4})/, "$1-$2")
        .replace(/(-\d{4})\d+?$/, "$1");
}

// Email validation
function validacaoEmail(email) {
    var verifica =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return verifica.test(String(email).toLowerCase());
}
