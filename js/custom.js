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
$('.chat .tabs-content > .content').jScrollPane();

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
			var estimatedInnerHeight = $(windowClone).height() - $(windowClone).find('.title-bar').height() - $(windowClone).find('.pop-window-toolbar').height() - $(windowClone).find('.pop-window-footer').height();
			$(windowClone).find('.internal-section').css('height', estimatedInnerHeight).jScrollPane({contentWidth: '0px', autoReinitialise: true});
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

	//It's window size limiting. Don't uncomment unless you know what you are doing. It may and probably will break UI elements and lag as... badly.
	//	console.log('internal:' + $(currentWindow).find('.internal-section')[0].scrollHeight);
	//	console.log('titlebar:' + $(currentWindow).find('.title-bar').height());
	//	console.log('toolbar:' + $(currentWindow).find('.pop-window-toolbar').height());
	//	console.log('footer:' + $(currentWindow).find('.pop-window-footer').height());
	//	var estimatedOutterHeight = $(currentWindow).find('.internal-section').prop('scrollHeight') + $(currentWindow).find('.title-bar').height() + $(currentWindow).find('.pop-window-toolbar').height() + $(currentWindow).find('.pop-window-footer').height();
	//	$(currentWindow).closest('.menu-pop-window').css('max-height', estimatedOutterHeight);

	var estimatedInnerHeight = $(currentWindow).height() - $(currentWindow).find('.title-bar').height() - $(currentWindow).find('.pop-window-toolbar').height() - $(currentWindow).find('.pop-window-footer').height();
	$(currentWindow).find('.internal-section').css('height', estimatedInnerHeight);

});

$(document).on('click', '.menu-pop-window', function(e){
	$('.front-window').removeClass('front-window');
	$(e.target).closest('.menu-pop-window').addClass('front-window');
});

/*Windows closing*/
$(document).on('click', '.window-close', function(){
	$(this).closest('.menu-pop-window').remove();
});
