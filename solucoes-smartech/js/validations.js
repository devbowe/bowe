const fieldNome = document.querySelector("[data-field='nome']");
const fieldEmail = document.querySelector("[data-field='email']");
const fieldTelefone = document.querySelector("[data-field='telefone']");
const fieldSegmento = document.querySelector("[data-field='segmento']");
const fieldEstrutura = document.querySelector("[data-field='estrutura']");
const fieldDemanda = document.querySelector("[data-field='demanda']");
// const fieldConsent = document.querySelector("input[name='consent']");

const buttonSubmit = document.querySelector(".form-submit");

buttonSubmit.addEventListener("click", (e) => {
    if (fieldNome.value.trim() === "") {
        showPopUpValidation(e, fieldNome, "Informe seu nome");
    } else if (!validateSpecialCharacters(fieldNome)) {
        showPopUpValidation(e, fieldNome, "O campo permite apenas letras");
    } else if (!validacaoEmail(fieldEmail.value.toLowerCase())) {
        showPopUpValidation(e, fieldEmail, "Informe seu e-mail");
    } else if (!emailCorporativo(fieldEmail.value.toLowerCase())) {
        showPopUpValidation(e, fieldEmail, "Informe um e-mail corporativo");
    } else if (fieldTelefone.value.length < 13) {
        showPopUpValidation(e, fieldTelefone, "Informe seu telefone");
    } else if (
        fieldTelefone.value == "(99) 9999-9999" ||
        fieldTelefone.value == "(00) 0000-0000" ||
        fieldTelefone.value == "(11) 1111-1111" ||
        fieldTelefone.value == "(22) 2222-2222" ||
        fieldTelefone.value == "(33) 3333-3333" ||
        fieldTelefone.value == "(44) 4444-4444" ||
        fieldTelefone.value == "(55) 5555-5555" ||
        fieldTelefone.value == "(66) 6666-6666" ||
        fieldTelefone.value == "(77) 7777-7777" ||
        fieldTelefone.value == "(88) 8888-8888" ||
        fieldTelefone.value == "(99) 99999-9999" ||
        fieldTelefone.value == "(00) 00000-0000" ||
        fieldTelefone.value == "(11) 11111-1111" ||
        fieldTelefone.value == "(22) 22222-2222" ||
        fieldTelefone.value == "(33) 33333-3333" ||
        fieldTelefone.value == "(44) 44444-4444" ||
        fieldTelefone.value == "(55) 55555-5555" ||
        fieldTelefone.value == "(66) 66666-6666" ||
        fieldTelefone.value == "(77) 77777-7777" ||
        fieldTelefone.value == "(88) 88888-8888"
    ) {
        showPopUpValidation(e, fieldTelefone, "Informe um telefone v??lido");
    } else if (fieldSegmento.value === "" || fieldSegmento.value === "nulo") {
        showPopUpValidation(e, fieldSegmento, "Informe seu segmento");
    } else if (fieldEstrutura.value === "" || fieldEstrutura.value === "nulo") {
        showPopUpValidation(e, fieldEstrutura, "Informe a estrutura de seu time de marketing");
    } else if (fieldDemanda.value === "" || fieldDemanda.value === "nulo") {
        showPopUpValidation(e, fieldDemanda, "Informe como deseja gerar demanda");
    } else {
        //

        const data = [];

        data.push(
            { name: "identificador", value: "solucoes-smartech" },
            {
                name: "token_rdstation",
                value: "d6b1a3de54dc354a8ff2e592ceaef3b4",
            },
            { name: "privacy_data[communications]", value: "1" },
            {
                name: "form_url",
                value: location.href,
            }
        );

        const fields = document.querySelectorAll("[data-field]");
        fields.forEach((field) => {
            data.push({ name: field.name, value: field.value });
        });

        RdIntegration.post(data);

        buttonSubmit.style.pointerEvents = "none";
        buttonSubmit.textContent = "Enviando...";

        setTimeout(() => {
            window.location.href =
                "https://hml.bowe.com.br/bowe/solucoes-smartech/agradecimento.html";
        }, 1500);

        return true;
    }
    return false;
});

// Swal fire popup
function showPopUpValidation(event, field, message) {
    Swal.fire({
        icon: "warning",
        text: message,
        timer: 200500,
        onAfterClose: () => {
            field.focus();
        },
    });

    event.preventDefault();
}

//Email validations
function validacaoEmail(email) {
    var verifica =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return verifica.test(String(email).toLowerCase());
}

function emailCorporativo(email) {
    const invalidDomains = [
        "@gmail.",
        "@yahoo.",
        "@hotmail.",
        "@live.",
        "@aol.",
        "@outlook.",
        "@terra.",
        "@bol.",
        "@uol.",
    ];

    for (let i = 0; i < invalidDomains.length; i++) {
        const domain = invalidDomains[i];
        if (email.indexOf(domain) != -1) {
            return false;
        }
    }
    return true;
}

setTimeout(function () {
    document.querySelector("input[name='url_pagina']").value =
        location.protocol + "//" + location.host + location.pathname;
}, 2000);

// Query Form
const queryForm = function (settings) {
    const reset = settings && settings.reset ? settings.reset : false;
    const self = window.location.toString();
    const querystring = self.split("?");

    if (querystring.length > 1) {
        const pairs = querystring[1].split("&");
        for (i in pairs) {
            var keyval = pairs[i].split("=");
            if (reset || sessionStorage.getItem(keyval[0]) === null) {
                sessionStorage.setItem(keyval[0], decodeURIComponent(keyval[1]));
            }
        }
    }
    const hiddenFields = document.querySelectorAll("input[type=hidden], input[type=text]");
    for (let i = 0; i < hiddenFields.length; i++) {
        const param = sessionStorage.getItem(hiddenFields[i].name);
        if (param) document.getElementsByName(hiddenFields[i].name)[0].value = param;
    }
};

setTimeout(() => {
    queryForm();
}, 2000);

// ------------------------- Phone Mask -------------------------
fieldTelefone.addEventListener("input", handlePhoneInput, false);

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

// Simulate Enter click
document.querySelectorAll("[data-field]").forEach((field) => {
    field.addEventListener("keypress", (e) => {
        if (e.key === "Enter" || e.keyCode === 13) {
            buttonSubmit.click();
        }
    });
});

function validateSpecialCharacters(field) {
    if (!/^[a-z???????????????????????????????? ]+$/i.test(field.value)) {
        return false;
    } else {
        return true;
    }
}

// FOOTER FORM VALIDATION
// const footerFormBtn = document.querySelector(".footer-form-btn-submit");
// const footerFormEmail = document.querySelector(".footer-form-email");

// footerFormEmail.addEventListener("keypress", (e) => {
//     if (e.key === "Enter") {
//         e.preventDefault();
//     }
// });

// footerFormBtn.addEventListener("click", (e) => {
//     if (!validacaoEmail(footerFormEmail.value.toLowerCase())) {
//         showPopUpValidation(e, footerFormEmail, "Informe seu e-mail");
//     } else if (!emailCorporativo(footerFormEmail.value.toLowerCase())) {
//         showPopUpValidation(e, footerFormEmail, "Informe um e-mail corporativo");
//     } else {
//         const data = [];

//         data.push(
//             { name: "identificador", value: "footer form solucoes smartech" },
//             {
//                 name: "token_rdstation",
//                 value: "d6b1a3de54dc354a8ff2e592ceaef3b4",
//             },
//             { name: "privacy_data[communications]", value: "1" },
//             {
//                 name: "form_url",
//                 value: location.href,
//             },
//             {
//                 name: "email",
//                 value: footerFormEmail.value,
//             }
//         );

//         console.log(data);

//         RdIntegration.post(data);

//         setTimeout(() => {
//             window.location.href = "google.com";
//         }, 1500);

//         return true;
//     }

//     return false;
// });
