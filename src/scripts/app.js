// var index=require("./template/index");
// var sript=document.body.innerHTML
// document.body.innerHTML=index+sript;
//引入SPA类库
require("./lib/spa.min");


//引入视图文件
require("./views/guide.js");

require("./views/index.js");
require("./views/home.js");
require("./views/my.js");
require("./views/search.js");
require("./views/register.js");
require("./views/detail.js");

//配置SPA
SPA.config({
	//定义默认视图
	indexView:'guide'
});


