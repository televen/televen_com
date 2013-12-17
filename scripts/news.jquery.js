function News(){}

News.prototype.timer			= 2000;
News.prototype.timer_change		= 5000;
News.prototype.master_class		= ".news-wrapper ";
News.prototype.news				= new Array(".one ", ".two ");
News.prototype.photos 			= ".news-content .overflowed-images";
News.prototype.photo_list		= ".news-content .overflowed-images ul";
News.prototype.photo 			= ".news-content .overflowed-images ul li";

News.prototype.init = function(){
	var counter = 0;
	var master_class= this.master_class;
	var photos		= this.photos;
	var photo		= this.photo;
	
	$.each(this.news, function(i,item){
		$.each($(master_class + item + photo), function(i, item){
			counter++;
		});
		$(master_class + item + photos).width(counter*340);
	});
	setTimeout("ns.animatePieces()", this.timer_change);
}

News.prototype.animatePieces = function(){
	var temp_html 	= "";
	var master_class= this.master_class;
	var photo 		= this.photo;
	var photos		= this.photos;
	var photo_list	= this.photo_list;
	var timer		= this.timer;
	var timer_change= this.timer_change;
	var counter 	= 0;
	
	$.each(this.news, function(i, item){
		$(master_class + item + photos).animate({left:"-340px"}, timer, "linear", function(){
			if(counter == 0){
				temp_html = $(master_class + item + photo).first().html();
				$(master_class + item + photo).first().remove();
				$(master_class + item + photo_list).append("<li>" + temp_html + "</li>");			
				$(master_class + item + photos).css({left:"0px"});
				setTimeout("ns.animatePieces()", timer_change);
			}
			counter++;
		});
	});
}