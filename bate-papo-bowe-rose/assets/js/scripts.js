$(window).on('scroll',function() {
	if (checkVisible($('#section03'))) {
		$('.counter-up').each(function() {  
			let tempo = 500;
			let tempo_intervalo = 1;
			let count_to = parseInt($(this).data('countTo'));
			let intervalos = tempo / tempo_intervalo; //quantos passos de animação tem
			let incremento = count_to / intervalos; //quanto cada contador deve aumentar
			let valor = 0;
			let el = $(this);
			
			let timer = setInterval(function() {
			if (valor >= count_to){ //se já contou tudo tem de parar o timer
				valor = count_to;
				clearInterval(timer);
			}
			
			let texto = valor.toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
			el.text(texto);
			valor += incremento;      
			}, tempo_intervalo);
			$(this).stop(true,true);
		});
		$(window).off('scroll');
	} else {
		// do nothing
	}
});

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

function checkVisible( elm, eval ) {
	eval = eval || "object visible";
	var viewportHeight = $(window).height(), // Viewport Height
		scrolltop = $(window).scrollTop(), // Scroll Top
		y = $(elm).offset().top,
		elementHeight = $(elm).height();   
	
	if (eval == "object visible") return ((y < (viewportHeight + scrolltop)) && (y > (scrolltop - elementHeight)));
	if (eval == "above") return ((y < (viewportHeight + scrolltop)));
}

$('#telefone').mask('(00) 0000-00009');
$('#telefone').blur(function(event) {
   if($(this).val().length == 15){ // Celular com 9 dígitos + 2 dígitos DDD e 4 da máscara
      $('#telefone').mask('(00) 00000-0009');
   } else {
      $('#telefone').mask('(00) 0000-00009');
   }
});

$('#comecar').click(function(){
	$('#modal').fadeIn();
});
$('.fechar').click(function(){
	$('#modal').fadeOut();
});

$('#envia-form-sonda-2').click(function(){

	var identificador = 'ABM Bowe + Sonda';
	var nome = $('#nome');
	var email = $('#email');
	var telefone = $('#telefone');

	var utm_source = $('#utm_source');
	var utm_medium = $('#utm_medium');
	var utm_campaign = $('#utm_campaign');
	var utm_term = $('#utm_term');
	var utm_content = $('#utm_content');

	if(!email.val()){

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
			{ name: 'token_rdstation', value: 'd6b1a3de54dc354a8ff2e592ceaef3b4'},
		];
			RdIntegration.post(enviaRD);

			setTimeout(function(){ 
				window.location.href = "https://calendly.com/kelmerteixeira/50?back=1";
             }, 1000);

	}

	return false;

});