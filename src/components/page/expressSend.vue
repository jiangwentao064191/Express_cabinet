<template>
  <div>
    <div id='msg'></div>
    <div class="sb_inputMsgs none" style="background: white;">
      <div class="sb_inputboxs">
        <div class="sb_inputboxsL">{{boxNo}}号</div>
        <div class="sb_inputboxsR">
          <div class="sb_inputboxsR1">箱门已打开，请继续完善信息。</div>
          <div class="sb_inputboxsR2">
            类型：
            <span class="sb_boxTypes">{{boxInfo.boxtype}}</span>
          </div>
          <div class="sb_inputboxsR3">{{boxInfo.boxfee}}元/次</div>
        </div>
        <div class="sb_inputboxsBtn" @click="reSelectBox">重新选箱</div>
      </div>
      <div class="sb_inputbox">填写存件信息</div>
      <div class="sb_phoneNum">
        <div class="sb_phoneNum1">
          <span style="color: red;">*</span> 快递单号
        </div>
        <input
          class="sb_phoneNum2 sb_inputNum"
          type="tel"
          placeholder="输入快递单号"
          onfocus="this.placeholder=''"
          onblur="this.placeholder='输入快递单号'"
          maxlength="32"
           v-model="expressNumber"
        >
        <div class="clearBtnCode clearNum" @click="clearInput">
          <div class="clearBtnLine1"></div>
          <div class="clearBtnLine2"></div>
        </div>
        <div class="sb_phoneNum3">扫描单号</div>
      </div>
      <div class="sb_phonecode">
        <div class="sb_phonecode1">
          <span style="color: red;">*</span> 手机号码
        </div>
        <input
          class="sb_phonecode2 sb_inputPho"
          type="tel"
          placeholder="输入收件人手机号"
          onfocus="this.placeholder=''"
          onblur="this.placeholder='输入收件人手机号'"
          maxlength="11"
          v-model="telphone"
        >
        <div class="bg_sound" id='talk_btn' @touchstart='DistinguishVoice'>
        </div>
        <div class="clearBtn clearBtn1 clearPho"  @click="clearInput1">
          <div class="clearBtnLine1"></div>
          <div class="clearBtnLine2"></div>
        </div>
      </div>
      <div style="width: 100%;height:1.3rem;"></div>
      <div class="sb_inputPayBtn none">
        <div class="sb_payMon" style="width: 40%;" @click="cancel">取消投递</div>
        <div class="sb_payOpen defaultBtn" style="width: 60%;" @click="confirm">
          确认并支付(
          <span class="sb_payMoney">￥0.01</span>)
        </div>
      </div>
      <!-- <div class="sb_inputPayFree none">
        <div class="sb_payMon" style="width: 50%;" >取消投递</div>
        <div class="sb_inputBtn defaultBtn" >确认投递</div>
      </div> -->
    </div>
  </div>
</template>
<script>
import { Resource } from "../../utils/api.js";
import '../../assets/js/jweixin-1.2.0'
export default {
    data () {
return {
        msg: 'Welcome to Your Vue.js App',
        boxInfo:{
        },
        boxNo: '',
        expressNumber:'',
        telphone:''
        }
    },
    methods: {
      DistinguishVoice () {
//         let that =this
//  let START = new Date().getTime();
// 			let	recordTimer = setTimeout(function(){
// 					wx.startRecord({
// 						success: function(){
//               console.log(111)
// 							localStorage.rainAllowRecord = 'true';
// 						},
// 						cancel: function () {
// 							alert('用户拒绝授权录音');
// 						}

// 					});
// 					let	recordTimer2 = setTimeout(function(){
// 								$('#msg').text('正在识别...');
// 								that.aimobile()
// 							},10000);
// 				},300);
      },
    cancel () {
      this.$router.replace({
          path: '/expressDelive'
        })
      },
      aimobile(){

		clearTimeout(recordTimer2);

        wx.stopRecord({

          success: function (res) {

            voice.localId = res.localId;

				wx.translateVoice({

				  localId: voice.localId,

				  complete: function (res) {

					if (res.hasOwnProperty('translateResult')) {

					  $('#msg').text('您的手机号为：' + res.translateResult);

					} else {

					  alert('无法识别');

					}

				  }

				});

          },

          fail: function (res) {

            alert(JSON.stringify(res));

          }

        });

},
    clearInput () {
      this.expressNumber = ''
    },
    clearInput1 () {
      this.telphone = ''      
    },
    confirm () {
      this.$fetch(Resource.deliverysuccess, {
        courierId: "2486c4c5-b224-4a3e-b987-2f2578e03643",
        cabinetId: 1012,
        boxNo: this.boxInfo.boxtype=='大格'?4:this.boxInfo.boxtype=='中格'?3:2,
        boxfee: this.boxInfo.boxfee?this.boxInfo.boxfee.substr(1):'',
        expressId: this.expressNumber||12356,
        outPhone: this.telphone||18317529845
      })
        .then(res => {
          this.$router.push({
            path:'/offerDetail'
          })
        })
        .catch(err => {});
    },
    reSelectBox () {
      this.$router.replace({
          path: '/expressDelive'
        })
    }
    },
    mounted () {
      $.ajax({
             type: "GET",
             //url: "http://wx.luoyangjinmei.com/getWxinter1.ashx",
             url: "api/getWxinter1.ashx",
             // data: {username:$("#username").val(), content:$("#content").val()},
             dataType: "json",
						 data:{url:location.href.split('#')[0] },
             success: function(data){
                         console.log(data);
						wx.config({
									debug: false,
									appId: "wxd093959d6ee082a9",
									timestamp: data.timestamp,
									nonceStr: data.noncestr,
									signature: data.signature,
									jsApiList: [
									  // 所有要调用的 API 都要加到这个列表中
										'checkJsApi',

										'onMenuShareTimeline',

										'onMenuShareAppMessage',

										'onMenuShareQQ',

										'onMenuShareWeibo',

										'hideMenuItems',

										'showMenuItems',

										'hideAllNonBaseMenuItem',

										'showAllNonBaseMenuItem',

										'translateVoice',

										'startRecord',

										'stopRecord',

										'onRecordEnd',

										'playVoice',

										'pauseVoice',

										'stopVoice',

										'uploadVoice',

										'downloadVoice',

										'chooseImage',

										'previewImage',

										'uploadImage',

										'downloadImage',

										'getNetworkType',

										'openLocation',

										'getLocation',

										'hideOptionMenu',

										'showOptionMenu',

										'closeWindow',

										'scanQRCode',

										'chooseWXPay',

										'openProductSpecificView',

										'addCard',

										'chooseCard',

										'openCard'

									]

                  });
                  console.log(wx)
          
                      }
         });



 

//完成wx.config，执行这里

         wx.ready(function () {
           


            wx.checkJsApi({

                jsApiList: ['scanQRCode'], // 需要检测的JS接口列表，所有JS接口列表见附录2,

                success: function(res) {

                // 以键值对的形式返回，可用的api值true，不可用为false

                console.log(res); 

                },fail: function (err) {
                console.log(err);
                }

            });

            wx.scanQRCode({
					needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
					scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
					cancel: function() {
					},
					success: function(res) {
						console.log(res);
					}
				});

             //分享到朋友圈

             wx.onMenuShareTimeline({

                 title: '发条微信就能记账，太好用了！简单记账，轻松理财 —— 微账本！', // 分享标题

                 link:"http://zhangben.cn/index.php?a=gits",

                 imgUrl: "http://zhangben.cn/img/getheadimg.jpg", // 分享图标

                 success: function () {

                    

                 }

             });



             //分享给朋友

             wx.onMenuShareAppMessage({

                 title: '微账本', // 分享标题

                 desc: '赶快试试这个，发条微信就能记账，太好用了！',

                 link:"http://zhangben.cn/index.php?a=gits",

                 imgUrl: "http://zhangben.cn/img/getheadimg.jpg", // 分享图标

                 success: function (res) {

                     

                 }

             });

			 

  // 4 音频接口

  

    // 3 智能接口

  var voice = {

    localId: '',

    serverId: ''

  };

//   // 3.1 识别音频并返回识别结果

//   document.querySelector('#translateVoice').onclick = function () {

//     if (voice.localId == '') {

//       alert('请先使用 startRecord 接口录制一段声音');

//       return;

//     }

//     wx.translateVoice({

//       localId: voice.localId,

//       complete: function (res) {

//         if (res.hasOwnProperty('translateResult')) {

//           alert('识别结果：' + res.translateResult);

//         } else {

//           alert('无法识别');

//         }

//       }

//     });

//   };

//   

//   // 4.2 开始录音

//   document.querySelector('#startRecord').onclick = function () {

//     wx.startRecord({

//       cancel: function () {

//         alert('用户拒绝授权录音');

//       }

//     });

//   };

//  

//   // 4.3 停止录音

//   document.querySelector('#stopRecord').onclick = function () {

//     wx.stopRecord({

//       success: function (res) {

//         voice.localId = res.localId;

//       },

//       fail: function (res) {

//         alert(JSON.stringify(res));

//       }

//     });

//   };

//  

//   // 4.4 监听录音自动停止

//   wx.onVoiceRecordEnd({

//     complete: function (res) {

//       voice.localId = res.localId;

//       alert('录音时间已超过一分钟');

//     }

//   });

// 			 

// 

//  wx.onVoiceRecordEnd({

// 	// 录音时间超过一分钟没有停止的时候会执行 complete 回调

// 	complete: function (res) {

// 		var localId = res.localId;

// 		wx.translateVoice({

// 			localId: localId, // 需要识别的音频的本地Id，由录音相关接口获得

// 			isShowProgressTips: 1, // 默认为1，显示进度提示

// 			success: function (res) {

// 			alert(res.translateResult); // 语音识别的结果

// 			}

// 		});

// 	}

// });

// 

// var btnElem=document.getElementById("messageBtn");//获取ID

// 		var posStart = 0;//初始化起点坐标

// 		var posEnd = 0;//初始化终点坐标

// 		var posMove = 0;//初始化滑动坐标

// 		console.log(screen);

// 		function initEvent() {

// 			btnElem.addEventListener("touchstart", function(event) {

// 				event.preventDefault();//阻止浏览器默认行为

// 				posStart = 0;

// 				posStart = event.touches[0].pageY;//获取起点坐标

// 				btnElem.value = '松开 结束';

// 				console.log("start");

// 				console.log(posStart+'---------开始坐标');

// 				  wx.startRecord({

// 					  cancel: function () {

// 						alert('用户拒绝授权录音');

// 					  }

// 					});

// 			});

// 			btnElem.addEventListener("touchmove", function(event) {

// 				event.preventDefault();//阻止浏览器默认行为

// 				posMove = 0;

// 				posMove = event.targetTouches[0].pageY;//获取滑动实时坐标

// 				if(posStart - posMove < 500){

// 					btnElem.value = '松开 结束';

// 				}else{

// 					btnElem.value = '松开手指，取消发送';

// 					save();

// 				}

// 				/*console.log(posStart+'---------');

// 				console.log(posMove+'+++++++++');*/

// 			});

// 			btnElem.addEventListener("touchend", function(event) {

// 				event.preventDefault();

// 				posEnd = 0;

// 				posEnd = event.changedTouches[0].pageY;//获取终点坐标

// 				btnElem.value = '按住 说话';

// 				console.log("End");

// 				console.log(posEnd+'---------结束坐标');

// 				if(posStart - posEnd < 500 ){

// 					console.log("发送成功");

// 					save();

// 				}else{

// 					console.log("取消发送");

// 					console.log("Cancel");

// 				};

// 			});

// 		};

// 		initEvent();

// 		function save(){

// 			//ajax

// 			console.log('Success');

// 			wx.stopRecord({

// 			  success: function (res) {

// 				voice.localId = res.localId;

// 				wx.translateVoice({

// 				  localId: voice.localId,

// 				  complete: function (res) {

// 					if (res.hasOwnProperty('translateResult')) {

// 					  alert('识别结果：' + res.translateResult);

// 					} else {

// 					  alert('无法识别');

// 					}

// 				  }

// 				});

// 			  },

// 			  fail: function (res) {

// 				alert(JSON.stringify(res));

// 			  }

// 			});

// 		}



//----------------



			//按下开始录音

			$('#talk_btn').on('touchstart', function(event){
        debugger
        console.log(event)
				event.preventDefault();

				START = new Date().getTime();



			let	recordTimer = setTimeout(function(){

					$('#msg').text('正在录音...');

					wx.startRecord({

						success: function(){

							localStorage.rainAllowRecord = 'true';

						},

						cancel: function () {

							alert('用户拒绝授权录音');

						}

					});

					

							recordTimer2 = setTimeout(function(){

								$('#msg').text('正在识别...');

								aimobile()

							},10000);

					

				},300);

			});

			//松手结束录音

			$('#talk_btn').on('touchend', function(event){

				event.preventDefault();

				END = new Date().getTime();

				

				if((END - START) < 300){

					END = 0;

					START = 0;

					//小于300ms，不录音

					clearTimeout(recordTimer);

				}else{

					$('#msg').text('正在识别结果...');

					aimobile()



				}

			});

			

function aimobile(){

		clearTimeout(recordTimer2);

        wx.stopRecord({

          success: function (res) {

            voice.localId = res.localId;

				wx.translateVoice({

				  localId: voice.localId,

				  complete: function (res) {

					if (res.hasOwnProperty('translateResult')) {

					  $('#msg').text('您的手机号为：' + res.translateResult);

					} else {

					  alert('无法识别');

					}

				  }

				});

          },

          fail: function (res) {

            alert(JSON.stringify(res));

          }

        });

}

 

         });
         wx.error((err)=>{
           alert('失败')
         })

      if (this.$route.query.boxInfo) {
        this.boxInfo = JSON.parse(this.$route.query.boxInfo)
        this.boxNo = this.$route.query.boxNo
      }
    }
};
</script>
<style scoped>
@import url("../../assets/css/style.css");
@import url("../../assets/css/animate.min.css");
@import url("../../assets/css/common.css");
</style>

