AOS.init({
	disable: 'mobile',
	duration: 800,
	once: true
});

window.onscroll = function() {
	scrollFunction()
};

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