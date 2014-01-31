$(function(){
	$(".menu li").mouseenter(function(){
		$(this).children(".menu-plus").fadeIn("fast");
	}).mouseleave(function(){
		$(this).children(".menu-plus").fadeOut("fast");
	});
	
	$(".promotion").mouseenter(function(){
		$(this).children(".promotion-info").toggleClass("hover");
	}).mouseleave(function(){
		$(this).children(".promotion-info").toggleClass("hover");
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
		
	var counter = 0;
	$.each($(".video-list > li"), function(i, item){
		$(item).attr("data-counter", counter);
		counter++;
	});
	
	$(".video-list > li").mouseover(function(){
		$(this).addClass("selected");
		setTimeout("toggleVideos()", 500);
	}).mouseout(function(){
		$(this).removeClass("selected");
		setTimeout("toggleVideos()", 500);
	});
});

function toggleVideos(){
	if($(".selected")[0]){
		$(".video-list > li:not(.selected)").css("display", "none");
	}else{
		$(".video-list > li").css("display", "block");
	}
}