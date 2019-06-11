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
          if (_this.idty != "user") {
            _this
              .$fetch(Resource.getcheckcode, {
                openid: "oyXLt0_bqywZK5ifUNEVaVnVPokU",
                cabinetId: 1012,
                phoneNo: _this.phone
              })
              .then(res => {
                tooltipbox.show(res.msg);
                if (res.status || _this.time <= 0) {
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
              }).catch(err=>{
                clearInterval(interval);
              });
          }
        }, 1000);
      }
    },
    register() {
      if (!this.phone||!(/^1[34578]\d{9}$/.test(this.phone))||!this.phone||!/^\d{6}$/.test(this.VerificationCode)) {
              tooltipbox.show('请输入完整手机号或验证码');
      } else {
      if (this.idty != "user") {
        this.$fetch(Resource.CourierDind, {
          openid: "oyXLt0_bqywZK5ifUNEVaVnVPokU",
          cabinetId: 1012,
          phoneNo: 18625998512,
          checkCode: 2976
        }).then(res => {
          this.$router.push({
            path: "/index"
          });
        });
      } else {
        this.$fetch(Resource.userregist, {
          openid: "oyXLt0_bqywZK5ifUNEVaVnVPokU",
          cabinetId: 1012,
          phoneNo: this.phone,
          checkCode: 2976
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

