$(function(){
	$(".menu li").mouseenter(function(){
		$(this).children(".menu-plus").fadeIn("fast");
	}).mouseleave(function(){
		$(this).children(".menu-plus").fadeOut("fast");
	});
	
	br = new BreakingNews();
	br.init();
	
	hs = new HeroShot();
	hs.init();
	
	ns = new News();
	ns.init();
	
	$(".programs").click(function() {
		$('html, body').animate({
			scrollTop: $("footer").offset().top
		}, 1000);
	});
});