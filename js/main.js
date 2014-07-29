// using jquery ready event instead of window onload
$(function() {

	var progressBar = $('.loader>span');
	var closeModal = $('.modal__hdr>span>a');
	var openModal = $('.content>h1>a');
	var progressText = $(".loader__text");

	function initProgressBar() {
		progressBar.width(0);
		$.getJSON( './js/data.json', function(res) {
			loadProgressBar(res.data.lightbox);
		});
	}

	function loadProgressBar(data) {
		progressBar
			.addClass('loader__blue')
			.animate(
				{ "width": data.finish + "%" },
				{
					duration: data.duration,
					progress: function(promise, remaining){
						var percent = Math.round(remaining * 100);
						progressText.html('Progress: ' + percent + '%');
					},
					complete: function() {
						$(this).toggleClass('loader__blue loader__green');
						progressText.html('This task is 100% completed').addClass('tick');
					}
				});
	}

	function toggleModal() {
		$('.modal').toggle();
		$('.overlay').toggle();
	}

	closeModal.click(function() {
		progressBar.toggleClass('loader__blue loader__green');
		progressText.removeClass('tick');
		toggleModal();
	});

	openModal.click(function() {
		toggleModal();
		initProgressBar();
	});

	initProgressBar();

});
