AOS.init({
	disable: 'mobile',
	duration: 800,
	once: true
});

window.onscroll = function() {
	scrollFunction()
};


$(document).ready(function() {

    function getUrlParamByName(name, url) {
		if (!url) url = window.location.href;

		name = name.replace(/[\[\]]/g, '\\$&');

		var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
		var results = regex.exec(url);

		if (!results) return null;
		if (!results[2]) return '';

		return decodeURIComponent(results[2].replace(/\+/g, ' '));
	}

	$('#utm_source').val(getUrlParamByName('utm_source'));
	$('#utm_medium').val(getUrlParamByName('utm_medium'));
	$('#utm_campaign').val(getUrlParamByName('utm_campaign'));
	$('#utm_term').val(getUrlParamByName('utm_term'));
	$('#utm_content').val(getUrlParamByName('utm_content'));
});

$('input[type="tel"]').on('change keypress blur', function(e){
	let tel = $(this);
	tel.unmask();
	console.log(tel.val().length);
	tel.val().length <= 14 ? tel.mask('(00) 0000-0000') : tel.mask('(00) 00000-0000');
});


function validacaoEmail(email) {
	var verifica =
	  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return verifica.test(String(email).toLowerCase());
}


$('#btn-lead').on('click', function(e){
	e.preventDefault();
	var identificador = 'guia-de-abm';
	nome = $("#formOneMain  input[name='Nome']");
	email = $("#formOneMain  input[name='Email']");
	telefone = $("#formOneMain  input[name='Telefone']");

	localStorage.setItem("Nome", nome.val());
	localStorage.setItem("Email", email.val());
	localStorage.setItem("Telefone", telefone.val());

	var utm_source = $('#utm_source');
	var utm_medium = $('#utm_medium');
	var utm_campaign = $('#utm_campaign');
	var utm_term = $('#utm_term');
	var utm_content = $('#utm_content');

	if(!nome.val()){
		Swal.fire({
			icon: 'warning',
			title: 'Campo obrigatório',
			text: 'Informe seu nome',
			timer: 2000,
			onAfterClose: () => {
				nome.focus();
			}
		});
	} else if (!validacaoEmail(email.val())){

		Swal.fire({
			icon: 'warning',
			title: 'Campo obrigatório',
			text: 'Informe seu e-mail',
			timer: 2000,
			onAfterClose: () => {
				email.focus();
			}
		});

	} else if(telefone.val().length < 14){

		Swal.fire({
			icon: 'warning',
			title: 'Campo obrigatório',
			text: 'Informe seu telefone',
			timer: 2000,
			onAfterClose: () => {
				telefone.focus();
			}
		});

	} else {
		

		var enviaRD = [
			{ name: 'identificador', value: identificador},
			{ name: 'Nome', value: nome.val()},
			{ name: 'Telefone', value: telefone.val()},
			{ name: 'email', value: email.val()},
			{ name: 'utm_source', value: utm_source.val()},
			{ name: 'utm_medium', value: utm_medium.val()},
			{ name: 'utm_campaign', value: utm_campaign.val()},
			{ name: 'utm_content', value: utm_content.val()},
			{ name: 'utm_term', value: utm_term.val()},
			{ name: 'token_rdstation', value: 'd6b1a3de54dc354a8ff2e592ceaef3b4'}
		];

		RdIntegration.post(enviaRD, function() {
			Swal.fire({
				icon: 'sucess',
				title: 'Dados enviados',
				text: 'Seus dados foram enviados com sucesso, preencha os dados adicionais!',
				timer: 10000, 
				onAfterClose: () => {
					$('.step1').addClass('d-none');
					$('.step2').removeClass('d-none');
					$("#formTwoMain input[name='namebusiness']").focus();
					return true;
				}
			});
		});
	}

});

$('#btn-form-step2').on('click', function(e){
	
	e.preventDefault();
	var identificador = 'guia-de-abm-step-2';

	nome = localStorage.getItem("Nome");
	telefone = localStorage.getItem("Telefone");
	email = localStorage.getItem("Email");

	var empresa = $("#formTwoMain input[name='namebusiness']");
	var modeloNegocio = $("#formTwoMain select[name='modelbusiness']");
	var seguimentoNegocio =  $("#formTwoMain select[name='optionbusiness']");
	var funcionarios = $("#formTwoMain select[name='numberemployees']");
	var cargo = $("#formTwoMain select[name='office']");
	var siteEmpresa = $("#formTwoMain input[name='website']");

	var utm_source = $('#utm_source');
	var utm_medium = $('#utm_medium');
	var utm_campaign = $('#utm_campaign');
	var utm_term = $('#utm_term');
	var utm_content = $('#utm_content');

	if(!empresa.val()){
		Swal.fire({
			icon: 'warning',
			title: 'Campo obrigatório',
			text: 'Informe o nome da empresa',
			timer: 2000,
			onAfterClose: () => {
				empresa.focus();
			}
		});
	} else if (modeloNegocio.val() == ""){
		Swal.fire({
			icon: 'warning',
			title: 'Campo obrigatório',
			text: 'Informe o modelo de negócio',
			timer: 2000,
			onAfterClose: () => {
				modeloNegocio.focus();
			}
		});
	} else if (seguimentoNegocio.val() == ""){
		Swal.fire({
			icon: 'warning',
			title: 'Campo obrigatório',
			text: 'Informe o seguimento',
			timer: 2000,
			onAfterClose: () => {
				seguimentoNegocio.focus();
			}
		});
	} else if(funcionarios.val() == ""){
		Swal.fire({
			icon: 'warning',
			title: 'Campo obrigatório',
			text: 'Selecione a quantidade de funcionários',
			timer: 2000,
			onAfterClose: () => {
				funcionarios.focus();
			}
		});

	} else if(!siteEmpresa.val()) {
		Swal.fire({
			icon: 'warning',
			title: 'Campo obrigatório',
			text: 'Selecione o cargo',
			timer: 2000,
			onAfterClose: () => {
				siteEmpresa.focus();
			}
		});
	} else if(cargo.val() == "") {
		Swal.fire({
			icon: 'warning',
			title: 'Campo obrigatório',
			text: 'Selecione o cargo',
			timer: 2000,
			onAfterClose: () => {
				cargo.focus();
			}
		});
	} else {
		var enviaRD = [
			{ name: 'identificador', value: identificador},
			{ name: 'Nome', value: nome},
			{ name: 'Telefone', value: telefone},
			{ name: 'email', value: email}, 
			{ name: 'nome_empresa ⭐️', value: empresa.val()},
			{ name: 'leads-modelo-negocio ⭐️', value: modeloNegocio.val()},
			{ name: 'leads-segmento-atuacao ⭐️', value: seguimentoNegocio.val()},
			{ name: 'Número de Funcionários ⭐', value: funcionarios.val()},
			{ name: 'Qual seu cargo ⭐️', value: cargo.val()},
			{ name: 'Site', value: siteEmpresa.val()},
			{ name: 'Proteção de dados ⭐️', value: 1},
			{ name: 'utm_source ⭐️', value: utm_source.val()},
			{ name: 'utm_medium ⭐️', value: utm_medium.val()},
			{ name: 'utm_campaign ⭐️', value: utm_campaign.val()},
			{ name: 'utm_content ⭐️', value: utm_content.val()},
			{ name: 'utm_term ⭐️', value: utm_term.val()},
			{ name: 'token_rdstation', value: 'd6b1a3de54dc354a8ff2e592ceaef3b4'}
		];

		RdIntegration.post(enviaRD, function() {
			Swal.fire({
				icon: 'sucess',
				title: 'Dados enviados',
				text: 'Seus dados foram enviados com sucesso!',
				timer: 50000,
				onAfterClose: () => {
					$('.step1').removeClass('d-none');
					$('.step2').addClass('d-none');
					$('#modalFormularioPrincipal').modal('hide');
					return true;
				}
			});
		});
	}

});

$('#btn-guia-completo').on('click', function(e){
	e.preventDefault();

	var identificador = 'guia-de-abm-completo';
	nome = $("#form-guia-completo  input[name='Nome']");
	email = $("#form-guia-completo  input[name='Email']");
	telefone = $("#form-guia-completo  input[name='Telefone']");

	var empresa = $("#form-guia-completo input[name='namebusiness']");
	var modeloNegocio = $("#form-guia-completo select[name='modelbusiness']");
	var seguimentoNegocio =  $("#form-guia-completo select[name='optionbusiness']");
	var funcionarios = $("#form-guia-completo select[name='numberemployees']");
	var cargo = $("#form-guia-completo select[name='office']");
	var siteEmpresa = $("#form-guia-completo input[name='website']");
	var termo_aceite = $("#form-guia-completo input[name='accept']");
	
	var utm_source = $('#utm_source');
	var utm_medium = $('#utm_medium');
	var utm_campaign = $('#utm_campaign');
	var utm_term = $('#utm_term');
	var utm_content = $('#utm_content');

	if(!nome.val()){
		Swal.fire({
			icon: 'warning',
			title: 'Campo obrigatório',
			text: 'Informe seu nome',
			timer: 2000,
			onAfterClose: () => {
				nome.focus();
			}
		});
	} else if(telefone.val().length < 14){
		Swal.fire({
			icon: 'warning',
			title: 'Campo obrigatório',
			text: 'Informe seu telefone',
			timer: 2000,
			onAfterClose: () => {
				telefone.focus();
			}
		});
	} else if (!validacaoEmail(email.val())){
		Swal.fire({
			icon: 'warning',
			title: 'Campo obrigatório',
			text: 'Informe seu e-mail',
			timer: 2000,
			onAfterClose: () => {
				email.focus();
			}
		});

	} else if(!empresa.val()){
		Swal.fire({
			icon: 'warning',
			title: 'Campo obrigatório',
			text: 'Informe o nome da empresa',
			timer: 2000,
			onAfterClose: () => {
				empresa.focus();
			}
		});
	} else if (modeloNegocio.val() == ""){
		Swal.fire({
			icon: 'warning',
			title: 'Campo obrigatório',
			text: 'Informe o modelo de negócio',
			timer: 2000,
			onAfterClose: () => {
				modeloNegocio.focus();
			}
		});
	} else if (seguimentoNegocio.val() == ""){
		Swal.fire({
			icon: 'warning',
			title: 'Campo obrigatório',
			text: 'Informe o seguimento',
			timer: 2000,
			onAfterClose: () => {
				seguimentoNegocio.focus();
			}
		});
	} else if(funcionarios.val() == ""){
		Swal.fire({
			icon: 'warning',
			title: 'Campo obrigatório',
			text: 'Selecione a quantidade de funcionários',
			timer: 2000,
			onAfterClose: () => {
				funcionarios.focus();
			}
		});

	} else if(cargo.val() == "") {
		Swal.fire({
			icon: 'warning',
			title: 'Campo obrigatório',
			text: 'Selecione o cargo',
			timer: 2000,
			onAfterClose: () => {
				cargo.focus();
			}
		});
	} else if(!siteEmpresa.val()) {
		Swal.fire({
			icon: 'warning',
			title: 'Campo obrigatório',
			text: 'Informe o site da empresa',
			timer: 2000,
			onAfterClose: () => {
				siteEmpresa.focus();
			}
		});
	}  else if(!termo_aceite.is(":checked")) {
		Swal.fire({
			icon: 'warning',
			title: 'Termo obrigado',
			text: 'Para prosseguir e necessário aceitar o termo.',
			timer: 2000,
			onAfterClose: () => {
				termo_aceite.focus();
			}
		});
	} else {
		var enviaRD = [
			{ name: 'identificador', value: identificador},
			{ name: 'Nome', value: nome.val()},
			{ name: 'Telefone', value: telefone.val()},
			{ name: 'email', value: email.val()}, 
			{ name: 'nome_empresa ⭐️', value: empresa.val()},
			{ name: 'leads-modelo-negocio ⭐️', value: modeloNegocio.val()},
			{ name: 'leads-segmento-atuacao ⭐️', value: seguimentoNegocio.val()},
			{ name: 'Número de Funcionários ⭐', value: funcionarios.val()},
			{ name: 'Qual seu cargo ⭐️', value: cargo.val()},
			{ name: 'Site', value: siteEmpresa.val()},
			{ name: 'Proteção de dados ⭐️', value: 1},
			{ name: 'utm_source ⭐️', value: utm_source.val()},
			{ name: 'utm_medium ⭐️', value: utm_medium.val()},
			{ name: 'utm_campaign ⭐️', value: utm_campaign.val()},
			{ name: 'utm_content ⭐️', value: utm_content.val()},
			{ name: 'utm_term ⭐️', value: utm_term.val()},
			{ name: 'token_rdstation', value: 'd6b1a3de54dc354a8ff2e592ceaef3b4'}
		];

		RdIntegration.post(enviaRD, function() {
			Swal.fire({
				icon: 'sucess',
				title: 'Dados enviados',
				text: 'Seus dados foram enviados com sucesso!',
				timer: 50000,
				onAfterClose: () => {
					$('#modalFormularioPrincipal').modal('hide');
					return true;
				}
			});
		});
	}

});

function scrollFunction() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		$("#scrollTop").fadeIn();
	} else {
		$("#scrollTop").fadeOut();
	}
}

function topFunction() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}

$('.beneficios-bowe').slick({
	dots: true,
	infinite: true,
	slidesToShow: 5,
	slidesToScroll: 5,
	responsive: [{
		breakpoint: 1024,
		settings: {
			slidesToShow: 3,
			slidesToScroll: 3,
			infinite: true,
			dots: true
		}
	}, {
		breakpoint: 600,
		settings: {
			slidesToShow: 2,
			slidesToScroll: 2
		}
	}, {
		breakpoint: 480,
		settings: {
			slidesToShow: 1,
			slidesToScroll: 1
		}
	}],
	nextArrow: '<button class="slick-next slick-arrow"><img src="assets/img/proximo.webp"/></button>',
	prevArrow: '<button class="slick-prev slick-arrow"><img src="assets/img/anterior.webp"/></button>'
});

$(document).ready(function(){
	$('.section14 #slider').slick({
		dots: true,
		autoplay: false,
		autoplaySpeed: 5000,
		prevArrow: '<button class="slick-prev slick-arrow"><img src="assets/img/previous.svg"/></button>',
		nextArrow: '<button class="slick-next slick-arrow"><img src="assets/img/next.svg"/></button>',
	});

	$('.section19 #slider').slick({
		dots: true,
		autoplay: false,
		autoplaySpeed: 5000,
		prevArrow: '<button class="slick-prev slick-arrow"><img src="assets/img/previous.svg"/></button>',
		nextArrow: '<button class="slick-next slick-arrow"><img src="assets/img/next.svg"/></button>',
	});

	$('.section20 #slider-personalizado').slick({
		arrows: true,
		autoplay: false,
		prevArrow: $('.carousel-prev'),
		nextArrow: $('.carousel-next'),
	});

	$('.section22 #slider').slick({
		dots: true,
		autoplay: false,
		autoplaySpeed: 5000,
		slidesToShow: 2,
		slidesToScroll: 2,
		prevArrow: '<button class="slick-prev slick-arrow"><img src="assets/img/prev-dark.svg"/></button>',
		nextArrow: '<button class="slick-next slick-arrow"><img src="assets/img/next-dark.svg"/></button>',
		responsive: [
			{
			breakpoint: 1024,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				dots: false
			}
			},
			{
			breakpoint: 795,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
			},
			{
			breakpoint: 600,
			settings: "unslick"
			}
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
		]
	});
});

$("a.logoflutuante").hide();
	// menu mobile
$( '#abrirmenu' ).click(function() {
	$('.menu.links').fadeIn();
});

$( ".fecharmenu" ).click(function() {
	$('.menu.links').fadeOut();
});


$( '#toggle').click(function() {
	if($('#toggle > div').hasClass('gTunwP') && $('#menu .menu').hasClass('inativo')){
		$('#toggle> div').removeClass('gTunwP');
		$('#toggle> div').addClass('gQUzWT');

		$('#menu .menu').removeClass('inativo');
		$('#scrollTop').fadeOut();
	} else {
		$('#toggle> div').removeClass('gQUzWT');
		$('#toggle> div').addClass('gTunwP');

		$('#menu .menu').addClass('inativo');
		$('#scrollTop').fadeIn();
	}
});

$("#cadastronews").on('click',function (e) {
	e.preventDefault();
	var email = $("#emailnews").val();
	if(!(email)) {
		Swal.fire({
			icon: 'warning',
			text: 'Informe seu e-mail.',
			timer: 5000
			});
		return false;
	}
	else{

		var data_array = [
			{ name: 'email', value: email},
			{ name: 'token_rdstation', value: 'd6b1a3de54dc354a8ff2e592ceaef3b4'},
			{ name: 'identificador', value: 'Bowe - Página ABM | Newsletter'}
		];

		RdIntegration.post(data_array);

		setTimeout(function() {
			Swal.fire({
				type: 'success',
				title: 'Obrigado!',
				text: 'A partir de agora, você receberá nossos insights em primeira mão!',
				timer: 5000
			});
		},1500);
		return true;
	}
});

$(document).ready(function() {

	if ($(window).width() < 1100) {
        $('#menu .menu').css("padding", "35px 0px");
        $('#menu .menu ul').hide();
		$('.toggle.mobile').show();
		
		$('.toggle').click(function(){
			$('html').css("overflow","hidden");
			$('#menu .menu').css("width", "100%");
			$('#menu .menu').css("padding", "35px 35px 0px");
			$('#menu .menu ul').fadeIn();
			$('.togglefechar').fadeIn();
			$('.toggle').hide();
		});
		$('.togglefechar').click(function(){
			$('html').css("overflow","scroll");
			$('#menu .menu').css("width", "0px");
			$('#menu .menu').css("padding", "35px 0px");
			$('#menu .menu ul').fadeOut();
			$('.togglefechar').hide();
			$('.toggle').show();
		});
    }

	window.addEventListener("resize", myFunction);

	function myFunction() {
		if ($(window).width() < 1100) {

			$('#menu .menu').css("padding", "35px 0px");
			$('#menu .menu ul').hide();
			$('.toggle.mobile').show();
			
			$('.toggle').click(function(){
				$('html').css("overflow","hidden");
				$('#menu .menu').css("width", "100%");
				$('#menu .menu').css("padding", "35px 35px 0px");
				$('#menu .menu ul').fadeIn();
				$('.togglefechar').fadeIn();
				$('.toggle').hide();
			});
			$('.togglefechar').click(function(){
				$('html').css("overflow","scroll");
				$('#menu .menu').css("width", "0px");
				$('#menu .menu').css("padding", "35px 0px");
				$('#menu .menu ul').fadeOut();
				$('.togglefechar').hide();
				$('.toggle').show();
			});
		 }
		 else {
			$('#menu .menu').css("padding", "0px");
			$('#menu .menu ul').show();
			$('.toggle.mobile').hide();
		 }
	}
	
	$('.togglefechar').hide();



	$('#section17-01-programatico').hide('fast');
	$('#section17-02-lite').hide('fast');
	$('#section17-03-estrategico').hide('fast');
	$('#resumo-abm').hide('fast');


	/***** POPUP 01 - ABM PROGRAMÁTICO *****/

	$("#abm-programatico").on('click',function (e) {
		e.preventDefault();
		$('#section17-01-programatico').show('slide', {direction: 'right'}, 1000);
	});

	$("#section17-01-programatico #fechar").on('click',function (e) {
		e.preventDefault();
		$('#section17-01-programatico').hide('slide', {direction: 'right'}, 1000);
	});

	/***** POPUP 02 - ABM LITE *****/

	$("#abm-lite").on('click',function (e) {
		e.preventDefault();
		$('#section17-02-lite').show('slide', {direction: 'right'}, 1000);
	});

	$("#section17-02-lite #fechar").on('click',function (e) {
		e.preventDefault();
		$('#section17-02-lite').hide('slide', {direction: 'right'}, 1000);
	});


	/***** POPUP 03 - ABM ESTRATÉGICO *****/

	$("#abm-estrategico").on('click',function (e) {
		e.preventDefault();
		$('#section17-03-estrategico').show('slide', {direction: 'right'}, 1000);
	});

	$("#section17-03-estrategico #fechar").on('click',function (e) {
		e.preventDefault();
		$('#section17-03-estrategico').hide('slide', {direction: 'right'}, 1000);
	});


	/***** POPUP 04 - RESUMO *****/

	$("#popup-resumo-abm").on('click',function (e) {
		e.preventDefault();
		$('#resumo-abm').show('slide', { direction: "down" }, 1000)
	});

	$("#resumo-abm #fechar").on('click',function (e) {
		e.preventDefault();
		$('#resumo-abm').hide('slide', { direction: "down" }, 1000)
	});
	
	
});