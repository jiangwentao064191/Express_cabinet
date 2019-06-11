<template>
  <div>
    <div class="mp_box">
      <div class="mp_header">
        <div class="mp_title">我的钱包</div>
        <div class="mp_moneyBox">
          <div class="mp_moneyBoxItem">
            <div class="mp_moneyBoxItem1" style="font-weight: bold;">余额</div>
            <div class="mp_moneyBoxItem1">
              <span class="mp_money"></span>
              <span style="font-size: .38rem;font-weight: bold;">10元</span>
            </div>
          </div>
          <div id="submit" class="ex_btnCss" style="margin-top: .2rem;" @click="toAddBill">立即充值</div>
        </div>
      </div>
      <div class="mp_headertitle">
        <div class="mp_headertitle1 fadeIn" style="font-weight: bold;">资金明细</div>
        <div class="mp_headertitle2" @click="toDetail">查看全部</div>
      </div>
      <!-- <div class="ex_norecord">
        <img style="margin: 1rem 0 .4rem 2.3rem;" src="../../assets/images/an_white.png">
        <p>暂无充值记录哦~</p>
      </div>-->
      <div class="mp_list">
        <div class="mp_listBox">
          <div class="mp_listBoxt">
            <div class="mp_listBoxt1">充值</div>
            <div class="mp_listBoxt2">+1.00元</div>
          </div>
          <div class="mp_listBoxb">
            <div class="mp_listBoxb1">2019-05-24 15:30:29</div>
            <div class="mp_listBoxb2">余额支付</div>
          </div>
        </div>
        <div class="mp_listBox">
          <div class="mp_listBoxt">
            <div class="mp_listBoxt1">消费</div>
            <div class="mp_listBoxt2">-1.00元</div>
          </div>
          <div class="mp_listBoxb">
            <div class="mp_listBoxb1">2019-05-24 15:30:29</div>
            <div class="mp_listBoxb2">余额支付</div>
          </div>
        </div>
        <div class="mp_listBox">
          <div class="mp_listBoxt">
            <div class="mp_listBoxt1">消费</div>
            <div class="mp_listBoxt2">-1.00元</div>
          </div>
          <div class="mp_listBoxb">
            <div class="mp_listBoxb1">2019-05-24 15:30:29</div>
            <div class="mp_listBoxb2">余额支付</div>
          </div>
        </div>
        <div class="mp_listBox">
          <div class="mp_listBoxt">
            <div class="mp_listBoxt1">消费</div>
            <div class="mp_listBoxt2">-1.00元</div>
          </div>
          <div class="mp_listBoxb">
            <div class="mp_listBoxb1">2019-05-24 15:30:29</div>
            <div class="mp_listBoxb2">余额支付</div>
          </div>
        </div>
        <!-- <div class="mp_listBox">
          <div class="mp_listBoxt">
            <div class="mp_listBoxt1">退款</div>
            <div class="mp_listBoxt2">+10元</div>
          </div>
          <div class="mp_listBoxb">
            <div class="mp_listBoxb1">2019-05-24 15:30:29</div>
            <div class="mp_listBoxb2">余额支付</div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<style scoped>
@import url("../../assets/css/style.css");
@import url("../../assets/css/animate.min.css");
@import url("../../assets/css/common.css");
</style>
<script>
export default {
  methods: {
    toAddBill() {
      this.$router.push({
        path: "/addBill"
      });
    },
    toDetail() {
      this.$router.push({
        path: "/mywalletDetail"
      });
    }
  }
};
</script>

