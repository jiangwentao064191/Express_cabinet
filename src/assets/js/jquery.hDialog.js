/**
+-------------------------------------------------------------------
* jQuery hDialog - 多功能弹出层插件
+-------------------------------------------------------------------
* @version 2.0.1
* @update 2015.07.30
* @author haibao <hhb219@163.com> <http://www.hehaibao.com/>
+-------------------------------------------------------------------
*/
;(function($, window, document, undefined) {	
	var $D = $(document), $W = $(window), $B = $('body');
	var methods = {
        init: function (options) {
           	return this.each(function() {
				var T = $(this), _O = T.data('hDialog');
                if(typeof(_O) == 'undefined') {
	                	var defaults = {
	                		title: '',              	    //弹框标题
						box: '#HBox',               //弹框默认选择器
						boxBg: '#ffffff',           //弹框默认背景颜色
						modalBg: 'rgba(0,0,0,0.5)', //遮罩默认背景颜色
						closeBg: '#333',         //弹框关闭按钮默认背景颜色
						width: 300,                 //弹框默认宽度
						height: 270,                //弹框默认高度
						positions: 'center',        //弹框位置(默认center：居中，top：顶部居中，left：顶部居左，bottom：底部居右)
						effect: 'zoomOut',          //弹框关闭效果(结合animate.css里的动画，默认：zoomOut)
						hideTime: 0,				    //弹框定时关闭(默认0:不自动关闭，以毫秒为单位)
						resetForm: true,            //是否清空表单(默认true：清空，false：不清空)
						modalHide: true,            //是否点击遮罩背景关闭弹框(默认true：关闭，false：不可关闭)
						isOverlay: true,            //是否显示遮罩背景(默认true：显示，false：不显示)
	                		closeHide: true,            //是否隐藏关闭按钮(默认true：不隐藏，false：隐藏)
	                		escHide: true,              //是否支持ESC关闭弹框(默认true：关闭，false：不可关闭)
	                		autoShow: false,            //是否页面加载完成后自动弹出(默认false点击弹出，true：自动弹出)
	                		types: 1,                   //弹框类型(默认：1正常弹框，2：iframe框架)
	                		iframeSrc: '',              //弹框类型为iframe时使用的 链接地址
	                		iframeId: 'iframeHBox',     //弹框类型为iframe时使用的 ID
	                		beforeShow: function(){},   //显示前的回调方法
	                		afterHide: function(){}     //隐藏后的回调方法
	                	};
					_O = $.extend({}, defaults, options);
					T.data('hDialog', _O);
                }
                _O = $.extend({}, _O, options);
                
                if(_O.autoShow != false) {
                		methods.open(_O,T);
                }else{
                		T.on('click',function() { methods.open(_O,T); });
                }
			});
        },
        open: function (o,T) {
        		var w,h,t,l,m,$close, headTpl = closeBtnTpl = overlayTpl = iframeTpl = '', $obj = $(o.box), title = o.title, c = T.attr("class"), modalBg = o.modalBg, closeBg = o.closeBg;
			w = o.width != undefined ? parseInt(o.width) : 300, h = o.height != undefined ? parseInt(o.height) : 270, m = ""+parseInt(-(h/2))+'px 0 0 '+parseInt(-(w/2))+"px";
          	
        		//重置表单
			if(o.resetForm) {
           	 	$obj.find('input[type=text],input[type=tel],input[type=email],input[type=date],input[type=password],textarea').val('');
           	 	$obj.find('select option').removeAttr('selected');
            		$obj.find('input[type=radio],input[type=checkbox]').removeAttr('checked');
       		}
			
			//显示前的回调
			methods.fire.call(this, o.beforeShow); 
			
			//弹框位置
			switch (o.positions) {
				case 'top': 
					t = 0; l = '50%'; m = "0 0 0 "+parseInt(-(w/2))+"px";
				break;
				case 'left': 
					t = l = m = 0;
				case 'bottom':
					t = parseInt($W.height() - h)+'px';
					l = parseInt($W.width() - w)+'px';
					m = 0;
				break;
				default: 
					t = l = '50%';
			}
			
			//关闭按钮
			if(o.closeHide != false)var closeBtnTpl = '<a id="HCloseBtn" title="关闭" style="width:4.3rem;height:.8rem;line-height:.8rem;display:inline-block;cursor:pointer;background-color:'+closeBg+';color:#ffda00;border-radius:.4rem;font-size:.32rem;text-align:center;position:absolute;bottom:.5rem;right:.9rem;">我知道了</a>';

			//弹框标题
			if(o.title != '') headTpl = '<div id="HTitle" style="padding:10px 45px 10px 12px;border-bottom:1px solid #ddd;background-color:#f2f2f2;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">'+o.title+'</div>';
			
			//遮罩背景层
			if(o.isOverlay != false) var overlayTpl = "<div id='HOverlay' style='width:"+$D.width()+"px;height:"+$D.height()+"px;background-color:"+modalBg+";position:fixed;top:0;left:0;z-index:9999;'></div>";
       	 	
			//显示弹框
			if(o.types == 2){ var iframeTpl = '<iframe width="' + o.width + '" height="' + o.height + '" frameborder="0" scrolling="auto" src="' + o.iframeSrc + '"></iframe>'; $B.append('<div id="'+o.iframeId+'"></div>'); $obj = $('#'+o.iframeId); }
        		if(o.autoShow != false) $obj = T;
        		// 宽高  margin  都写死了 不能自动配置
        		$B.stop().append(overlayTpl).find($obj).css({'background-color':'rgba(255,255,255,1)','position':'fixed','top':t,'left':l,'z-index':999999,'margin':'-5rem 0rem 0rem -3rem','width':'6rem','height':'9rem'}).removeAttr('class').addClass('animated '+c).prepend(headTpl+closeBtnTpl+iframeTpl).show();
        
        		//默认关闭
        		$close = $('#HCloseBtn');
        		if(o.modalHide) $close = $('#HOverlay,#HCloseBtn');
			$close.on('click',function(){ methods.close(o,T); });
			
			//定时关闭
        		if(o.hideTime != 0) setTimeout(function(){ methods.close(o,T); }, parseInt(o.hideTime));
        		
			//支持ESC关闭
			if(o.escHide) $D.keyup(function(){ if(event.keyCode === 27) methods.close(o,T); });
			
			// 阻止滑动事件
			$("#HOverlay").on('touchmove',function(e){
                e.preventDefault();  //阻止默认行为
            })
                
            $("#HBox").on('touchmove',function(e){
                e.preventDefault();  //阻止默认行为
            })
        },
	    close: function (o,T) {
	    		var $obj = (o.autoShow != false) ? T : $(o.box);
	    		methods.remove('#HOverlay,#HCloseBtn,#HTitle,#'+o.iframeId);
	    		$obj.removeAttr('class').addClass('animated '+o.effect);
			if($obj.hasClass(o.effect)){ setTimeout(function(){ $obj.removeAttr('style').hide(); },0); }
			this.fire.call(this, o.afterHide); //隐藏后的回调
	    },
        remove: function (a) { $(a).remove(); },
	    fire: function (event, data) { if($.isFunction(event)) { return event.call(this, data); } },
	    destroy: function() { return $(this).each(function() { var $this = $(this); $this.removeData('hDialog'); }); }
    };
    
	$.fn.hDialog = function (method) {
		if(methods[method]) { return methods[method].apply(this, Array.prototype.slice.call(arguments, 1)); }
		else if(typeof method === 'object' || !method) {return methods.init.apply(this, arguments); }
		else{$.error('Error! Method' + method + 'does not exist on jQuery.hDialog！'); return this; }
	};
	
	/**
	+----------------------------------------------------------
	* 内置扩展
	+----------------------------------------------------------
	*/
	$.extend({  
		/**
		 * @decription 给方法添加加载方法
		 * @param t : string 提示文字
		 * @param w : string 提示框宽度
		 * @param h : string 提示框高度
		 */
	    showLoading: function (t, w, h) { //显示加载
	    		t = t != undefined ? t : '正在加载...'; w = w != undefined ? parseInt(w) : 140; 	h = h != undefined ? parseInt(h) : 48;
	    		var closeBtn = '<a style="position:absolute;top:-5px;right:-5px;width:15px;height:15px;line-height:15px;display:inline-block;border-radius:50%;text-align:center;background-color:rgba(0,0,0,0.5);color:#fff;font-size:10px;" href="javascript:;" id="closeBtn">X</a>', margin = ""+parseInt(-(h/2))+'px 0 0 '+parseInt(-(w/2))+"px";
	        methods.remove('#HLoading');
	        	$B.stop().append('<div id="HLoading" style="width:'+w+'px;height:'+h+'px;line-height:'+h+'px;border-radius:4px;background:rgba(0,0,0,0.6);color:#fff;text-align:center;position:fixed;top:50%;left:50%;margin:'+margin+';">'+t+closeBtn+'</div>');
	   		$('#closeBtn').on('click',function(){ $.hideLoading(); }); //关闭按钮点击事件
	    },
	    hideLoading: function () { //移除加载
        		methods.remove('#HLoading');
        },
        /**
		 * @decription 给方法添加提示方法
		 * @param t1 : string 提示文字
		 * @param t2 : int 提示时间
		 * @param t3 : boolean 提示类型，默认为false
		 * @param callback : 回调函数
		 */
        tooltip: function (t1, t2, t3, callback) {
        		t1 = t1 != undefined ? t1 : 'Error...'; 	t2 = t2 != undefined ? parseInt(t2) : 2500;
        		var tip = '<div class="HTooltip shake animated" style="font-size:.32rem;width:280px;padding:10px;text-align:center;background-color:#D84C31;color:#fff;position:fixed;top:10px;left:50%;z-index:100001;margin-left:-150px;box-shadow:1px 1px 5px #333;-webkit-box-shadow:1px 1px 5px #333;">'+t1+'</div>';
	    		if(t3 == true && t3 != undefined) { tip = '<div class="HTooltip bounceInDown animated" style="width:280px;padding:10px;text-align:center;background-color:#5cb85c;color:#fff;position:fixed;top:10px;left:50%;z-index:100001;margin-left:-150px;box-shadow:1px 1px 5px #333;-webkit-box-shadow:1px 1px 5px #333;">'+t1+'</div>'; }
	    		methods.remove('.HTooltip');
	    		$B.stop().append(tip);
	    		clearTimeout(t);
	    		var t = setTimeout(function() { 
	    			methods.remove('.HTooltip'); 
	    			if(callback != undefined){ methods.fire.call(this, callback); } //隐藏后的回调方法 
	    		},t2);
        },
        /**
		 * @decription 返回顶部
		 * @param b : string 和屏幕底部的距离
		 * @param r : string 和屏幕右侧的距离
		 */
        goTop: function (b, r) {
	        	b = b != undefined ? b : '60px'; r = r != undefined ? r : '20px';
	        	methods.remove('#HGoTop');
	        	$B.stop().append('<a id="HGoTop" href="javascript:;" style="font-size:.26rem;width:40px;height:40px;line-height:40px;border-radius:50%;display:inline-block;text-align:center;background:#333;opcity:.7;color:#fff;position:fixed;bottom:'+b+';right:'+r+';z-index:100000;">Top</a>').find('#HGoTop').hide();
	        	$T = $('#HGoTop');
	        	$W.on('scroll',function(){
	        		if($W.scrollTop() > 150){
					$T.removeAttr('class').addClass('animated fadeIn').show();
	        		}else{
					$T.removeAttr('class').addClass('animated fadeOut');
				}
	        	});
	        	$T.on('click',function(){ 
	        		$('body,html').animate({ scrollTop:0 },500); return false; //返回顶部按钮点击事件
	        	});
        },
        /**
		 * @decription 消息框
		 * @param type : string 消息框类型(alert/confirm)
		 * @param title : string 消息框标题
		 * @param content : string 消息框内容
		 * @param time : int 消息框自动关闭时间，以毫秒为单位(默认0：不自动关闭)
		 * @param callback : 回调函数
		 * class="animated fadeIn"   设置进入动画
		 * width:'+width+'px; 260  改为rem   
		 * style="width:'+width+'px;border-radius:5px;box-shadow:4px 4px 10px #666;-webkit-box-shadow:4px 4px 10px #666;background-color:#ffffff;border:1px solid #eee;position:fixed;top:35%;left:50%;margin:'+margin+';z-index:100000;">'
		 */  
        dialog: function (type, title, content, time, callback) {
        		var t, tpl = '', footerTpl = '', isLock = false, okText = '确定', cancelText = '取消', width = 6, margin = '0 0 0 '+parseInt(-(width/2))+'px', type = type != undefined ? type : 'alert', time = time != undefined ? parseInt(time) : 0,
        		headerTpl = '<div id="hDialog-header" style="border-bottom:1px solid #ddd;padding:.3rem;font-size:.36rem;color:#333;text-align:center;">' + title +'</div>',
    			okTpl = '<a href="javascript:;" style="display:inline-block;width:49%;height:1.09rem;line-height:1.09rem;text-align:center;font-size:.32rem;color:#333;" id="h_ok">'+ okText +'</a>',
    			cancelTpl = '<a href="javascript:;" style="display:inline-block;width:49%;height:1.09rem;line-height:1.09rem;text-align:center;border-right:1px solid #ddd;font-size:.32rem;color:#999;" id="h_cancel">'+ cancelText +'</a>',
    			contentTpl = '<div id="hDialog-content" style="padding:25px 15px;text-align:center;font-size:.28rem;">' + content + '</div>',
    			maskTpl = '<div id="hDialog-mask" style="width:100%;height:100%;background-color:rgba(0,0,0,0.6);position:fixed;top:0;left:0;z-index:99999;"></div>';  		
    			if(type === 'confirm'){ footerTpl = '<div id="hDialog-footer" style="border-top:1px solid #ddd;">'+ cancelTpl + okTpl +'</div>'; }
    			if(isLock != true) tpl += maskTpl;
    			tpl += '<div id="hDialog-wrap" class="animated" style="width:'+width+'rem;border-radius:5px;box-shadow:4px 4px 10px #666;-webkit-box-shadow:4px 4px 10px #666;overflow:hidden;background-color:#ffffff;border:1px solid #eee;position:fixed;top:35%;left:11%;margin:'+margin+';z-index:100000;">' + headerTpl + contentTpl + footerTpl + '</div>'; 
    			methods.remove('#hDialog-wrap,#hDialog-mask');
    			$B.stop().append(tpl);
    			if(time !== 0) { clearTimeout(t); t = setTimeout(function() { $.closeDialog(callback); },time); }
    			$('a:contains('+okText+')').on("click", function() { $.closeDialog(); if(callback != undefined){ methods.fire.call(this, callback); } });
            $('a:contains('+cancelText+')').on("click", function() { $.closeDialog(); });
        },
        // 只有两个按钮    左右按钮可以自定义事件  空箱按钮
        dialogDiy: function (type, title, content, time, left, right, callbacks, callback) {
        		var t, tpl = '', footerTpl = '', isLock = false, okText = right, cancelText = left, width = 6, margin = '0 0 0 '+parseInt(-(width/2))+'px', type = type != undefined ? type : 'alert', time = time != undefined ? parseInt(time) : 0,
        		headerTpl = '<div id="hDialog-header" style="padding:.4rem;font-size:.48rem;font-weight:bold;color:#333;text-align:center;">' + title +'</div>',
    			okTpl = '<a href="javascript:;" style="display:inline-block;text-decoration:none;width: 2.4rem;height: .8rem;background: #333;text-align: center;line-height: .8rem;border-radius: .4rem;font-size: .32rem;font-weight: bold;color: #ffdf1b;margin-top: .4rem;" id="h_ok">'+ okText +'</a>',
    			cancelTpl = '<a href="javascript:;" style="display:inline-block;text-decoration:none;width: 2.4rem;height: .78rem;background: white;border: 1px solid #999;text-align: center;line-height: .78rem;border-radius: .4rem;font-size: .32rem;font-weight: bold;color: #333;margin: .4rem .36rem;" id="h_cancel">'+ cancelText +'</a>',
    			contentTpl = '<div id="hDialog-content" style="padding:.2rem .4rem .4rem .4rem;text-align:left;font-size:.32rem;color:#333;">' + content + '</div>',
    			maskTpl = '<div id="hDialog-mask" style="width:100%;height:100%;background-color:rgba(0,0,0,0.6);position:fixed;top:0;left:0;z-index:99999;"></div>';  		
    			if(type === 'confirm'){ footerTpl = '<div id="hDialog-footer" style="border-top:1px solid #ddd;height:1.6rem;">'+ cancelTpl + okTpl +'</div>'; }
    			if(isLock != true) tpl += maskTpl;
    			tpl += '<div id="hDialog-wrap" class="animated" style="width:'+width+'rem;border-radius:5px;box-shadow:4px 4px 10px #666;-webkit-box-shadow:4px 4px 10px #666;overflow:hidden;background-color:#ffffff;border:1px solid #eee;position:fixed;top:33%;left:11%;margin:'+margin+';z-index:100000;">' + headerTpl + contentTpl + footerTpl + '</div>'; 
    			methods.remove('#hDialog-wrap,#hDialog-mask');
    			$B.stop().append(tpl);
    			if(time !== 0) { clearTimeout(t); t = setTimeout(function() { $.closeDialog(callback); },time); }
    			$('a:contains('+okText+')').on("click", function() { $.closeDialog(); if(callback != undefined){ methods.fire.call(this, callback); } });
            $('a:contains('+cancelText+')').on("click", function() { $.closeDialog(); if(callbacks != undefined){ methods.fire.call(this, callbacks); } });
        },
        // 只有1个按钮    确定按钮可以自定义 另外一个按钮是取消按钮   充值提醒按钮
        dialogDiyOne: function (type, title, content, time, right, callback) {
        		var t, tpl = '', footerTpl = '', isLock = false, okText = right, cancelText = "", width = 6, margin = '0 0 0 '+parseInt(-(width/2))+'px', type = type != undefined ? type : 'alert', time = time != undefined ? parseInt(time) : 0,
        		headerTpl = '<div id="hDialog-header" style="padding:.4rem;font-size:.48rem;font-weight:bold;color:#333;text-align:left;">' + title +'</div>',
    			okTpl = '<a href="javascript:;" style="display:inline-block;width: 4.3rem;height: .8rem;background: #333;text-align: center;line-height: .8rem;border-radius: .4rem;font-size: .32rem;font-weight: bold;color: #ffdf1b;margin-top: .4rem;margin-left:.8rem;" id="h_ok">'+ okText +'</a>',
    			cancelTpl = '<a href="javascript:;" style="display:inline-block;width:.33rem;height:.33rem;position:absolute;top:.5rem;right:.4rem;background:url(images/sb_cha.png) no-repeat;background-size:.33rem .33rem;" id="h_cancel">'+ cancelText +'</a>',
    			contentTpl = '<div id="hDialog-content" style="padding:.2rem .4rem .8rem .4rem;text-align:left;font-size:.32rem;color:#333;">' + content + '</div>',
    			maskTpl = '<div id="hDialog-mask" style="width:100%;height:100%;background-color:rgba(0,0,0,0.6);position:fixed;top:0;left:0;z-index:99999;"></div>';  		
    			if(type === 'confirm'){ footerTpl = '<div id="hDialog-footer" style="border-top:1px solid #ddd;height:1.6rem;">'+ cancelTpl + okTpl +'</div>'; }
    			if(isLock != true) tpl += maskTpl;
    			tpl += '<div id="hDialog-wrap" class="animated" style="width:'+width+'rem;border-radius:5px;box-shadow:4px 4px 10px #666;-webkit-box-shadow:4px 4px 10px #666;overflow:hidden;background-color:#ffffff;border:1px solid #eee;position:fixed;top:33%;left:11%;margin:'+margin+';z-index:100000;">' + headerTpl + contentTpl + footerTpl + '</div>'; 
    			methods.remove('#hDialog-wrap,#hDialog-mask');
    			$B.stop().append(tpl);
    			if(time !== 0) { clearTimeout(t); t = setTimeout(function() { $.closeDialog(callback); },time); }
    			$('a:contains('+okText+')').on("click", function() { $.closeDialog(); if(callback != undefined){ methods.fire.call(this, callback); } });
            $('a:contains('+cancelText+')').on("click", function() { $.closeDialog();  });
        },
        
        // 只有1个按钮  我知道了按钮可以自定义
        dialogDiyOneOk: function (type, title, content, time, right, callback) {
        		var t, tpl = '', footerTpl = '', isLock = false, okText = right, cancelText = "", width = 6, margin = '0 0 0 '+parseInt(-(width/2))+'px', type = type != undefined ? type : 'alert', time = time != undefined ? parseInt(time) : 0,
        		headerTpl = '<div id="hDialog-header" style="padding:.4rem;font-size:.48rem;font-weight:bold;color:#333;text-align:center;">' + title +'</div>',
    			okTpl = '<a href="javascript:;" style="display:inline-block;width: 4.3rem;height: .8rem;background: #333;text-align: center;line-height: .8rem;border-radius: .4rem;font-size: .32rem;font-weight: bold;color: #ffdf1b;margin-top: .4rem;margin-left:.8rem;" id="h_ok">'+ okText +'</a>',
    			cancelTpl = '<a href="javascript:;" style="display:inline-block;width:.33rem;height:.33rem;position:absolute;top:.5rem;right:.4rem;" id="h_cancel">'+ cancelText +'</a>',
    			contentTpl = '<div id="hDialog-content" style="padding:.2rem .4rem .8rem .4rem;text-align:left;font-size:.3rem;color:#333;">' + content + '</div>',
    			maskTpl = '<div id="hDialog-mask" style="width:100%;height:100%;background-color:rgba(0,0,0,0.6);position:fixed;top:0;left:0;z-index:99999;"></div>';  		
    			if(type === 'confirm'){ footerTpl = '<div id="hDialog-footer" style="border-top:1px solid #ddd;height:1.6rem;">'+ cancelTpl + okTpl +'</div>'; }
    			if(isLock != true) tpl += maskTpl;
    			tpl += '<div id="hDialog-wrap" class="animated" style="width:'+width+'rem;border-radius:5px;box-shadow:4px 4px 10px #666;-webkit-box-shadow:4px 4px 10px #666;overflow:hidden;background-color:#ffffff;border:1px solid #eee;position:fixed;top:33%;left:11%;margin:'+margin+';z-index:100000;">' + headerTpl + contentTpl + footerTpl + '</div>'; 
    			methods.remove('#hDialog-wrap,#hDialog-mask');
    			$B.stop().append(tpl);
    			if(time !== 0) { clearTimeout(t); t = setTimeout(function() { $.closeDialog(callback); },time); }
    			$('a:contains('+okText+')').on("click", function() { $.closeDialog(); if(callback != undefined){ methods.fire.call(this, callback); } });
            $('a:contains('+cancelText+')').on("click", function() { $.closeDialog();  });
        },
        
        dialogClose: function (type, title, content, time, left, right, callback, callbacks) {
        		var t, tpl = '', footerTpl = '', isLock = false, okText = right, cancelText = left, width = 6, margin = '0 0 0 '+parseInt(-(width/2))+'px', type = type != undefined ? type : 'alert', time = time != undefined ? parseInt(time) : 0,
        		headerTpl = '<div id="hDialog-header" style="padding:.4rem;font-size:.48rem;color:#333;text-align:center;">' + title +'</div>',
    			okTpl = '<a href="javascript:;" style="display:inline-block;width: 5.16rem;height: .76rem;border: .02rem solid #b9b9b9;background: white;text-align: center;line-height: .8rem;border-radius: .4rem;font-size: .32rem;font-weight:  bold;color: #333;margin: .2rem .36rem;" id="h_ok">'+ okText +'</a>',
    			cancelTpl = '<a href="javascript:;" style="display:inline-block;width: 5.2rem;height: .8rem;background: #333;border: 1px solid #999;text-align: center;line-height: .8rem;border-radius: .4rem;font-size: .32rem;font-weight:  bold;color: #ffda00;margin: .2rem .36rem;" id="h_cancel">'+ cancelText +'</a>',
    			contentTpl = '<div id="hDialog-content" style="padding:.2rem .4rem .4rem .4rem;text-align:left;font-size:.32rem;color:#333;">' + content + '</div>',
//  			closeCode = '<div id="closeCode" style="width:.5rem;height:.5rem;border-radius:.25rem;background-color:#ffda00;position:absolute;top:-.1rem;right:-.1rem;"><span style="width:.5rem;height:.5rem;color:white;font-size:.4rem;display:inline-block;margin-left:.1rem;margin-bottom:.1rem;">×</span></div>',
				closeCode = '<div id="closeCode" style="width:.33rem;height:.33rem;position:absolute;top:.55rem;right:.4rem;background:url(images/sb_cha.png) no-repeat;background-size:.33rem .33rem;"></div>',
    			maskTpl = '<div id="hDialog-mask" style="width:100%;height:100%;background-color:rgba(0,0,0,0.6);position:fixed;top:0;left:0;z-index:99999;"></div>';  		
    			if(type === 'confirm'){ footerTpl = '<div id="hDialog-footer" style="border-top:1px solid #ddd;padding: .2rem 0;">'+ cancelTpl + okTpl +'</div>'; }
    			if(isLock != true) tpl += maskTpl;
    			tpl += '<div id="hDialog-wrap" class="animated" style="width:'+width+'rem;border-radius:5px;box-shadow:4px 4px 10px #666;-webkit-box-shadow:4px 4px 10px #666;overflow:hidden;background-color:#ffffff;border:1px solid #eee;position:fixed;top:33%;left:11%;margin:'+margin+';z-index:100000;">' + closeCode + headerTpl + contentTpl + footerTpl + '</div>'; 
    			methods.remove('#hDialog-wrap,#hDialog-mask');
    			$B.stop().append(tpl);
    			if(time !== 0) { clearTimeout(t); t = setTimeout(function() { $.closeDialog(callback); },time); }
    			$('a:contains('+okText+')').on("click", function() {$.closeDialog(); if(callback != undefined){ methods.fire.call(this, callback); } });
    			$('#closeCode').on('click',function(){ $.closeDialog(); }); //关闭按钮点击事件
            $('a:contains('+cancelText+')').on("click", function() { $.closeDialog(); if(callbacks != undefined){ methods.fire.call(this, callbacks); } });
        },
        // 一个按钮
        dialogCloseOne: function (type, title, content, time, right, callback) {
        		var t, tpl = '', footerTpl = '', isLock = false, okText = right, width = 6, margin = '0 0 0 '+parseInt(-(width/2))+'px', type = type != undefined ? type : 'alert', time = time != undefined ? parseInt(time) : 0,
        		headerTpl = '<div id="hDialog-header" style="padding:.4rem;font-size:.48rem;color:#333;text-align:center;">' + title +'</div>',
    			okTpl = '<a href="javascript:;" style="display:inline-block;width: 5.2rem;height: .8rem;background: #333;text-align: center;line-height: .8rem;border-radius: .4rem;font-size: .32rem;font-weight:  bold;color: #ffda00;margin: .2rem .36rem;" id="h_ok">'+ okText +'</a>',
    			contentTpl = '<div id="hDialog-content" style="padding:.2rem .4rem .4rem .4rem;text-align:left;font-size:.32rem;color:#333;">' + content + '</div>',
//  			closeCode = '<div id="closeCode" style="width:.5rem;height:.5rem;border-radius:.25rem;background-color:#ffda00;position:absolute;top:-.1rem;right:-.1rem;"><span style="width:.5rem;height:.5rem;color:white;font-size:.4rem;display:inline-block;margin-left:.1rem;margin-bottom:.1rem;">×</span></div>',
				closeCode = '<div id="closeCode" style="width:.33rem;height:.33rem;position:absolute;top:.55rem;right:.4rem;background:url(images/sb_cha.png) no-repeat;background-size:.33rem .33rem;"></div>',
    			maskTpl = '<div id="hDialog-mask" style="width:100%;height:100%;background-color:rgba(0,0,0,0.6);position:fixed;top:0;left:0;z-index:99999;"></div>';  		
    			if(type === 'confirm'){ footerTpl = '<div id="hDialog-footer" style="border-top:1px solid #ddd;padding: .2rem 0;">'+ okTpl +'</div>'; }
    			if(isLock != true) tpl += maskTpl;
    			tpl += '<div id="hDialog-wrap" class="animated" style="width:'+width+'rem;border-radius:5px;box-shadow:4px 4px 10px #666;-webkit-box-shadow:4px 4px 10px #666;overflow:hidden;background-color:#ffffff;border:1px solid #eee;position:fixed;top:33%;left:11%;margin:'+margin+';z-index:100000;">' + closeCode + headerTpl + contentTpl + footerTpl + '</div>'; 
    			methods.remove('#hDialog-wrap,#hDialog-mask');
    			$B.stop().append(tpl);
    			if(time !== 0) { clearTimeout(t); t = setTimeout(function() { $.closeDialog(callback); },time); }
    			$('a:contains('+okText+')').on("click", function() {$.closeDialog(); if(callback != undefined){ methods.fire.call(this, callback); } });
    			$('#closeCode').on('click',function(){ $.closeDialog(); }); //关闭按钮点击事件
        },
        
        dialogOk: function (type, title, content, time, callback) {
        		var t, tpl = '', footerTpl = '', isLock = false, okText = '确定', width = 6, margin = '0 0 0 '+parseInt(-(width/2))+'px', type = type != undefined ? type : 'alert', time = time != undefined ? parseInt(time) : 0,
        		headerTpl = '<div id="hDialog-header" style="border-bottom:1px solid #ddd;padding:.3rem;font-size:.36rem;color:#333;text-align:center;">' + title +'</div>',
    			okTpl = '<a href="javascript:;" style="display:inline-block;width:100%;height:1.09rem;line-height:1.09rem;text-align:center;font-size:.32rem;color:#333;" id="h_ok">'+ okText +'</a>',
    			contentTpl = '<div id="hDialog-content" style="padding:25px 15px;text-align:center;font-size:.28rem;">' + content + '</div>',
    			maskTpl = '<div id="hDialog-mask" style="width:100%;height:100%;background-color:rgba(0,0,0,0.6);position:fixed;top:0;left:0;z-index:99999;"></div>';  		
    			if(type === 'confirm'){ footerTpl = '<div id="hDialog-footer" style="border-top:1px solid #ddd;">' + okTpl +'</div>'; }
    			if(isLock != true) tpl += maskTpl;
    			tpl += '<div id="hDialog-wrap" class="animated" style="width:'+width+'rem;border-radius:5px;box-shadow:4px 4px 10px #666;-webkit-box-shadow:4px 4px 10px #666;overflow:hidden;background-color:#ffffff;border:1px solid #eee;position:fixed;top:35%;left:11%;margin:'+margin+';z-index:100000;">' + headerTpl + contentTpl + footerTpl + '</div>'; 
    			methods.remove('#hDialog-wrap,#hDialog-mask');
    			$B.stop().append(tpl);
    			if(time !== 0) { clearTimeout(t); t = setTimeout(function() { $.closeDialog(callback); },time); }
    			$('a:contains('+okText+')').on("click", function() { $.closeDialog(); if(callback != undefined){ methods.fire.call(this, callback); } });
            
        },
        
        // 只有两个按钮    左右按钮可以自定义事件  空箱按钮
        dialogMsg: function (type, title, content, time, left, right, callbacks, callback, boxNum, kuaidi, toMobile, fromMobile, times) {
        		var t, tpl = '', footerTpl = '', isLock = false, okText = right, cancelText = left, width = 6, margin = '0 0 0 '+parseInt(-(width/2))+'px', type = type != undefined ? type : 'alert', time = time != undefined ? parseInt(time) : 0,
        		headerTpl = '<div id="hDialog-header" style="padding:.4rem;font-size:.48rem;font-weight:bold;color:#333;text-align:center;">' + title +'</div>',
    			okTpl = '<a href="javascript:;" style="display:inline-block;width: 2.4rem;height: .8rem;background: #333;text-align: center;line-height: .8rem;border-radius: .4rem;font-size: .32rem;font-weight: bold;color: #ffdf1b;margin-top: .4rem;" id="h_ok">'+ okText +'</a>',
    			cancelTpl = '<a href="javascript:;" style="display:inline-block;width: 2.4rem;height: .78rem;background: white;border: 1px solid #999;text-align: center;line-height: .78rem;border-radius: .4rem;font-size: .32rem;font-weight: bold;color: #333;margin: .4rem .36rem;" id="h_cancel">'+ cancelText +'</a>',
    			contentTpl = '<div id="hDialog-content" style="padding:.2rem .4rem 0rem .4rem;text-align:left;font-size:.28rem;color:#333;"><div class="ex_recorditem"><div class="ex_recorditem1">箱子编号</div><div class="ex_recorditem2 ex_recorditem2_dialog">' + boxNum + '</div></div><div class="ex_recorditem"><div class="ex_recorditem1">快递单号</div><div class="ex_recorditem2 ex_recorditem2_dialog">' + kuaidi + '</div></div><div class="ex_recorditem"><div class="ex_recorditem1">收件人手机</div><div class="ex_recorditem2 ex_recorditem2_dialog">' + toMobile + '</div></div><div class="ex_recorditem"><div class="ex_recorditem1">快递员手机</div><div class="ex_recorditem2 ex_recorditem2_dialog">' + fromMobile + '</div></div><div class="ex_recorditem"><div class="ex_recorditem1">投递时间</div><div class="ex_recorditem2 ex_recorditem2_dialog">' + times + '</div></div>' + content + '</div>',
    			maskTpl = '<div id="hDialog-mask" style="width:100%;height:100%;background-color:rgba(0,0,0,0.6);position:fixed;top:0;left:0;z-index:99999;"></div>';  		
    			if(type === 'confirm'){ footerTpl = '<div id="hDialog-footer" style="border-top:1px solid #ddd;height:1.6rem;">'+ cancelTpl + okTpl +'</div>'; }
    			if(isLock != true) tpl += maskTpl;
    			tpl += '<div id="hDialog-wrap" class="animated" style="width:'+width+'rem;border-radius:5px;box-shadow:4px 4px 10px #666;-webkit-box-shadow:4px 4px 10px #666;overflow:hidden;background-color:#ffffff;border:1px solid #eee;position:fixed;top:20%;left:11%;margin:'+margin+';z-index:100000;">' + headerTpl + contentTpl + footerTpl + '</div>'; 
    			methods.remove('#hDialog-wrap,#hDialog-mask');
    			$B.stop().append(tpl);
    			if(time !== 0) { clearTimeout(t); t = setTimeout(function() { $.closeDialog(callback); },time); }
    			$('a:contains('+okText+')').on("click", function() { $.closeDialog(); if(callback != undefined){ methods.fire.call(this, callback); } });
            $('a:contains('+cancelText+')').on("click", function() { $.closeDialog(); if(callbacks != undefined){ methods.fire.call(this, callbacks); } });
        },
        
        // 一个按钮 使用中的按钮
        dialogMsgOne: function (type, title, content, time, right, callback, boxNum, kuaidi, toMobile, fromMobile, times) {
        		var t, tpl = '', footerTpl = '', isLock = false, okText = right, width = 6, margin = '0 0 0 '+parseInt(-(width/2))+'px', type = type != undefined ? type : 'alert', time = time != undefined ? parseInt(time) : 0,
        		headerTpl = '<div id="hDialog-header" style="padding:.4rem;font-size:.48rem;color:#333;text-align:center;">' + title +'</div>',
    			okTpl = '<a href="javascript:;" style="display:inline-block;width: 5.2rem;height: .8rem;background: #333;text-align: center;line-height: .8rem;border-radius: .4rem;font-size: .32rem;font-weight:  bold;color: #ffda00;margin: .2rem .36rem;" id="h_ok">'+ okText +'</a>',
    			contentTpl = '<div id="hDialog-content" style="padding:.2rem .4rem 0rem .4rem;text-align:left;font-size:.28rem;color:#333;"><div class="ex_recorditem"><div class="ex_recorditem1">箱子编号</div><div class="ex_recorditem2 ex_recorditem2_dialog">' + boxNum + '</div></div><div class="ex_recorditem"><div class="ex_recorditem1">快递单号</div><div class="ex_recorditem2 ex_recorditem2_dialog">' + kuaidi + '</div></div><div class="ex_recorditem"><div class="ex_recorditem1">收件人手机</div><div class="ex_recorditem2 ex_recorditem2_dialog">' + toMobile + '</div></div><div class="ex_recorditem"><div class="ex_recorditem1">快递员手机</div><div class="ex_recorditem2 ex_recorditem2_dialog">' + fromMobile + '</div></div><div class="ex_recorditem"><div class="ex_recorditem1">投递时间</div><div class="ex_recorditem2 ex_recorditem2_dialog">' + times + '</div></div>' + content + '</div>',
//  			closeCode = '<div id="closeCode" style="width:.5rem;height:.5rem;border-radius:.25rem;background-color:#ffda00;position:absolute;top:-.1rem;right:-.1rem;"><span style="width:.5rem;height:.5rem;color:white;font-size:.4rem;display:inline-block;margin-left:.1rem;margin-bottom:.1rem;">×</span></div>',
				closeCode = '<div id="closeCode" style="width:.33rem;height:.33rem;position:absolute;top:.55rem;right:.4rem;background:url(images/sb_cha.png) no-repeat;background-size:.33rem .33rem;"></div>',
    			maskTpl = '<div id="hDialog-mask" style="width:100%;height:100%;background-color:rgba(0,0,0,0.6);position:fixed;top:0;left:0;z-index:99999;"></div>';  		
    			if(type === 'confirm'){ footerTpl = '<div id="hDialog-footer" style="border-top:1px solid #ddd;padding: .2rem 0;">'+ okTpl +'</div>'; }
    			if(isLock != true) tpl += maskTpl;
    			tpl += '<div id="hDialog-wrap" class="animated" style="width:'+width+'rem;border-radius:5px;box-shadow:4px 4px 10px #666;-webkit-box-shadow:4px 4px 10px #666;overflow:hidden;background-color:#ffffff;border:1px solid #eee;position:fixed;top:25%;left:11%;margin:'+margin+';z-index:100000;">' + closeCode + headerTpl + contentTpl + footerTpl + '</div>'; 
    			methods.remove('#hDialog-wrap,#hDialog-mask');
    			$B.stop().append(tpl);
    			if(time !== 0) { clearTimeout(t); t = setTimeout(function() { $.closeDialog(callback); },time); }
    			$('a:contains('+okText+')').on("click", function() {$.closeDialog(); if(callback != undefined){ methods.fire.call(this, callback); } });
    			$('#closeCode').on('click',function(){ $.closeDialog(); }); //关闭按钮点击事件
        },
        
        // 三个按钮 使用中的按钮   取回快件  重发信息  拨号
        dialogMsgThree: function (type, title, content, time, left, right, bottom, opens, callback, callbacks, callbackBot, callbackOpen, boxNum, kuaidi, toMobile, fromMobile, times) {
        		var t, tpl = '', footerTpl = '', isLock = false, okText = right, cancelText = left, bottomText = bottom, openText = opens, width = 6, margin = '0 0 0 '+parseInt(-(width/2))+'px', type = type != undefined ? type : 'alert', time = time != undefined ? parseInt(time) : 0,
        		headerTpl = '<div id="hDialog-header" style="padding:.2rem;font-size:.48rem;color:#333;text-align:center;">' + title +'</div>',
    			okTpl = '<a href="javascript:;" style="display:inline-block;width: 5.16rem;height: .76rem;border: .02rem solid #b9b9b9;background: white;text-align: center;line-height: .8rem;border-radius: .4rem;font-size: .32rem;font-weight:  bold;color: #333;margin: .2rem .36rem;" id="h_ok">'+ okText +'</a>',
    			cancelTpl = '<a href="javascript:;" style="display:inline-block;width: 5.2rem;height: .8rem;background: #333;border: 1px solid #999;text-align: center;line-height: .8rem;border-radius: .4rem;font-size: .32rem;font-weight:  bold;color: #ffda00;margin: .2rem .36rem;" id="h_cancel">'+ cancelText +'</a>',
    			bottomTpl = '<a href="javascript:;" style="display:inline-block;width: 5.2rem;height: .8rem;background: #333;border: 1px solid #999;text-align: center;line-height: .8rem;border-radius: .4rem;font-size: .32rem;font-weight:  bold;color: #ffda00;margin: .2rem .36rem;" id="h_cancel">'+ bottomText +'</a>',
    			openTpl = '<a href="javascript:;" style="display:inline-block;width: 5.16rem;height: .76rem;border: .02rem solid #b9b9b9;background: white;text-align: center;line-height: .8rem;border-radius: .4rem;font-size: .32rem;font-weight:  bold;color: #333;margin: .2rem .36rem;" id="h_ok">'+ openText +'</a>',
    			contentTpl = '<div id="hDialog-content" style="padding:.2rem .4rem 0rem .4rem;text-align:left;font-size:.28rem;color:#333;"><div class="ex_recorditem"><div class="ex_recorditem1">箱子编号</div><div class="ex_recorditem2 ex_recorditem2_dialog">' + boxNum + '</div></div><div class="ex_recorditem"><div class="ex_recorditem1">快递单号</div><div class="ex_recorditem2 ex_recorditem2_dialog">' + kuaidi + '</div></div><div class="ex_recorditem"><div class="ex_recorditem1">收件人手机</div><div class="ex_recorditem2 ex_recorditem2_dialog">' + toMobile + '</div></div><div class="ex_recorditem"><div class="ex_recorditem1">快递员手机</div><div class="ex_recorditem2 ex_recorditem2_dialog">' + fromMobile + '</div></div><div class="ex_recorditem"><div class="ex_recorditem1">投递时间</div><div class="ex_recorditem2 ex_recorditem2_dialog">' + times + '</div></div>' + content + '</div>',
//  			closeCode = '<div id="closeCode" style="width:.5rem;height:.5rem;border-radius:.25rem;background-color:#ffda00;position:absolute;top:-.1rem;right:-.1rem;"><span style="width:.5rem;height:.5rem;color:white;font-size:.4rem;display:inline-block;margin-left:.1rem;margin-bottom:.1rem;">×</span></div>',
				closeCode = '<div id="closeCode" style="width:.33rem;height:.33rem;position:absolute;top:.35rem;right:.4rem;background:url(images/sb_cha.png) no-repeat;background-size:.33rem .33rem;"></div>',
    			maskTpl = '<div id="hDialog-mask" style="width:100%;height:100%;background-color:rgba(0,0,0,0.6);position:fixed;top:0;left:0;z-index:99999;"></div>';  		
    			if(type === 'confirm'){ footerTpl = '<div id="hDialog-footer" style="border-top:1px solid #ddd;padding: 0rem 0;">'+ cancelTpl + okTpl + bottomTpl + openTpl +'</div>'; }
    			if(isLock != true) tpl += maskTpl;
    			tpl += '<div id="hDialog-wrap" class="animated" style="width:'+width+'rem;border-radius:5px;box-shadow:4px 4px 10px #666;-webkit-box-shadow:4px 4px 10px #666;overflow:hidden;background-color:#ffffff;border:1px solid #eee;position:fixed;top:5%;left:11%;margin:'+margin+';z-index:100000;">' + closeCode + headerTpl + contentTpl + footerTpl + '</div>'; 
    			methods.remove('#hDialog-wrap,#hDialog-mask');
    			$B.stop().append(tpl);
    			if(time !== 0) { clearTimeout(t); t = setTimeout(function() { $.closeDialog(callback); },time); }
    			$('a:contains('+okText+')').on("click", function() {$.closeDialog(); if(callback != undefined){ methods.fire.call(this, callback); } });
    			$('#closeCode').on('click',function(){ $.closeDialog(); }); //关闭按钮点击事件
    			$('a:contains('+cancelText+')').on("click", function() { $.closeDialog(); if(callbacks != undefined){ methods.fire.call(this, callbacks); } });
    			$('a:contains('+bottomText+')').on("click", function() { $.closeDialog(); if(callbackBot != undefined){ methods.fire.call(this, callbackBot); } });
    			$('a:contains('+openText+')').on("click", function() {$.closeDialog(); if(callbackOpen != undefined){ methods.fire.call(this, callbackOpen); } });
        },
        
        dialogInput: function (type, title, time, callback, callbacks) {
        		document.body.scrollTop = 0;
    			document.documentElement.scrollTop = 0;
        		var t, tpl = '', footerTpl = '', isLock = false, okText = '确定', cancelText = '取消', width = 6, margin = '0 0 0 '+parseInt(-(width/2))+'px', type = type != undefined ? type : 'alert', time = time != undefined ? parseInt(time) : 0,
        		headerTpl = '<div id="hDialog-header" style="border-bottom:1px solid #ddd;padding:.3rem;font-size:.36rem;color:#333;text-align:center;">' + title +'</div>',
    			okTpl = '<a href="javascript:;" id="okBtn" style="display:inline-block;width:49%;height:1.09rem;line-height:1.09rem;text-align:center;font-size:.32rem;color:#333;" id="h_ok">'+ okText +'</a>',
    			cancelTpl = '<a href="javascript:;" style="display:inline-block;width:49%;height:1.09rem;line-height:1.09rem;text-align:center;border-right:1px solid #ddd;font-size:.32rem;color:#999;" id="h_cancel">'+ cancelText +'</a>',
    			contentTpl = '<div id="hDialog-content" ><div style="width: 100%;height: 1rem;font-size: .28rem;color: #666666;text-align: center;"><div style="height:.1rem;"></div><input class="msb_phonecode2" type="text" style="border: 1px solid #dddddd;height: .4rem;width: 3.3rem;outline: none;line-height: .2rem;display: block;padding: .1rem .6rem .1rem 0.2rem;white-space: pre;-webkit-caret-color: #333;font-size: .32rem;margin-left: .9rem;margin-top: .1rem;border-radius: 5px;" maxlength="32" /><div class="clearBtn" style="position: absolute;width: 20px;height: 20px;border-radius: 10px;background: #666;right: 1.1rem;top: 1.7rem;margin-top: -10px;display: none;"><span style="width:.5rem;height:.5rem;color:white;font-size:.3rem;display:inline-block;margin-left:-.05rem;">×</span></div></div></div>',
    			maskTpl = '<div id="hDialog-mask" style="width:100%;height:100%;background-color:rgba(0,0,0,0.6);position:fixed;top:0;left:0;z-index:99999;"></div>';  		
    			if(type === 'confirm'){ footerTpl = '<div id="hDialog-footer" style="border-top:1px solid #ddd;">'+ cancelTpl + okTpl +'</div>'; }
    			if(isLock != true) tpl += maskTpl;
    			tpl += '<div id="hDialog-wrap" class="animated" style="width:'+width+'rem;border-radius:5px;box-shadow:4px 4px 10px #666;-webkit-box-shadow:4px 4px 10px #666;overflow:hidden;background-color:#ffffff;border:1px solid #eee;position:fixed;top:2rem;left:11%;margin:'+margin+';z-index:100000;">' + headerTpl + contentTpl + footerTpl + '</div>'; 
    			methods.remove('#hDialog-wrap,#hDialog-mask');
    			$B.stop().append(tpl);
    			if(time !== 0) { clearTimeout(t); t = setTimeout(function() { $.closeDialog(callback); },time); }
    			$('a:contains('+okText+')').on("click", function() { if(callback != undefined){ methods.fire.call(this, callback); } });
            $('a:contains('+cancelText+')').on("click", function() { $.closeDialog(); if(callbacks != undefined){ methods.fire.call(this, callbacks); } });
            
            // 阻止滑动事件
//			$("#hDialog-mask").on('touchmove',function(e){
//              e.preventDefault();  //阻止默认行为
//          })
//              
//          $("#hDialog-wrap").on('touchmove',function(e){
//              e.preventDefault();  //阻止默认行为
//          })
            
        },
        /**
		 * @decription 关闭消息框
		 * @param callback : 回调函数
		 */
        closeDialog: function (callback) {
        		methods.remove('#hDialog-wrap,#hDialog-mask'); 
        		if(callback != undefined) methods.fire.call(this, callback);
        }
	});
})(jQuery, window, document);
