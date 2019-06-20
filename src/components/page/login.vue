<template>
  <div>
    <div class="lg_headerTitle"></div>
    <div class="lg_tip">{{title}}</div>
    <div class="lg_inputBox">
      <div class="lg_inputBoxTip">手机号</div>
      <div class="lg_inputLine">
        <input
          class="sb_phoneNum2 sb_inputNum"
          type="tel"
          placeholder="输入手机号"
          @focus="placeholder=''"
          @blur="placeholder='输入手机号'"
          maxlength="11"
          v-model="phone"
        >
        <div class="clearBtnCode clearNum" @click="phone=''">
          <div class="clearBtnLine1"></div>
          <div class="clearBtnLine2"></div>
        </div>
      </div>
      <div class="lg_inputBoxTip" style="margin-top: .4rem;">验证码</div>
      <div class="lg_inputLine">
        <input
          style="width: 3rem;"
          class="sb_phonecode2 sb_inputPho"
          type="tel"
          placeholder="输入6位验证码"
          @focus="placeholder=''"
          @blur="placeholder='输入6位验证码'"
          maxlength="6"
          v-model="VerificationCode"
        >
        <div class="lg_codeBtn" @click="getCode" v-if="!sendMsgDisabled">获取验证码</div>
        <div class="lg_codeBtn border_bg" v-if="sendMsgDisabled">{{time+'S'}}</div>
      </div>
      <div
        id="submitBtn"
        class="ex_defaultBtn"
        style="margin: .4rem 0 0 0;"
        @click="register"
      >{{btn}}</div>
      <!-- <div class="agreementBox">
        <input id="agreement" type="checkbox">
        <label for="agreement">
          我已阅读，并同意
          <a style="color: #26a5f9;" href="./agreement.html">《用户使用协议》</a>
        </label>
      </div>-->
    </div>
  </div>
</template>
<script>
import { Resource } from "../../utils/api.js";
import tooltipbox from "../../assets/js/tooltipbox.js";
export default {
  data() {
    return {
      VerificationCode: "",
      phone: "",
      sendMsgDisabled: false,
      time: 60,
      title: "注册账号",
      btn: "立即注册"
    };
  },
  mounted() {
    document.title = "注册页面";
    this.idty = localStorage.getItem("idty") || this.$route.query.idty || "";
    if (this.$route.query.logo) {
      this.$route.query.logo == "modify"
        ? (this.title = "修改手机号")
        : "注册账号";
      this.$route.query.logo == "modify" ? (this.btn = "确认修改") : "立即注册";
    }
  },
  methods: {
    getCode() {
      if (!this.phone || !/^1[34578]\d{9}$/.test(this.phone)) {
        tooltipbox.show("请输入正确手机号");
      } else {
        let _this = this;
        this.sendMsgDisabled = true;
        tooltipbox.show("验证码已发送");
        let interval = window.setInterval(function() {
          _this.time--;
        }, 1000);
        if (_this.idty != "user") {
          if (!localStorage.getItem("erCode")) {
            $.ajax({
              type: "GET",
              url: "http://wx.luoyangjinmei.com/getWxinter1.ashx",
              //  url: "http://vue2.jianku.com.cn/000.php",
              // data: {username:$("#username").val(), content:$("#content").val()},
              dataType: "json",
              data: { url: location.href.split("#")[0] },
              success: function(data) {
                console.log(data);
                _this.wx.config({
                  debug: false,
                  appId: "wxd093959d6ee082a9",
                  timestamp: data.timestamp,
                  nonceStr: data.noncestr,
                  signature: data.signature,
                  jsApiList: [
                    // 所有要调用的 API 都要加到这个列表中
                    "checkJsApi",

                    "onMenuShareTimeline",

                    "onMenuShareAppMessage",

                    "onMenuShareQQ",

                    "onMenuShareWeibo",

                    "hideMenuItems",

                    "showMenuItems",

                    "hideAllNonBaseMenuItem",

                    "showAllNonBaseMenuItem",

                    "translateVoice",

                    "startRecord",

                    "stopRecord",

                    "onRecordEnd",

                    "playVoice",

                    "pauseVoice",

                    "stopVoice",

                    "uploadVoice",

                    "downloadVoice",

                    "chooseImage",

                    "previewImage",

                    "uploadImage",

                    "downloadImage",

                    "getNetworkType",

                    "openLocation",

                    "getLocation",

                    "hideOptionMenu",

                    "showOptionMenu",

                    "closeWindow",

                    "scanQRCode",

                    "chooseWXPay",

                    "openProductSpecificView",

                    "addCard",

                    "chooseCard",

                    "openCard"
                  ]
                });
                _this.wx.error(function(res) {
                  alert("出错了：" + res.errMsg); //这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
                });
                _this.wx.ready(function() {
                  _this.wx.checkJsApi({
                    jsApiList: ["scanQRCode"],
                    success: function(res) {}
                  });
                });
                //点击按钮扫描二维码
                _this.wx.scanQRCode({
                  needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                  scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                  success: function(res) {
                    localStorage.setItem("erCode", res.ercode);
                    _this
                      .$fetch(Resource.getcheckcode, {
                        openid: "oyXLt0_bqywZK5ifUNEVaVnVPokU",
                        cabinetId: localStorage.getItem("erCode"),
                        phoneNo: _this.phone
                      })
                      .then(res => {
                        if (res.status || _this.time <= 0) {
                          tooltipbox.show("验证码已发送注意查收");
                          clearInterval(interval);
                        } else {
                          tooltipbox.show(res.msg);
                        }
                        _this.sendMsgDisabled = false;
                        _this.time = 60;
                      })
                      .catch(err => {
                        clearInterval(interval);
                        tooltipbox.show("获取验证码失败");
                        _this.sendMsgDisabled = false;
                        _this.time = 60;
                      });
                    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                  }
                });
              }
            });
          } else {
            _this
              .$fetch(Resource.getcheckcode, {
                openid: "oyXLt0_bqywZK5ifUNEVaVnVPokU",
                cabinetId: localStorage.getItem("erCode"),
                phoneNo: _this.phone
              })
              .then(res => {
                if (res.status || _this.time <= 0) {
                  tooltipbox.show("验证码已发送注意查收");
                  clearInterval(interval);
                } else {
                  tooltipbox.show(res.msg);
                }
                _this.sendMsgDisabled = false;
                _this.time = 60;
              })
              .catch(err => {
                clearInterval(interval);
                tooltipbox.show("获取验证码失败");
                _this.sendMsgDisabled = false;
                _this.time = 60;
              });
          }
        } else {
          _this
            .$fetch(Resource.isexistphone, {
              phoneNo: _this.phone
            })
            .then(res => {
              clearInterval(interval);
              _this.sendMsgDisabled = false;
              _this.time = 60;
              tooltipbox.show(res.msg);
            })
            .catch(err => {
              clearInterval(interval);
            });
        }
      }
    },
    register() {
      if (
        !this.phone ||
        !/^1[34578]\d{9}$/.test(this.phone) ||
        !this.phone ||
        !/^\d{4}$/.test(this.VerificationCode)
      ) {
        tooltipbox.show("请输入完整手机号或验证码");
      } else {
        if (this.idty != "user") {
          this.$fetch(Resource.CourierDind, {
            openid: "oyXLt0_bqywZK5ifUNEVaVnVPokU",
            cabinetId: localStorage.getItem("erCode"),
            phoneNo: 18625998512,
            checkCode: this.VerificationCode
          }).then(res => {
            tooltipbox.show(res.msg);
            if (res.status == "True") {
              setTimeout(() => {
                this.$router.push({
                  path: "/index"
                });
              }, 1000);
            }
          });
        } else {
          this.$fetch(Resource.userregist, {
            openid: "oyXLt0_bqywZK5ifUNEVaVnVPokU",
            cabinetId: localStorage.getItem("erCode"),
            phoneNo: this.phone,
            checkCode: this.VerificationCode
          }).then(res => {
            this.$router.push({
              path: "/index"
            });
          });
        }
      }
    }
  }
};
</script>
<style scoped>
@import url("../../assets/css/style.css");
@import url("../../assets/css/animate.min.css");
@import url("../../assets/css/common.css");
.border_bg {
  width: 1.3rem;
  line-height: 0.6rem;
  border-radius: 0.3rem;
  background: yellow;
  color: #333;
  text-align: center;
}
</style>

