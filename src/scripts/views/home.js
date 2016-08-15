
var homeTpl=require("../template/home.string");
var util = require("../util/util.js");
//定义视图
SPA.defineView('home',{
	//装载html
	html:homeTpl,
	//引入delegated插件，用于绑定tap事件
	plugins:["delegated",{
		name:'avalon',
		options:function (vm) {
			vm.livelist=[]

		}
	}],
	//初始化
	init:{
		mySwiper:null,
		homeSlider:null,
       	hotSlider:null,
       	livelistArr:[],
		formatData:function (data) {
			var tempArr = [];
			for(var i=0,len=Math.ceil(data.length/2);i<len;i++){
				tempArr[i]=[];
				tempArr[i].push(data[i*2]);
				tempArr[i].push(data[i*2+1])

			}
			return tempArr;
		}
	},
	//绑定视图事件
	bindEvents:{
		beforeShow:function() {
		
			var that=this;
			//在视图里创建vm对象
			var vm=this.getVM();

			this.mySwiper=new Swiper("#guide-swiper1",{
				onSlideChangeStart:function (Swiper) {

					//页面切换结束，执行的代码，swiper是一个数组，swiper.activeIndex是每个页面的索引
					var index=Swiper.activeIndex;
					//当前的高亮显示
					util.setFocus($("#nav").find("li").eq(index)); 
				}
			});
			//title的切换
			this.mySwiper1=new Swiper("#guide-swiper2");
			$.ajax({
				url:"./mock/livelist.json",
				dataType:"json",
				success:function  (rs) {					
					vm.livelist=that.formatData(rs.data)
				},
				error:function  () {
					console.log('服务器出错,请重试')
				}
			});
		},
		show:function(){
		      var that=this;
		      var vm=this.getVM();
		      // 下拉刷新--上拉加载
		      var myScroll=this.widgets.homeListScroll;
		      console.log(myScroll)

		      var scrollSize = 30;
		      myScroll.scrollBy(0,-scrollSize);
		      var head=$(".head img"),
		          topImgHasClass=head.hasClass("up");
		      var foot=$(".foot img"),
		          bottomImgHasClass=head.hasClass("down");
		      myScroll.on("scroll",function(){
		        var y=this.y,
		            maxY=this.maxScrollY-y;
		            if(y>=0){
		                 !topImgHasClass && head.addClass("up");
		                 return "";
		            }
		            if(maxY>=0){
		                 !bottomImgHasClass && foot.addClass("down");
		                 return "";
		            }
		      })

		      myScroll.on("scrollEnd",function(){
		        if(this.y>=-scrollSize && this.y<0){
		              myScroll.scrollTo(0,-scrollSize);
		              head.removeClass("up");
		        }else if(this.y>=0){
		              head.attr("src","/app/images/ajax-loader.gif");
		            
		            setTimeout(function(){
		                  myScroll.scrollTo(0,-scrollSize);
		                head.removeClass("up");
		                head.attr("src","/app/images/arrow.png");
		            },1000)
		        }

		        var maxY=this.maxScrollY-this.y;
		        var self=this;
		        if(maxY>-scrollSize && maxY<0){
		              myScroll.scrollTo(0,self.maxScrollY+scrollSize);
		              foot.removeClass("down")
		        }else if(maxY>=0){
		            foot.attr("src","/app/images/ajax-loader.gif")
		              // 请求加载数据
		              $.ajax({
		                  url:"/app/mock/livelist.json",
		                  //url:"/api/getLivelist.php",
		                  type:"get",
		                  data:{
		                      rtype:"more"
		                  },
		                  success:function(rs){
		                 			
		                      that.livelistArr = that.livelistArr.concat(rs.data);
		                      
		                      vm.livelist = that.formatData(that.livelistArr);
		                      
		                      /*var newArr = that.livelistArr.concat(rs.data);
		                      that.vm.livedata = that.formatData(newArr);
		                      that.livelistArr = newArr;*/

		                      myScroll.refresh();
		                      myScroll.scrollTo(0,self.y+30);
		                      foot.removeClass("down");
		                      foot.attr("src","/app/images/arrow.png")
		                  }
		              })
		        }
		      })
		     var homeScroll=this.widgets.homeScroll;
		     homeScroll.options.scrollX=false;
		     homeScroll.options.scrollY=false;

		     var str = 'div-element';
		     var a=SPA.util.camelCase(str);//驼峰化
		     console.log(a)
		     var b=SPA.util.dasherize(a);//连接化
		     console.log(b)
		
		}


	},
	//绑定元素的tap事件
	bindActions:{
		//nav的tab切换
		'switch.ul':function(e){

			var _this=this
			util.setFocus($(e.el))
			$(e.el).on("click",function(){
				var index=$(this).index();
				_this.mySwiper.slideTo(index,1000,false)
			})
		},
		//title的tab切换
		'switch.title':function (e) {
			util.setFocus($(e.el));
			var index=$(e.el).index();
			this.mySwiper1.slideTo(index,1000,true)
		},
		'goto.detail':function () {
			
			SPA.open('detail')
		}
	}
})