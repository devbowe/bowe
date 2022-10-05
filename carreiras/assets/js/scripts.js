AOS.init({
	disable: 'mobile',
	duration: 800,
	once: true
});

$("a.logoflutuante").hide();
	// menu mobile
$( '#abrirmenu' ).click(function() {
	$('.menu.links').fadeIn();
});

$( ".fecharmenu" ).click(function() {
	$('.menu.links').fadeOut();
});

$('.carousel4').carousel({
	interval: 2000,
	pause:false
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
			{ name: 'identificador', value: 'Bowe - Página de Carreiras | Newsletter'}
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

	$(document).on("scroll",function(){
		if($(window).width()>1100){
			if($(document).scrollTop()>3430){
				$('.carousel4').carousel({
					interval: 2000
				});
				$('.carousel3').carousel({
					interval: 3000,
					pause:false
				});
			} else{
				$("#about").fadeIn();
				$("#about2").hide();
			}
		}
	});

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

});