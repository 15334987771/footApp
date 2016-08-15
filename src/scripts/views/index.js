//引入模板
var indexTpl=require("../template/index.string");

//引入util
var util = require("../util/util.js");

//定义视图
SPA.defineView("index",{
	//装载html
	html:indexTpl,
	//引入delegated插件，用于绑定tap事件
	plugins:["delegated"],
	//定义子视图
	modules:[{
		name:'content',     //视图名称
		defaultTag:'home',  //默认视图  
		views:['home','search','my'],    
		container:'.m-index'     //子视图渲染到主视图时的容器

	}],
	bindEvents:{
		//视图显示之前
		show:function(){

		}
	},
	//
	bindActions:{
		'switch.tabs':function (e,data) {
			//高亮显示
			util.setFocus($(e.el))
			this.modules.content.launch(data.tag)
		},
		'switch.back':function() {
			this.hide()
		},
		'goto.dialog':function() {
			SPA.open('my',{
				ani:{
					name:"dialog",
					width:280,
					height:200
				}
			})
		}
	}

});
/*function select(start,end){
var o=end-start+1;
return  Math.floor(Math.random()*o+start)};
var arr=[];
for(var i=0;i<10;i++){
arr.push(select(1,10));
}
alert(arr);*/
// var str = "clouccdchen";
// var find = "c";
// var reg = new RegExp(find,"g")
// var c = str.match(reg);
// alert(c.length);



