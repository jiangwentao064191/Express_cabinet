<template>
  <div>
    <div class="sr_shuaibox">
      <div class="sr_header"></div>
      <div class="inputBox" id="telBox">
        <input
          type="tel"
          id="myinput"
          class="sr_inputStyle"
          placeholder="搜索单号或收件人手机"
          onfocus="this.placeholder=''"
          onblur="this.placeholder='搜索单号或收件人手机'"
          maxlength="32"
          v-model="telNum"
        >
        <div class="clearBtn" style="right: .3rem;top:24px" @click="clear">
          <div class="clearBtnLine1"></div>
          <div class="clearBtnLine2"></div>
        </div>
      </div>
      <div
        id="submit"
        class="ex_btnCss"
        style="height:.8rem;line-height:.8rem;margin:0 1.6rem;"
        @click="confirm"
      >确认</div>
      <div class="sr_header"></div>
    </div>
    <div class="ex_norecord" v-if="!dataList1.length">
      <img src="../../assets/images/an_white.png">
      <p class="ex_norecordP">暂无搜索记录哦~</p>
    </div>
    <div id="sr_loadSearch">
      <div class="sr_listsSearch">
        <div class="ex_norecord" v-for="(item,key) in dataList1" :key="key">
          <div class="ex_recordbox">
            <div class="ex_recordTit ex_recordTitCss">
              <div class="ex_recordTitL ex_recordTitLCss"></div>
              <div
                class="ex_recordTitR ex_recordTitRMargin"
                @click="openFunc(key,dataList1)"
              >{{item.isOpen}}</div>
              <div class="ex_xialaBg"></div>
            </div>
            <div class="ex_recordMsg">
              <div class="ex_recorditem">
                <div class="ex_recorditem1">箱子编号</div>
                <div class="ex_recorditem2">{{item.boxNo}}</div>
              </div>
              <div class="hide">
                <div class="ex_recorditem">
                  <div class="ex_recorditem1">取件码</div>
                  <div class="ex_recorditem2">{{item.openCode}}</div>
                </div>
                <transition name="box">
                  <div class="ul-box" v-if="item.isOpen=='收起'">
                    <div class="ex_recorditem">
                      <div class="ex_recorditem1">快递单号</div>
                      <div class="ex_recorditem2">{{item.expressId}}</div>
                    </div>
                    <div class="ex_recorditem">
                      <div class="ex_recorditem1" v-if="idty=='user'">快递员手机</div>
                      <div class="ex_recorditem1" v-if="idty!='user'">收件人手机</div>
                      <div class="ex_recorditem2">{{item.outPhone}}</div>
                    </div>
                    <div class="ex_recorditem">
                      <div class="ex_recorditem1">投递时间</div>
                      <div class="ex_recorditem2">{{item.inDate}}</div>
                    </div>
                  </div>
                </transition>
              </div>
              <div class="ex_recorditem">
                <div class="ex_recorditem1">余额支付</div>
                <div class="ex_recorditem2 ex_colorMon">￥{{item.totalFee}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="dropload-down none">
        <div class="dropload-noData">没有更多啦~</div>
      </div>
    </div>
  </div>
</template>
<script>
import { Resource } from "../../utils/api";
export default {
  data() {
    return {
      telNum: "",
      dataList1: [],
      state: 1
    };
  },
  mounted() {
    this.idty = localStorage.getItem("idty");
    if (this.$route.query.state) {
      this.state = this.$route.query.state;
    } else {
      this.state = 1;
    }
  },
  methods: {
    openFunc(key, dataList) {
      // this.deg += 180;
      // $(that)
      //   .next()
      //   .toggleClass("ex_xialaTop");
      if (dataList[key].isOpen == "展开") {
        this.$set(dataList[key], "isOpen", "收起");
      } else {
        this.$set(dataList[key], "isOpen", "展开");
      }
    },
    clear() {
      this.telNum = "";
    },
    confirm() {
      this.$fetch(Resource.getdeliverylistpage, {
        courierId: "2486c4c5-b224-4a3e-b987-2f2578e03643",
        page: 0,
        state: this.state,
        cabinetId: localStorage.getItem("erCode"),
        filtertype: 0,
        inputpara: this.telNum
      })
        .then(res => {
          this.dataList1 = JSON.parse(res.lists);
          this.dataList1.forEach(v => {
            v.inDate =
              v.inDate &&
              this.$formatTimeAmt(
                parseInt(v.inDate.replace(/\D/gim, "")),
                "yyyy-MM-dd hh:mm:ss"
              );
            v.outDate =
              v.outDate &&
              this.$formatTimeAmt(
                parseInt(v.outDate.replace(/\D/gim, "")),
                "yyyy-MM-dd hh:mm:ss"
              );
          });
          for (let i in this.dataList1) {
            this.$set(this.dataList1[i], "isOpen", "展开");
          }
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped>
@import url("../../assets/css/style.css");
@import url("../../assets/css/dropload.css");
@import url("../../assets/css/animate.min.css");
</style>
