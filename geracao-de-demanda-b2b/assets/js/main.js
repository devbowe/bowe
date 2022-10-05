(function () {
  // Mascara Telefone
  var SPMaskBehavior = function (val) {
      return val.replace(/\D/g, "").length === 11
        ? "(00) 00000-0000"
        : "(00) 0000-00009";
    },
    spOptions = {
      onKeyPress: function (val, e, field, options) {
        field.mask(SPMaskBehavior.apply({}, arguments), options);
      },
    };

  $("input[type=tel]").mask(SPMaskBehavior, spOptions);

  // Slides
  $(".marketing-carousel").slick({
    dots: true,
  });

  $(".channels-carousel").slick({
    dots: true,
  });

  $(".warnings-carousel").slick({
    dots: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
    speed: 1000,
  });

  $(".tools-demand-generation-carousel").slick({
    dots: true,
  });

  $(".multiple-section-content-2-carousel").slick({
    dots: true,
  });
})();

$("button#btn-formulario-contato").click(function (e) {
  e.preventDefault();

  let formContainer = $("form#formulario-contato");
  let inputFields = $(formContainer).find("input.required");

  //console.log(validateEmptyFields(inputFields));

  if (validateEmptyFields(inputFields)) {
    convertLeadRDStation(inputFields);
    swal({
      title: "Obrigado!",
      icon: "success",
      text: "Suas informações foram enviadas, entraremos em contato em breve. ",
    });
  }
});

function handdleShowContent(idContent) {
  //Reset hiddens
  let elContents = $("div[id^='content-']");

  elContents.map((key, item) => {
    $(item).removeClass("show");
    $(item).addClass("hide");
  });

  $(idContent).addClass("show");
}

function handdleShowContentSections(idContent, thisElement) {
  //Reset active button
  let strategyButtons = $(".btn-strategy ul li");
  strategyButtons.map((key, item) => {
    $(item).removeClass("active");
  });
  $(thisElement).addClass("active");

  //Reset hiddens
  let elContentsSection13 = $("div[id^='section-13-content']");

  elContentsSection13.map((key, item) => {
    $(item).removeClass("show");
    $(item).addClass("hide");
  });

  $(idContent).addClass("show");
}

function handdleShowMultipleSectionContent(
  idContent,
  thisElement,
  currentPage = 1
) {
  //Reset active button
  let stepButtons = $(".btn-sections ul li");
  stepButtons.map((key, item) => {
    $(item).removeClass("active");
  });
  $(thisElement).addClass("active");

  //Reset hiddens
  let elMultipleSectionContent = $("div[id^='single-content-']");
  elMultipleSectionContent.map((key, item) => {
    $(item).removeClass("show");
    $(item).addClass("hide");
  });

  // Show Content Selected
  $(idContent).addClass("show");

  // Update Next and Previous Buttons Navigations
  if (currentPage > 1) {
    $(".paginate.prev").attr("style", "opacity: 1;pointer-events: inherit");
  } else {
    $(".paginate.prev").attr("style", "opacity: 0;pointer-events: none");
  }
  if (currentPage < 5) {
    $(".paginate.next").attr("style", "opacity: 1;pointer-events: inherit");
  } else {
    $(".paginate.next").attr("style", "opacity: 0;pointer-events: none");
  }

  $(".paginate.next").attr(
    "onclick",
    `handdleShowMultipleSectionContent('#single-content-${
      currentPage + 1
    }', this, ${currentPage + 1})`
  );

  $(".paginate.prev").attr(
    "onclick",
    `handdleShowMultipleSectionContent('#single-content-${
      currentPage - 1
    }', this, ${currentPage - 1})`
  );

  // Set number step
  let numberStep = $("#multiple-section .navigation-steps .number-step");
  numberStep.text(currentPage);
}

//Ação quando submita o formulário
$("button#submit-button").on("click", function (e) {
  e.preventDefault();
  let formContainer = $(this).closest("form");
  let inputFields = $(formContainer).find("input");

  if (validateEmptyFields(inputFields)) {
    convertLeadRDStation(inputFields);
    swal({
      title: "Obrigado!",
      icon: "success",
      text: "Suas informações foram enviadas, entraremos em contato em breve. ",
    });
  }
});

//capturando UTM's
function getUrlParamByName(name, url) {
  if (!url) url = window.location.href;

  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  var results = regex.exec(url);

  if (!results) return null;
  if (!results[2]) return "";

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function convertLeadRDStation(inputs, selects = null) {
  const dataLead = [];
  inputs.each((key, item) => {
    var valueField;
    // Se for Accept Legal convert o value para sim ou nao
    if ($(item).attr("type") === "checkbox" && $(item).val() === "on") {
      valueField = $(item).is(":checked") ? "Sim" : "Não";
    } else {
      valueField = $(item).val();
    }
    dataLead.push({ name: $(item).attr("name"), value: valueField });
  });

  dataLead.push(
    { name: "utm_source", value: getUrlParamByName("utm_source") },
    { name: "utm_medium", value: getUrlParamByName("utm_medium") },
    { name: "utm_campaign", value: getUrlParamByName("utm_campaign") },
    { name: "utm_term", value: getUrlParamByName("utm_term") },
    { name: "utm_content", value: getUrlParamByName("utm_content") },
    { name: "url_pagina", value: window.location.href },
    { name: "token_rdstation", value: "d6b1a3de54dc354a8ff2e592ceaef3b4" },
    {
      name: "identificador",
      value: `geracao-demanda-${new Date().getFullYear()}`,
    }
  );

  RdIntegration.post(dataLead);

  $("input").val("");
  // $("select").val("");

  // setTimeout(() => {
  //   $(".msg").show("fade");
  // }, 1000);

  // setTimeout(() => {
  //   $(".msg").hide("fade");
  // }, 10000);
}

// Força digitar apenas letras no campo nome
$("input[name=name]").keyup(function () {
  this.value = this.value.replace(
    /[^A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]/g,
    ""
  );
});

// Validação no formato de e-mail
function validacaoEmail(email) {
  var verifica =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return verifica.test(String(email).toLowerCase());
}

// Validação de e-mail corporativo
var invalidDomains = [
  "@gmail.",
  "@yahoo.",
  "@hotmail.",
  "@live.",
  "@aol.",
  "@outlook.",
  "@bol.",
  "@uol.",
  "@icloud.",
  "@ig.",
];

function emailCorporativo(email) {
  const emailNormalized = String(email).toLowerCase();
  for (var i = 0; i < invalidDomains.length; i++) {
    var domain = invalidDomains[i];
    if (emailNormalized.indexOf(domain) != -1) {
      return false;
    }
  }
  return true;
}

// Faz a validação dos campos vazios
function validateEmptyFields(inputs, selects = null) {
  // Verificar se os inputs estão vazios
  inputs.each((key, item) => {
    var valueField = $(item);

    // Verificação no input do tipo checkbox
    if (
      valueField.attr("type") === "checkbox" &&
      valueField.is(":checked") === false
    ) {
      $(valueField);
      swal({
        title: "Informação incorreta",
        icon: "error",
        text: "É necessário aceitar os termos. ",
      });
    } else if (valueField.attr("type") === "tel") {
      let formatedNumberPhone = $(valueField)
        .val()
        .replace(/[^a-zA-Z0-9_]/g, "");
      const allEqual = arr => arr.every(v => v === arr[0]);
      let isEqual = allEqual(formatedNumberPhone.split(""));

      if (
        ($(valueField).val().length > 0 && $(valueField).val().length <= 13) ||
        isEqual
      ) {
        swal({
          title: "Informação incorreta",
          icon: "error",
          text: "Número de telefone incompleto ou no formato não aceito.",
        });
      }
    }

    // Validação de e-mail
    if (valueField.attr("name") === "email") {
      if (valueField.val().length > 3 && !validacaoEmail(valueField.val()))
        swal({
          title: "Informação incorreta",
          icon: "error",
          text: "Formato de e-mail inválido.",
        });

      if (!emailCorporativo(valueField.val()))
        swal({
          title: "Informação incorreta",
          icon: "error",
          text: "Utilize um e-mail corporativo.",
        });
    }

    if (valueField.val().length === 0) {
      swal({
        title: "Informação incorreta",
        icon: "error",
        text: "O campo não pode ser vazio.",
      });
    }
  });

  inputEmptyFields = inputs.filter((key, el) => {
    return $(el).val().length === 0;
  });

  let formatedNumberPhone = $("input[type=tel]")
    .val()
    .replace(/[^a-zA-Z0-9_]/g, "");
  const allEqual = arr => arr.every(v => v === arr[0]);
  let isEqual = allEqual(formatedNumberPhone.split(""));

  if (
    inputEmptyFields.length !== 0 ||
    !validacaoEmail($("input[type=email]").val()) ||
    !emailCorporativo($("input[type=email]").val()) ||
    isEqual ||
    ($("input[type=tel]").attr("type") === "tel" &&
      $("input[type=tel]").val().length > 0 &&
      $("input[type=tel]").val().length <= 13)
  ) {
    return false;
  } else {
    return true;
  }
}

// Ao clicar ele rola a página até o ID definido
function scrollToForm(target = "#first") {
  document.querySelector(target).scrollIntoView({
    behavior: "smooth",
  });
}

function showMenu() {
  $("#menu-top nav ul").addClass("show");
}
function closeMenu() {
  $("#menu-top nav ul").removeClass("show");
}
