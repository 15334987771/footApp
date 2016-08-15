
var myTpl=require("../template/my.string");
SPA.defineView('my',{
	html:myTpl,
	styles: {
	    'background-color': 'transparent',
	    'border-radius': '.2rem',
  	},
	plugins:["delegated"],
	bindEvents:{
		show:function  () {
			
		}
	},
	bindActions:{
		'tap.register':function () {
			SPA.show('register',{
				ani:{
					name:"actionSheet",
					distance:175
				}
			})
		},
		'tap.close': function () {
     		 this.hide();
    	},
    	'tap.submit':function () {
    		console.log()
    	}
	}
})