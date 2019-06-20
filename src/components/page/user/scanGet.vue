<template>
  <div>
    <vue-element-loading :active="show" text="Loading" element-loading-spinner="el-icon-loading"/>
    <div class="sg_box none">
      <div class="ex_norecord">
        <!-- <img src="../../assets/images/an_white.png">
        <p>暂无快件信息哦~</p>-->
      </div>
      <div class="sg_recordboxT none" style="background: white;">
        <!-- <div class="ok_recordboxTName">金龙内部测试</div> -->
        <div class="ok_recordboxTAdr">
          <img src="../../../assets/images/ok_posiIcon.png">
          <p class="ok_recordboxAdress">洛阳市金龙区</p>
        </div>
      </div>
      <div class="sg_loadList">
        <div class="sg_lists">
          <div class="ok_recordbox">
            <div class="ok_recordboxM">
              <div class="ok_recordboxML">10号</div>
              <div class="ok_recordboxMR">
                <div class="ok_recordboxItem">
                  箱子类型：
                  <span class="ok_recordboxItemCol">中型</span>
                  <div class="ok_recordboxItem">
                    快递员手机：
                    <span class="ok_recordboxItemCol">13866543352</span>
                  </div>
                  <div class="ok_recordboxItem">
                    投递时间：
                    <span class="ok_recordboxItemCol">2019.05.14 15:09</span>
                  </div>
                  <!-- <div class="ok_recordboxB">
            <div class="ok_recordboxBT">
              <div class="ok_recordboxBL">免费</div>
              <div class="ok_recordboxBR">￥20</div>
              <div class="ok_recordboxBL">￥0.01元/次</div><div class="ok_recordboxBR">￥0.01</div>
              <div class="ok_recordboxBR">￥20</div>
            </div>
                  </div>-->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="sg_whiteBo">
        <div class="ok_recordboxB">
          <div class="ok_recordboxBT">
            <div class="ok_recordboxBL">￥0.01元/次</div>
            <div class="ok_recordboxBR">￥0.01</div>
          </div>
        </div>
      </div>
      <div class="sb_inputPayBtn none" style="position: fixed;bottom: 0;">
        <div class="sb_payMon">
          待支付金额(￥
          <span class="qs_moneys">0.01</span>)
        </div>
        <div class="sb_payOpen selectBtn" @click="open">支付并开箱</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import url("../../../assets/css/style.css");
html,
body {
  height: 100%;
}
.active {
  background: #f1f1f1 !important;
  color: #8f8f8f !important;
  border: 0 !important;
}
.velmld-parent .velmld-overlay {
  font-size: 0.44rem;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
}
</style>
<script>
import VueElementLoading from "vue-element-loading";
import { Resource } from "../../../utils/api.js";
import tooltipbox from "../../../assets/js/tooltipbox.js";
export default {
  components: {
    VueElementLoading
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    open() {
      if (!localStorage.getItem('erCode')) {
        let _this = this
      $.ajax({
             type: "GET",
             url: "http://wx.luoyangjinmei.com/getWxinter1.ashx",
            //  url: "http://vue2.jianku.com.cn/000.php",
             // data: {username:$("#username").val(), content:$("#content").val()},
             dataType: "json",
						 data:{url:location.href.split('#')[0] },
             success: function(data){
                         console.log(data);
						_this.wx.config({
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
                   _this.wx.error(function(res) {
                 alert("出错了：" + res.errMsg);//这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
             });
                  _this.wx.ready(function(){
                   _this.wx.checkJsApi({
                      jsApiList : ['scanQRCode'],
                      success : function(res) {
                      }
                 });
             });
             //点击按钮扫描二维码
                 _this.wx.scanQRCode({
                     needResult : 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                     scanType : [ "qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                     success : function(res) {
                       localStorage.setItem('erCode',res.ercode)
                       _this.show = true;
          _this.$fetch(Resource.pickupsuccess, {
            cabinetId: localStorage.getItem('erCode'),
            pickcode: 855895
          })
            .then(res => {
              if (res.status) {
                setTimeout(() => {
                  _this.show = false;
                  _this.$router.push({
                    path: "/openAgainScan"
                  });
                }, 1000);
              } else {
                setTimeout(() => {
                  _this.show = false;
                  tooltipbox.show(res.msg);
                }, 1000);
              }
            })
            .catch(err => {});
                    	 var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                     },
                 });
                      }
         });
        } else {
          this.show = true;
          this.$fetch(Resource.pickupsuccess, {
            cabinetId: localStorage.getItem('erCode'),
            pickcode: 855895
          })
            .then(res => {
              if (res.status) {
                setTimeout(() => {
                  this.show = false;
                  this.$router.push({
                    path: "/openAgainScan"
                  });
                }, 1000);
              } else {
                setTimeout(() => {
                  this.show = false;
                  tooltipbox.show(res.msg);
                }, 1000);
              }
            })
            .catch(err => {});
        }
    }
  },
  mounted() {
    document.title = "开箱取件";
  }
};
</script>
