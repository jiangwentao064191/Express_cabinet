<template>
  <div>
    <div class="sb_success none" style="height: 100%;background: #f1f1f1;">
      <div class="sb_successTiBox">
        <img src="../../assets/images/sb_rights.png">
        <div class="sb_successTiMsg">投递成功，系统将自动发送通知给收件人</div>
        <div class="sb_successTiMon">
          <span style="font-size: .28rem;color: #999;font-weight: normal;">账户余额</span>
          <span>￥10</span>
          <span class="sb_sucMon"></span>
        </div>
        <!-- <div class="sb_successRecgs none">充值</div> -->
      </div>
      <div class="sb_msgsBox" @click="detailFunc">
        <div class="sb_msgsBoxHeader">
          <div class="sb_msgsBoxHeaderL">金美内部测试</div>
          <div class="sb_msgsBoxHeaderR" @click="toRecord">详情</div>
        </div>
        <div class="sb_msgsBoxBody">
          <div class="sb_msgsBoxItem">
            <div class="sb_msgsBoxItem1">箱子编号</div>
            <div class="sb_msgsBoxItem2 sb_msgsBoxCode">1234</div>
          </div>
          <div class="sb_msgsBoxItem">
            <div class="sb_msgsBoxItem1">存放时间</div>
            <div class="sb_msgsBoxItem2 sb_msgsBoxTime">2019-5-24 15:09</div>
          </div>
          <div class="sb_msgsBoxItem sb_msgsBoxItemMon">
            <div class="sb_msgsBoxItem1">余额支付</div>
            <div class="sb_msgsBoxItem2 sb_msgsBoxMon">￥0.01</div>
          </div>
          <div class="sb_msgsBoxItem">
            <div class="sb_msgsBoxItem1">取件码</div>
            <div class="sb_msgsBoxItem2 sb_msgsBoxpickCode">666888</div>
          </div>
        </div>
      </div>
      <div class="sb_succesBtn">
        <div class="sb_succesBtnL" @click="toIndex">返回首页</div>
        <div class="sb_succesBtnR" @click="continueOffer">继续投递</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import url("../../assets/css/animate.min.css");
@import url("../../assets/css/style.css");
@import url("../../assets/css/common.css");
</style>
<script>
export default {
  methods: {
    detailFunc() {},
    toIndex() {
      this.$router.push({
        path: "/index"
      });
    },
    continueOffer() {
      this.$router.push({
        path: "/expressDelive"
      });
    },
    toRecord() {
      this.$router.push({
        path: "/quickRecord"
      });
    }
  },
  mounted() {
    document.title = "投递成功";
  }
};
</script>

