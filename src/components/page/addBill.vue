<template>
  <div>
    
    <div class="sb_charges none">
      <div class="rc_boxs">
        <div class="rc_header">
          <div class="rc_header1">
            余额：<span class="rc_money">0</span>元
          </div>
          <div class="rc_header2">您当前余额不足，请充值后使用</div>
        </div>
        <div class="rc_title">选择充值金额</div>
        <ul id="rechargeList">
          <li class="line_hei" :class="{'current':index==idx}" v-for="(item,idx) in tabList" :key="idx"  @click="addBill(idx)" >{{item}}</li>
        </ul>
        <div id="submit" class="ex_btnCss" style="margin-top: .4rem;">立即充值</div>
        <div class="rc_footer">充值金额仅用于消费者使用快递柜服务，到付件取件运费支付，逾期取件费用支付，暂不支付退款。</div>
      </div>
    </div>
  </div>
</template>
<script>
// import 'http://res.wx.qq.com/open/js/jweixin-1.2.0.js'
// import "../../assets/js/jquery.minV181011.js";
// import "../../assets/js/mycommon.js";
// import "../../assets/js/tooltipbox.js";
export default {
    data () {
return {
        msg: 'Welcome to Your Vue.js App',
        amt: '',
        tabList: ['充5元送10元','充10元送20元','充20元送40元','充40元送60元'],
        index:0
        }
    },
    methods: {
      toLogo () {
        console.log(1111111111)
      },
      openBox () {console.log(222)},
      addBill (idx) {
        this.index = idx
      }
    }
};
</script>
<style scoped>
@import url("../../assets/css/style.css");
@import url("../../assets/css/animate.min.css");
@import url("../../assets/css/common.css");
</style>

