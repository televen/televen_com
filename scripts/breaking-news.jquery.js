function BreakingNews(){}
BreakingNews.prototype.timer 			= 10000;
BreakingNews.prototype.timer_init 		= 3000;
BreakingNews.prototype.greater 			= 0;
BreakingNews.prototype.length 			= 0;
BreakingNews.prototype.round 			= false;
BreakingNews.prototype.masterClass 		= ".breaking-news";
BreakingNews.prototype.news 			= ".news ul li";
BreakingNews.prototype.list 			= ".news ul";
BreakingNews.prototype.overflowedItem 	= ".news";

BreakingNews.prototype.init = function(){
	var counter = 0;
	var greater = 0;
	$.each($(this.masterClass + " " + this.news), function(i, item){
		counter = counter + $(item).width();
		greater = ($(item).width() > greater) ? $(item).width() : greater;
	});
	this.length = counter + 200; 
	this.greater = greater;
	$(this.overflowedItem).width(this.length + " px");
	setTimeout("br.animate()", this.timer_init);
}

BreakingNews.prototype.animate = function(){
	var length = $(this.news).first().width();
	var temp_html = ""; 
	var news = this.news;
	var list = this.list;
	var overflowed = this.overflowedItem;
	var counter = 0;
	$(this.overflowedItem).animate({left:"-" + length}, this.getGreater(length), "linear", function(){
		if(counter == 0){
			temp_html = $(news).first().html();
			$(news).first().remove();
			$(list).append("<li>" + temp_html + "</li>");
			$(overflowed).css({left:"0px"});
			br.animate();
		}
		counter++;
	});
}

BreakingNews.prototype.getGreater = function(x){
	return (x*this.timer) / this.greater;
}