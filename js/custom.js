$(document).foundation({
	accordion: {
		// specify the class used for active (or open) accordion panels
		active_class: 'active',
		// allow multiple accordion panels to be active at the same time
		multi_expand: true,
		// allow accordion panels to be closed by clicking on their headers
		// setting to false only closes accordion panels when another is opened
		toggleable: true
	}
});

$('.accordion').on('click', 'dd', function (event) {
	$(this).closest('.content').slideToggle('fast');

	if($(this).find('i').hasClass('fa-plus')){
		$(this).find('i').removeClass('fa-plus').addClass('fa-minus');
	}
	else{
		$(this).find('i').removeClass('fa-minus').addClass('fa-plus');
	}
});

/*Custom scrollbar for slider, allows to move it around and style the way one pleases*/
$('.chat .tabs-content > .content').perfectScrollbar({
	suppressScrollX: true
});

/*Chat is there, just hit enter and type*/
$(window).bind('keypress', function(e) {
	if(e.keyCode || e.which == 13){
		$('input.prompt-line').focus();
	}
});

/*Pop-up with menu items*/
$(document).on('click', '.menu-pop', function(){

	var windowTitle = $(this).attr('data-window-name');

	if($('.menu-pop-window[data-window-name="' + windowTitle + '"]').length){

		if($('.front-window').length){
			$('.front-window').removeClass('front-window');
		}
		$('.menu-pop-window[data-window-name="' + windowTitle + '"]').addClass('front-window');

	}
	else{
		var windowClone = $('.menu-pop-window.pattern').clone().appendTo('.outters').removeClass('hide pattern').resizable().draggable({ handle: '.title-bar'}).attr('data-window-name', windowTitle);
		$(windowClone).find('.window-title').text(windowTitle).parent('.menu-pop-window');	
		$(windowClone).find('.internal-section').css('height', $(windowClone).height()*0.8).perfectScrollbar({suppressScrollX: true});
	}

});

$(document).on('resize', '.menu-pop-window', function(e){
	var currentWindow = $(e.target);

	$(currentWindow).find('.internal-section').css('height', $(currentWindow).height()-70).perfectScrollbar('update');;
});

$(document).on('click', '.menu-pop-window', function(e){
	$('.front-window').removeClass('front-window');
	$(e.target).closest('.menu-pop-window').addClass('front-window');
});

/*Windows closing*/
$(document).on('click', '.window-close', function(){
	$(this).closest('.menu-pop-window').remove();
});
