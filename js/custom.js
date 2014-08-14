//GLOBALS
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

//SPECIFICS
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

	var windowType = $(this).attr('data-window-type');
	console.log(windowType);

	if($('.menu-pop-window[data-window-type="' + windowType + '"]').length){

		if($('.front-window').length){
			$('.front-window').removeClass('front-window');
		}
		$('.menu-pop-window[data-window-type="' + windowType + '"]').addClass('front-window');

	}
	else{
		$('.front-window').removeClass('front-window');

		var windowClone = $('.menu-pop-window.pattern').clone().appendTo('.outters').removeClass('hide pattern').addClass('front-window').resizable().draggable({ handle: '.title-bar'}).attr('data-window-type', windowType);
		$(windowClone).find('.window-title').text(windowType).css('textTransform', 'capitalize').parent('.menu-pop-window');

		var internalHeightSync = function(){
			$(windowClone).find('.internal-section').css('height', $(windowClone).height()*0.8).perfectScrollbar({suppressScrollX: true});
		}

		if(windowType == 'inventory')
		{
			$(windowClone).find('.pop-window-body').load( "examples/inventory.html", internalHeightSync);
		}
		else if(windowType == 'options'){
			$(windowClone).find('.pop-window-body').load( "examples/options.html", internalHeightSync);
		}
		else if(windowType == 'mail'){
			$(windowClone).find('.pop-window-body').load( "examples/mail.html", internalHeightSync);
		}

	}

});

$(document).on('resize', '.menu-pop-window', function(e){
	var currentWindow = $(e.target);

	//Don't uncomment unless you know what you are doing. It may and probably will break UI elements and lag as... badly.
	//var scrolltHeight = 0;
	//estimatedOutterHeight = $(currentWindow).find('.internal-section').css('height', '100%').height() + $(currentWindow).find('.title-bar').height() + $(currentWindow).find('.pop-window-toolbar').height() + $(currentWindow).find('.pop-window-footer').height();
	//$(currentWindow).closest('.menu-pop-window').css('max-height', estimatedOutterHeight);
	
	$(currentWindow).find('.internal-section').css('height', $(currentWindow).height()*0.8).perfectScrollbar('update');

});

$(document).on('click', '.menu-pop-window', function(e){
	$('.front-window').removeClass('front-window');
	$(e.target).closest('.menu-pop-window').addClass('front-window');
});

/*Windows closing*/
$(document).on('click', '.window-close', function(){
	$(this).closest('.menu-pop-window').remove();
});
