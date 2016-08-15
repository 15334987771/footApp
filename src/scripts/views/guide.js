
require("../lib/swiper-3.3.1.min.js");
var guideTpl=require("../template/guide.string");

SPA.defineView('guide',{
	html:guideTpl,
	plugins: ['delegated'],
	bindActions:{
		'go.index':function () {
      		SPA.open('index');
    	}
	},
	bindEvents:{
		beforeShow:function () {
			var mySwiper=new Swiper("#guide-swiper");	
		}
	}
})