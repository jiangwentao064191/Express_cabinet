
// // 定义全局变量  箱子类型对应的名称
// var xBox = "标准箱";
// var xLBox = "超大箱";
// var xSBox = "超小箱";
// var xxLBox = "巨大箱";

// /*
//  *  xy API
//  */
// function xy() {
//     this.data = {
//         requestData:{
//             url:'',
//             defaultRequestType:'POST',
//             async:true,
//             dataType:'json',
//             data:{}
//         },
//         circleData:{
//             timer:'',
//             circleCtx:null
//         }
//     }
// }

// /*
//  *  request() API 网络请求
//  *  obj{
//  *      type
//  *      url
//  *      data
//  *      async
//  *      dataType
//  *      success
//  *      fail
//  *      complete
//  *  }
//  */
// xy.prototype.request = function (obj) {
//     var that = this;
//     $.ajax({
//         type: obj.type || that.data.requestData.defaultRequestType,
//         url: obj.url || that.data.requestData.url,
//         data: obj.data || that.data.requestData.data,
//         async: obj.async || that.data.requestData.async,
//         dataType: obj.dataType || that.data.requestData.dataType,
//         beforeSend: function(){

//         },
//         success: function(res) {
//             if (obj.success){obj.success(res)}
//         },
//         complete: function(res){
//             if (obj.complete) {obj.complete(res)}
//         },
//         error: function(XMLHttpRequest, textStatus, errorThrown) {
//             if (obj.fail) {obj.fail(XMLHttpRequest,textStatus,errorThrown)}
//         }
//     })
// };
// /*
//  *  showLoading() 转圈圈
//  *  obj{
//  *      size: 'lg/md' 默认小号
//  *  }
//  */
// xy.prototype.showLoading = function (obj) {
//     var that = this;
//     var str1 = '<canvas id="circle-box"></canvas>';
//     var str2 = '<canvas id="bg-box"></canvas>';
//     var zgc = '<div id="zgc"></div>';
//     $('body').append(str1,str2);
//     if(obj.mask){
//         $('body').append(zgc);
//         var zgc = document.getElementById('zgc');
//         zgc.style.width = '100%';
//         zgc.style.height = '100%';
//         zgc.style.background = 'rgba(0,0,0,0.3)';
//         zgc.style.position = 'fixed';
//         zgc.style.left = 0;
//         zgc.style.top = 0;
//         zgc.style.zIndex = 7;
//     }
//     var bg = document.getElementById('bg-box');
//     var circle = document.getElementById('circle-box');
//     function dealCss(w,h) {
//         bg.width = w;
//         bg.height = h; // 不能设置css属性 会拉伸
//         bg.style.position = 'fixed';
//         bg.style.left = 'calc(50% - '+ w/2 +'px)';
//         bg.style.top = 'calc(50% - '+ h/2 +'px)';
//         bg.style.zIndex = 8;

//         circle.width = w;
//         circle.height = h; // 不能设置css属性 会拉伸
//         circle.style.position = 'fixed';
//         circle.style.left = 'calc(50% - '+ w/2 +'px)';
//         circle.style.top = 'calc(50% - '+ h/2 +'px)';
//         circle.style.zIndex = 9;
//     }
//     if(obj.size){
//         switch (obj.size){
//             case "lg":
//                 var w = 200;
//                 if(obj.title){
//                     var h = 210;
//                 }else{
//                     var h = 200;
//                 }
//                 dealCss(w,h);
//                 this.drawRectangle(obj,0,0,7,w,h);
//                 break;
//             case "md":
//                 var w = 150;
//                 if(obj.title){
//                     var h = 160;
//                 }else{
//                     var h = 150;
//                 }
//                 dealCss(w,h);
//                 this.drawRectangle(obj,0,0,7,w,h);
//                 break;
//             default:
//                 var w = 100;
//                 if(obj.title){
//                     var h = 110;
//                 }else{
//                     var h = 100;
//                 }
//                 dealCss(w,h);
//                 this.drawRectangle(obj,0,0,7,w,h);
//                 break;
//         }
//     }else{
//         var w = 100;
//         if(obj.title){
//             var h = 110;
//         }else{
//             var h = 100;
//         }
//         dealCss(w,h);
//         this.drawRectangle(obj,0,0,7,w,h);
//     }

//     // 赋值到全局
//     var canvas = document.getElementById('circle-box');
//     var ctx = canvas.getContext('2d');
//     this.data.circleData.circleCtx = ctx;

//     for(var i=0;i<12;i++){
//         var opcityColorA = (i+1)/10;
//         var color = 'rgba(255,255,255,'+ opcityColorA +')';
//         that.drawCircle(obj,Math.PI/6*i,Math.PI/6*i + Math.PI/20,color);
//     }
//     var num = 0;
//     this.data.circleData.timer = setInterval(function () {
//         ctx.clearRect(0,0,200,200);
//         num++;
//         for(var j=0;j<12;j++){
//             var opcityColorB = (j+1)/10;
//             var color = 'rgba(255,255,255,'+ opcityColorB +')';
//             that.drawCircle(obj,Math.PI/6*j + num*Math.PI/6,Math.PI/6*j + Math.PI/20 + num*Math.PI/6,color);
//         }
//     },100)
// };
// xy.prototype.drawCircle = function (obj,startAngle,endAngle,color) {
//     var ctx = this.data.circleData.circleCtx;
//     ctx.strokeStyle = color; // 设置圆环色
//     ctx.lineCap = 'butt'; // 设置端点样式
//     ctx.beginPath(); // 开始创建一个路径，需要调用fill或者stroke才会使用路径进行填充或描边。
//     if(obj.size){
//         switch (obj.size){
//             case "lg":
//                 ctx.lineWidth = 20; // 设置线条宽度
//                 ctx.arc(100, 100, 30, startAngle, endAngle, false);
//                 break;
//             case "md":
//                 ctx.lineWidth = 15; // 设置线条宽度
//                 ctx.arc(75, 75, 22.5, startAngle, endAngle, false);
//                 break;
//             default:
//                 ctx.lineWidth = 10; // 设置线条宽度
//                 ctx.arc(50, 50, 15, startAngle, endAngle, false);
//                 break;
//         }
//     }else{
//         ctx.lineWidth = 10; // 设置线条宽度
//         ctx.arc(50, 50, 15, startAngle, endAngle, false);
//     }
//     ctx.stroke(); // 画出当前路径的边框。默认颜色色为黑色。
// };
// xy.prototype.drawRectangle = function (obj,x,y,r,w,h){
//     var canvas = document.getElementById('bg-box');
//     var ctx = canvas.getContext('2d');
//     ctx.beginPath();
//     ctx.strokeStyle = 'rgba(0,0,0,0.5)';
//     ctx.moveTo(x+r,y);
//     ctx.lineTo(w-r,y);
//     ctx.arcTo(x+w,y,x+w,y+r,r);
//     ctx.lineTo(x+w,y+h-r);
//     ctx.arcTo(x+w,y+h,x+w-r,y+h,r);
//     ctx.lineTo(x+r,y+h);
//     ctx.arcTo(x,y+h,x,y+h-r,r);
//     ctx.lineTo(x,y+r);
//     ctx.arcTo(x,y,x+r,y,r);
//     ctx.fillStyle="rgba(0,0,0,0.5)"; // 填充色
//     ctx.fill(); // 填充
//     if(obj.title){
//         ctx.fillStyle = '#ffffff';
//         switch (obj.size){
//             case 'lg':
//                 ctx.font="18px normal";
//                 ctx.fillText(obj.title,w/2-26,173);
//                 break;
//             case 'md':
//                 ctx.font="16px normal";
//                 ctx.fillText(obj.title,w/2-24,133);
//                 break;
//             default:
//                 ctx.font="14px normal";
//                 ctx.fillText(obj.title,w/2-22,93);
//                 break;
//         }
//     }
// };
// xy.prototype.hideLoading = function () {
//     var el1 = document.getElementById('bg-box');
//     var el2 = document.getElementById('circle-box');
//     var body = document.body;
//     body.removeChild(el1);
//     body.removeChild(el2);
//     try {
//         var el3 = document.getElementById('zgc');
//         body.removeChild(el3);
//     }catch(err){

//     }
//     clearInterval(this.data.circleData.timer);
// };
// var xy = new xy();
// xy.showLoading({
//     title:'请稍候...', // 标题 默认无标题
//     // mask:true, // true = 显示遮罩层，false = 不显示 默认 false
//     size:'' // lg = 大，md = 中，默认小
//     // xy.hideLoading() 关闭转圈圈
// });
// xy.hideLoading()


// //显示Loading
// (function($){
// 	$.fn.loading = function(options){
// 		var $this = $(this);
// 		var _this = this;
// 		return this.each(function(){
// 		    var loadingPosition ='';
// 		    var defaultProp = {
// 		    	direction: 				'column',												//方向，column纵向   row 横向
// 				animateIn: 	 			'fadeInNoTransform',    								//进入类型
// 				title:                  '',      										//显示什么内容
// 				name: 					'loadingName', 											//loading的data-name的属性值  用于删除loading需要的参数
// 				type: 			        'origin', 			  									//pic   origin  
// 				discription: 			'这是一个描述', 										//loading的描述
// 				titleColor: 			'rgba(255,255,255,0.7)',								//title文本颜色
// 				discColor: 				'white',								//disc文本颜色
// 				loadingWidth:           260,                									//中间的背景宽度width
// 				loadingBg:        		'rgba(0, 0, 0, 0.6)',  									//中间的背景色
// 				borderRadius:     		12,                 									//中间的背景色的borderRadius
// 				loadingMaskBg:    		'rgba(0,0,0,0.2)',          								//背景遮罩层颜色
// 				zIndex:           		1000001,              									//层级

// 				// 这是圆形旋转的loading样式  
// 				originDivWidth:        	40,           											//loadingDiv的width
// 				originDivHeight:       	40,           											//loadingDiv的Height

// 				originWidth:      		6,                  									//小圆点width
// 				originHeight:     		6,                  									//小圆点Height
// 				originBg:         		'#fefefe',              								//小圆点背景色
// 				smallLoading:     		false,                  								//显示小的loading

// 				// 这是图片的样式   (pic)
// 				imgSrc: 				'http://www.daiwei.org/index/images/logo/dw.png',    	//默认的图片地址
// 				imgDivWidth: 			80,           											//imgDiv的width
// 				imgDivHeight: 			80,           											//imgDiv的Height

// 				flexCenter: 	 		false, 													//是否用flex布局让loading-div垂直水平居中
// 				flexDirection: 			'row',													//row column  flex的方向   横向 和 纵向				
// 				mustRelative: 			false, 													//$this是否规定relative
// 		    };


// 		    var opt = $.extend(defaultProp,options || {});

// 		    //根据用户是针对body还是元素  设置对应的定位方式
// 		    if($this.selector == 'body'){
// 		    	$('body,html').css({
// 		    		//overflow:'hidden',
// 		    	});
// 		    	loadingPosition = 'fixed';
// 		    }else if(opt.mustRelative){
// 		    	$this.css({
// 			    	position:'relative',
// 			    });
// 			    loadingPosition = 'absolute';
// 		    }else{
// 		    	loadingPosition = 'absolute';
// 		    }

// 		    defaultProp._showOriginLoading = function(){
// 		    	var smallLoadingMargin = opt.smallLoading ? 0 : '-10px';
// 		    	if(opt.direction == 'row'){smallLoadingMargin='-6px'}

// 		    	//悬浮层
// 		      	_this.cpt_loading_mask = $('<div class="cpt-loading-mask animated '+opt.animateIn+' '+opt.direction+'" data-name="'+opt.name+'"></div>').css({
// 			        'background':opt.loadingMaskBg,
// 			        'z-index':opt.zIndex,
// 			        'position':loadingPosition,
// 				}).appendTo($this);

// 		      	//中间的显示层
// 				_this.div_loading = $('<div class="div-loading"></div>').css({
// 			        'background':opt.loadingBg,
// 			        'width':"2.5rem",
// 			        'height':opt.loadingHeight,
// 			        '-webkit-border-radius':opt.borderRadius,
// 			        '-moz-border-radius':opt.borderRadius,
// 			        'border-radius':opt.borderRadius,
// 		      	}).appendTo(_this.cpt_loading_mask);

// 				if(opt.flexCenter){
// 					_this.div_loading.css({
// 						"display": "-webkit-flex",
// 						"display": "flex",
// 						"-webkit-flex-direction":opt.flexDirection,
// 						"flex-direction":opt.flexDirection,
// 						"-webkit-align-items": "center",
// 						"align-items": "center",
// 						"-webkit-justify-content": "center",
// 						"justify-content":"center",
// 					});
// 				}

// 				//loading标题
// 	        	_this.loading_title = $('<p class="loading-title txt-textOneRow"></p>').css({
// 	        		color:opt.titleColor,
// 	        	}).html(opt.title).appendTo(_this.div_loading);

// 	        	//loading中间的内容  可以是图片或者转动的小圆球
// 		     	_this.loading = $('<div class="loading '+opt.type+'"></div>').css({
// 			        'width':opt.originDivWidth,
// 			        'height':opt.originDivHeight,
// 		      	}).appendTo(_this.div_loading);

// 		     	//描述
// 	        	_this.loading_discription = $('<p class="loading-discription txt-textOneRow"></p>').css({
// 	        		color:opt.discColor,
// 	        	}).html(opt.discription).appendTo(_this.div_loading);

// 	        	if(opt.type == 'origin'){
// 	        		_this.loadingOrigin = $('<div class="div-loadingOrigin"><span></span></div><div class="div-loadingOrigin"><span></span></div><div class="div_loadingOrigin"><span></span></div><div class="div_loadingOrigin"><span></span></div><div class="div_loadingOrigin"><span></span></div>').appendTo(_this.loading);
// 			      	_this.loadingOrigin.children().css({
// 				        "margin-top":smallLoadingMargin,
// 				        "margin-left":smallLoadingMargin,
// 				        "width":opt.originWidth,
// 				        "height":opt.originHeight,
// 				        "background":opt.originBg,
// 			      	});
// 	        	}	

// 	        	if(opt.type == 'pic'){
// 	        		_this.loadingPic = $('<img src="'+opt.imgSrc+'" alt="loading" />').appendTo(_this.loading);
// 	        	}	      


// 		      	//关闭事件冒泡  和默认的事件
// 			    _this.cpt_loading_mask.on('touchstart touchend touchmove click',function(e){
// 					e.stopPropagation();
// 					e.preventDefault();
// 			    });
// 		    };
// 		    defaultProp._createLoading = function(){
// 		    	//不能生成两个loading data-name 一样的loading
// 		    	if($(".cpt-loading-mask[data-name="+opt.name+"]").length > 0){
// 		    		// console.error('loading mask cant has same date-name('+opt.name+'), you cant set "date-name" prop when you create it');
// 		    		return
// 		    	}
				
// 				defaultProp._showOriginLoading();
// 		    };
// 		    defaultProp._createLoading();
// 		});
// 	}

// })(jQuery)

// //关闭Loading
// function removeLoading(loadingName){
// 	var loadingName = loadingName || '';
// 	$('body,html').css({
// 		//overflow:'auto',
// 	});

// 	if(loadingName == ''){
// 		$(".cpt-loading-mask").remove();
// 	}else{
// 		var name = loadingName || 'loadingName';
// 		$(".cpt-loading-mask[data-name="+name+"]").remove();		
// 	}
// }
	
// 	function addClasses(dom, className) {
//         if (!dom) {
//             return;
//         }
//         var curClass = dom.className;
//         var classArr = curClass.split(" ");
//         for (var i = 0; i < classArr.length; i++) {
//             if (classArr[i] == className.trim()) {
//                 return;
//             }
//         }
//         dom.className = (curClass + " " + className.trim()).trim();
//     };
//     function removeClasses(dom, className) {
//         if (!dom) {
//             return;
//         }
//         var curClass = dom.className;
//         var classArr = curClass.split(" ");
//         for (var i = 0; i < classArr.length; i++) {
//             if (classArr[i] == className.trim()) {
//                 classArr.splice(i, 1);
//                 i--;
//             }
//         }
//         dom.className = classArr.join(" ");
//     };
//     function createElements(dom, type, className, str) {
//         var child = document.createElement(type);
//         dom.appendChild(child);
//         child.className = className;
//         if (str) {
//             child.innerHTML = str;
//         }
//         return child;
//     };
//     function isSupportTouchs() {
//         return "ontouchend" in document ? true : false;
//     };
//     //绑定监听事件
//     function addEventHandlers(target, type, fn) {
//         if (target.addEventListener) {
//             target.addEventListener(type, fn);
//         } else {
//             target.attachEvent("on" + type, fn);
//         }
//     };

//     //移除监听事件
//     function removeEventHandlers(target, type, fn) {
//         if (target.removeEventListener) {
//             target.removeEventListener(type, fn);
//         } else {
//             target.detachEvent("on" + type, fn);
//         }
//     };
//     function HTMLEncodes(html) {//转码html
//         var temp = document.createElement("div");
//         (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
//         var output = temp.innerHTML;
//         temp = null;
//         return output;
//     };

//     function HTMLDecodes(text) {//解码html
//         var temp = document.createElement("div");
//         temp.innerHTML = text;
//         var output = temp.innerText || temp.textContent;
//         temp = null;
//         return output;
//     };
//     function formats(format, timeStamp) {//时间格式化函数
//         if(typeof timeStamp == "string"){
//             timeStamp = timeStamp.replace(/-/g,"/");
//         }
//         var date = new Date(timeStamp);
//         var dateStr = format;
//         if ((/yyyy/i).test(dateStr)) {
//             dateStr = dateStr.replace(/yyyy/ig, date.getFullYear());
//         } else if ((/yy/i).test(dateStr)) {
//             dateStr = dateStr.replace(/yy/ig, (date.getFullYear() % 100));
//         }
//         if ((/MM/).test(dateStr)) {
//             var mon = date.getMonth() + 1;
//             dateStr = dateStr.replace(/MM/g, (mon > 9 ? mon : "0" + mon));
//         } else if (/M/) {
//             dateStr = dateStr.replace(/M/g, (date.getMonth() + 1));
//         }
//         if ((/dd/i).test(dateStr)) {
//             var day = date.getDate();
//             dateStr = dateStr.replace(/dd/ig, (day > 9 ? day : "0" + day));
//         } else if ((/d/i).test(dateStr)) {
//             dateStr = dateStr.replace(/dd/ig, (date.getDate()));
//         }
//         if ((/hh/i).test(dateStr)) {
//             var h = date.getHours();
//             dateStr = dateStr.replace(/hh/ig, (h > 9 ? h : "0" + h));
//         } else if ((/h/i).test(dateStr)) {
//             dateStr = dateStr.replace(/h/ig, (date.getHours()));
//         }
//         if ((/mm/).test(dateStr)) {
//             var mm = date.getMinutes();
//             dateStr = dateStr.replace(/mm/g, (mm > 9 ? mm : "0" + mm));
//         } else if ((/m/).test(dateStr)) {
//             dateStr = dateStr.replace(/m/g, (date.getMinutes()));
//         }
//         if ((/ss/i).test(dateStr)) {
//             var ss = date.getSeconds();
//             dateStr = dateStr.replace(/ss/ig, (ss > 9 ? ss : "0" + ss));
//         } else if ((/s/i).test(dateStr)) {
//             dateStr = dateStr.replace(/s/ig, (date.getSeconds()));
//         }
//         return dateStr;
//     };
	
// 	//对话框
//     function dialogs(options) {
//         var obj = {};
//         obj.options = options;
//         obj.shadow = null;
//         obj.closeBtn = null;
//         obj.btn = null;
//         obj.create = function () {
//             obj.shadow = document.createElement("div");
//             obj.shadow.style.background = "rgba(0,0,0,0.5)";
//             obj.shadow.style.position = "fixed";
//             obj.shadow.style.display = "flex";
//             obj.shadow.style.justifyContent = "center";
//             obj.shadow.style.alignItems = "center";
//             obj.shadow.style.top = 0;
//             obj.shadow.style.left = 0;
//             obj.shadow.style.width = "100%";
//             obj.shadow.style.height = "100%";
//             obj.shadow.style.zIndex = 10000;
//             var body = document.getElementsByTagName("body")[0];
//             body.appendChild(obj.shadow);


//             var dialogBox = createElements(obj.shadow, "div", "dialogBox");
//             obj.closeBtn = createElements(dialogBox, "div", "closeBtn");
//             createElements(obj.closeBtn, "div", "" , "再想一下");
//             createElements(dialogBox, "div", "title", obj.options.title);
//             createElements(dialogBox, "div", "content", obj.options.content);
//             obj.btn = createElements(dialogBox, "div", options.btnClass, obj.options.btnContent);
//             if (obj.options.id) {
//                 obj.btn.setAttribute("data-id", obj.options.id);
//             }
//             if (isSupportTouchs()) {
//                 addEventHandlers(document, "touchmove", obj.defaultEvent);
//                 addEventHandlers(obj.closeBtn, "click", obj.destroy);
//                 addEventHandlers(obj.btn, "click", obj.options.fun);
//             } else {
//                 addEventHandlers(obj.closeBtn, "click", obj.destroy);
//                 addEventHandlers(obj.btn, "click", obj.options.fun);
//             }
//         };
//         obj.destroy = function (e) {
//             if (e) {
//                 e.stopPropagation();
//             }

//             setTimeout(function () {
//                 if (isSupportTouchs()) {
//                     removeEventHandlers(document, "touchmove", obj.defaultEvent);
//                     removeEventHandlers(obj.closeBtn, "click", obj.destroy);
//                     removeEventHandlers(obj.btn, "click", obj.options.fun);
//                 } else {
//                     removeEventHandlers(obj.closeBtn, "click", obj.destroy);
//                     removeEventHandlers(obj.btn, "click", obj.options.fun);
//                 }
//                 while (obj.shadow.hasChildNodes()) {
//                     obj.shadow.removeChild(obj.shadow.firstChild);
//                 }
//                 var body = document.getElementsByTagName("body")[0];
//                 body.removeChild(obj.shadow);
//                 obj.btn = null;
//                 obj = null;
//             }, 100);
//         };
//         obj.defaultEvent = function (e) {
//             e.preventDefault();
//         };
//         return obj;
//     };
    
//     function dialogTips(options) {
//         var obj = {};
//         obj.options = options;
//         obj.shadow = null;
//         obj.closeBtn = null;
//         obj.btn = null;
//         obj.create = function () {
//             obj.shadow = document.createElement("div");
//             obj.shadow.style.background = "rgba(0,0,0,0.5)";
//             obj.shadow.style.position = "fixed";
//             obj.shadow.style.display = "flex";
//             obj.shadow.style.justifyContent = "center";
//             obj.shadow.style.alignItems = "center";
//             obj.shadow.style.top = 0;
//             obj.shadow.style.left = 0;
//             obj.shadow.style.width = "100%";
//             obj.shadow.style.height = "100%";
//             obj.shadow.style.zIndex = 10000;
//             var body = document.getElementsByTagName("body")[0];
//             body.appendChild(obj.shadow);


//             var dialogBox = createElements(obj.shadow, "div", "dialogBox");
//             obj.closeBtn = createElements(dialogBox, "div", "closeBtn1");
//             createElements(obj.closeBtn, "div", "" , "好的");
//             createElements(dialogBox, "div", "title", obj.options.title);
//             createElements(dialogBox, "div", "content", obj.options.content);
//             obj.btn = createElements(dialogBox, "div", options.btnClass, obj.options.btnContent);
//             if (obj.options.id) {
//                 obj.btn.setAttribute("data-id", obj.options.id);
//             }
//             if (isSupportTouchs()) {
//                 addEventHandlers(document, "touchmove", obj.defaultEvent);
//                 addEventHandlers(obj.closeBtn, "click", obj.destroy);
//                 addEventHandlers(obj.btn, "click", obj.options.fun);
//             } else {
//                 addEventHandlers(obj.closeBtn, "click", obj.destroy);
//                 addEventHandlers(obj.btn, "click", obj.options.fun);
//             }
//         };
//         obj.destroy = function (e) {
//             if (e) {
//                 e.stopPropagation();
//             }

//             setTimeout(function () {
//                 if (isSupportTouchs()) {
//                     removeEventHandlers(document, "touchmove", obj.defaultEvent);
//                     removeEventHandlers(obj.closeBtn, "click", obj.destroy);
//                     removeEventHandlers(obj.btn, "click", obj.options.fun);
//                 } else {
//                     removeEventHandlers(obj.closeBtn, "click", obj.destroy);
//                     removeEventHandlers(obj.btn, "click", obj.options.fun);
//                 }
//                 while (obj.shadow.hasChildNodes()) {
//                     obj.shadow.removeChild(obj.shadow.firstChild);
//                 }
//                 var body = document.getElementsByTagName("body")[0];
//                 body.removeChild(obj.shadow);
//                 obj.btn = null;
//                 obj = null;
//             }, 100);
//         };
//         obj.defaultEvent = function (e) {
//             e.preventDefault();
//         };
//         return obj;
//     };
    
//     function dialogdelays(options) {
//         var obj = {};
//         obj.options = options;
//         obj.shadow = null;
//         obj.closeBtn = null;
//         obj.btn = null;
//         obj.create = function () {
//             obj.shadow = document.createElement("div");
//             obj.shadow.style.background = "rgba(0,0,0,0.5)";
//             obj.shadow.style.position = "fixed";
//             obj.shadow.style.display = "flex";
//             obj.shadow.style.justifyContent = "center";
//             obj.shadow.style.alignItems = "center";
//             obj.shadow.style.top = 0;
//             obj.shadow.style.left = 0;
//             obj.shadow.style.width = "100%";
//             obj.shadow.style.height = "100%";
//             obj.shadow.style.zIndex = 10000;
//             var body = document.getElementsByTagName("body")[0];
//             body.appendChild(obj.shadow);


//             var dialogBox = createElements(obj.shadow, "div", "dialogBox");
//             obj.closeBtn = createElements(dialogBox, "div", "closeBtn");
//             createElements(obj.closeBtn, "div", "" , "取消");
//             createElements(dialogBox, "div", "title", obj.options.title);
//             createElements(dialogBox, "div", "content", obj.options.content);
//             obj.btn = createElements(dialogBox, "div", options.btnClass, obj.options.btnContent);
//             if (obj.options.id) {
//                 obj.btn.setAttribute("data-id", obj.options.id);
//             }
//             if (isSupportTouchs()) {
//                 addEventHandlers(document, "touchmove", obj.defaultEvent);
//                 addEventHandlers(obj.closeBtn, "click", obj.destroy);
//                 addEventHandlers(obj.btn, "click", obj.options.fun);
//             } else {
//                 addEventHandlers(obj.closeBtn, "click", obj.destroy);
//                 addEventHandlers(obj.btn, "click", obj.options.fun);
//             }
//         };
//         obj.destroy = function (e) {
//             if (e) {
//                 e.stopPropagation();
//             }

//             setTimeout(function () {
//                 if (isSupportTouchs()) {
//                     removeEventHandlers(document, "touchmove", obj.defaultEvent);
//                     removeEventHandlers(obj.closeBtn, "click", obj.destroy);
//                     removeEventHandlers(obj.btn, "click", obj.options.fun);
//                 } else {
//                     removeEventHandlers(obj.closeBtn, "click", obj.destroy);
//                     removeEventHandlers(obj.btn, "click", obj.options.fun);
//                 }
//                 while (obj.shadow.hasChildNodes()) {
//                     obj.shadow.removeChild(obj.shadow.firstChild);
//                 }
//                 var body = document.getElementsByTagName("body")[0];
//                 body.removeChild(obj.shadow);
//                 obj.btn = null;
//                 obj = null;
//             }, 100);
//         };
//         obj.defaultEvent = function (e) {
//             e.preventDefault();
//         };
//         return obj;
//     };
    
    
//     function isPhones(str){//验证手机号
//         //var reg = /^1[34578]\d{9}$/;
//         var reg = /^\d{11}$/;
//         return reg.test(str);
//     };
//     function noEmoji(str){//验证手机号
//         //var reg = /^1[34578]\d{9}$/;
//         var reg = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
//         return reg.test(str);
//     };
//     function isTels(str){//验证电话号
//         var reg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
//         return reg.test(str);
//     };
//     function isMails(str){//验证邮箱
//         var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
//         return reg.test(str);
//     };
//     function isIDCards(str){//身份证号验证
//         var reg = /(^(1[1-5]|2[1-3]|3[1-7]|4[1-6]|5[0-4]|6[1-5]|71|8[1-8])\d{4}(19|20)\d{9}([0-9]|X)$)/;
//         return reg.test(str);
//     };
//     function isValidateCodes(str) {//验证码验证
//         var reg = /\d{6}/;
//         return reg.test(str);
//     };
//     function isPasswords(str){
//         var reg = /^([a-zA-Z0-9_-]|[@\*&#\$\^\%\(\)!\.<>)]){6,20}/;
//         return reg.test(str);
//     };
//     function isScanCodes(str){
//         var reg = /^\d{12}/;
//         return reg.test(str);
//     };
//     function getQueryStrings(name) {
//         var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
//         var r = window.location.search.substr(1).match(reg);
//         if (r != null)
//             return unescape(r[2]);
//         return null;
//     };
//     function isSearchCodes(str) {//搜索的验证，四个以上的数字
//         var reg = /\d{4,11}/;
//         return reg.test(str);
//     };
    
//     function getjson(list) {
// 		var obj = {};
// 		var arr = [];
// 		for(var i = 0; i < list.length; i++) {
// 			if(obj[list[i].pickCode]) {
// 				obj[list[i].pickCode].boxNumber += "," + list[i].boxNumber;
// 				obj[list[i].pickCode].recordId += "," + list[i].recordId;
// 			} else {
// 				obj[list[i].pickCode] = list[i]
// 			}
// 		}
// 		for(var i in obj) {
// 			arr.push(obj[i])
// 		}
// 		return arr;
// 	}
    
//     function getstr(list) {
// 		var list1 = list.substr(0, list.length - 1);
// 		var list2 = list1.substring(1);
// 		var arrs = list2.split(",");
// 		var string1;
// 		var string2 = "";
// 		for(var i = 0; i < arrs.length; i++) {
// 			var arres = arrs[i] > 9 ? arrs[i] : "0" + arrs[i];
// 			string1 = arres + "号 ";
// 			string2 += string1;
// 		}
// 		var string3 = string2.substr(0, string2.length - 1);
// 		return string3;
// 	}
    
//     function addes(str) {
// 		var arr = str.split('');
// 		arr.splice(48, 2 , "es");
		
// 		return arr.join('');
// 	}
	
// 	function addun(str) {
// 		var arr = str.split('');
// 		arr.splice(48, 2 , "un");
		
// 		return arr.join('');
// 	}
	
// 	function isContains(arr, obj) {  
//     var i = arr.length;  
//     while (i--) {  
//         if (arr[i] == obj) {  
//             return true;  
//         }  
//     }  
//     return false;  
// 	}  
	
	
// 	function fenToyuan(fen){
// 		var yuan=fen/100.0;
// 		return yuan.toFixed(2);
// 	}
	
// 	function strToArr(str){
// 		return str.split("*");
// 	}
	
// 	function fenStampTime(StatusMinute){     
// 	    var day=parseInt(StatusMinute/60/24);  
// 	    var hour=parseInt(StatusMinute/60%24);  
// 	    var min= parseInt(StatusMinute % 60);  
// 	    StatusMinute="";  
// 	    if (day > 0)  
// 	    {  
// 	        StatusMinute= day + "天";  
// 	    }   
// 	    if (hour>0)  
// 	    {  
// 	        StatusMinute += hour + "小时";  
// 	    }   
// 	    if (min>0)  
// 	    {  
// 	        StatusMinute += parseFloat(min) + "分钟";  
// 	    }  
// 	        return StatusMinute;  
// 	}
	
// 	function getPhoneNum(text) {
// 		var value = text.replace(/[^0-9]/ig, "");
// 		return value;
// 	}
	
// 	// 是否有权限
// 	function isTrue (str, lists) {
// 		var result;
// 		for(var i = 0; i < lists.length; i++) {
// 			if(lists[i].permissionType == str) {
// 				result = true;
// 				break;
// 			} else {
// 				result = false;
// 			}
// 		}
		
// 		return result;
// 	}
