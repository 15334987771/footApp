var searchTpl=require("../template/search.string");

SPA.defineView('search',{
	html:searchTpl,
	plugins:["delegated"],
	bindEvents:{
		show:function  () {
			var fxScroll=this.widgets.fxScroll;
			fxScroll.on("scroll",function  () {
				if(this.y<-200){
					if($(".m-search").next($(".m-search-fixed")).length>0 ){
						;
					}else{
						
						$(".m-search").after( $(".m-search-fixed").clone().addClass('fixed') );
					}				
				}else{

					$(".m-search").siblings($(".m-search-fixed.fixed").remove());
				}
			})
		}
	}
})