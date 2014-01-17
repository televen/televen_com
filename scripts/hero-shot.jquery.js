$(function(){
	$(".navigators .left").live("click", function(){
		$(".hero-images").stop();
		console.debug(hs.timeout);
		hs.animatePieces('left');
	});

	$(".navigators .right").live("click", function(){
		hs.animatePieces('right');
	});
});

function HeroShot(){}
HeroShot.prototype.timer 			= 20000;
HeroShot.prototype.timer_change		= 2000;
HeroShot.prototype.timer_between	= 2500;
HeroShot.prototype.timer_shine		= 2500;
HeroShot.prototype.masterClass		= ".hero-shot";
HeroShot.prototype.photos 			= ".hero-images";
HeroShot.prototype.photo 			= ".hero-images ul li";
HeroShot.prototype.photo_list		= ".hero-images ul";
HeroShot.prototype.indicators 		= ".counter ul";
HeroShot.prototype.shine	 		= ".hero-shine";
HeroShot.prototype.navigators		= ".navigators";
HeroShot.prototype.left_arrow		= ".navigators .left .indicator";
HeroShot.prototype.right_arrow		= ".navigators .right .indicator";
HeroShot.prototype.timeout			= "";

HeroShot.prototype.init = function(){
	var counter = 0;
	$.each($(this.masterClass + " " + this.photo), function(i, item){
		counter++;
	});
	$(this.photos).width(counter*700);
	var html = "";
	for(i=0;i<counter;i++){
		html = html + "<li id='h-" + (i+1) + "'>&nbsp;</li>";
	}
	$(this.indicators).html(html);
	$(this.indicators + " #h-1").addClass("hero-active");
	this.animateShine();
	this.timeout = setTimeout("hs.animatePieces('left')", this.timer_shine);
}

HeroShot.prototype.animateShine = function(){
	$(this.shine).css({left:"-700px"});
	var timer = this.timer_change;
	$(this.shine).animate({left:"700px"}, this.timer_shine, "linear", function(){
		this.timeout = setTimeout("hs.animateShine()", timer);
	});
}

HeroShot.prototype.animatePieces = function(direction){
	clearTimeout(this.timeout);
	var temp_html 	= ""; 
	var id 			= 0;
	var id_actual	= 0;
	var id_next		= 0;
	var photo 		= this.photo;
	var photo_list 	= this.photo_list;
	var photos 		= this.photos;
	var timer 		= this.timer_between;
	var indicators	= this.indicators;
	var left_arrow	= this.left_arrow;
	var right_arrow	= this.right_arrow;
	var counter 	= 0;
	var active		= "";
	var timeout		= this.timeout;
	var navigators	= this.navigators;
	
	$(".hero-active").removeClass("hero-active");
	$(".hero-wrapper-bg, .hero-wrapper").fadeOut("slow");
	var dir = (direction == "left") ? "-" : "+";
	temp_html = (direction == "left") ? $(photo).first().html() : $(photo).last().html();
	id = (direction == "left") ? $(photo).first().attr("id") : $(photo).last().attr("id");
	
	if(direction != "left"){
		$(photo).last().remove();
		$(photo_list).prepend("<li class='" + id + "' id='" + id + "'>" + temp_html + "</li>");
		$(photos).css({left:"-700px"});
	}	
	
	$(this.photos).animate({left:(dir + "=700px")}, this.timer_change, "linear", function(){
		if(counter == 0){
			$(".hero-wrapper-bg, .hero-wrapper").fadeIn("slow");
			if(direction == "left"){
				$(photo).first().remove();
				$(photo_list).append("<li class='" + id + "' id='" + id + "'>" + temp_html + "</li>");
			}			
			$(photos).css({left:"0px"});
			
			id_actual = $(photo).first().attr("id");
			$(indicators + " #" + id_actual).addClass("hero-active");
			
			id_next = $(photo + ":nth-child(2)").attr("id");
			
			$(left_arrow).data("piece", id);
			$(right_arrow).data("piece", id_next);
			timeout = setTimeout("hs.animatePieces('" + direction + "')", timer);
		}
		counter++;
	});
}

/*
HeroShot.prototype.animatePieces = function(){
	var temp_html 	= ""; 
	var id 			= 0;
	var id_actual	= 0;
	var id_next		= 0;
	var photo 		= this.photo;
	var photo_list 	= this.photo_list;
	var photos 		= this.photos;
	var timer 		= this.timer_between;
	var indicators	= this.indicators;
	var left_arrow	= this.left_arrow;
	var right_arrow	= this.right_arrow;
	var counter 	= 0;
	var active		= "";
	$(this.photos).animate({left:"-700px"}, this.timer_change, "linear", function(){
		if(counter == 0){
			temp_html = $(photo).first().html();
			id = $(photo).attr("id");
			$(photo).first().remove();
			$(".hero-active").removeClass("hero-active");
			$(photo_list).append("<li class='" + id + "' id='" + id + "'>" + temp_html + "</li>");
			$(photos).css({left:"0px"});
			
			id_actual = $(photo).first().attr("id");
			$(indicators + " #" + id_actual).addClass("hero-active");
			
			id_next = $(photo + ":nth-child(2)").attr("id");
			
			//console.debug(id + " " + id_actual + " " + id_next);
			//console.debug($(left_arrow).data("piece"));
			
			$(left_arrow).data("piece", id);
			$(right_arrow).data("piece", id_next);
			
			setTimeout("hs.animatePieces()", timer);
		}
		counter++;
	});
}*/