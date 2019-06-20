<template>
  <div @click="clearBtn">
    <!-- <div class="fixed_all"  v-if='isOpen'></div> -->
    <vue-element-loading :active="show" text="开箱中" element-loading-spinner="el-icon-loading"/>
    <div class="header">
      <div class="gr_body">
        <div class="gr_header">
          <ul id="groLi" class="grcard_List">
            <li
              v-for="(item,key) in items"
              :key="key"
              @click="change(item,key)"
              v-bind:class="{ grcurrent:key==current }"
            >{{item}}</li>
          </ul>
        </div>
      </div>
      <div id="groUl" class="grcard_content" v-if="current==0">
        <div class="groUl_tab" style="display:block;">
          <div class="sr_shuaibox none"></div>
          <div class="sr_title">
            <div style="display: flex;align-items:center;">
              <div class="sr_titleL" @click="openOrClose">{{timePicker}}</div>
              <img id="sr_shuai" src="../../assets/images/sr_icons.png">
            </div>
            <div class="sr_titleR sr_searchUn" v-if="idty!='user'" @click="toSearch(1)">搜索</div>
            <ul class="md_unrecordUl" v-if="showSelect">
              <li
                v-bind:class="{currentColor : currentIndex == i}"
                @click="selectTime(item,i)"
                v-for="(item,i) in timeList"
                :key="i"
              >{{item}}</li>
            </ul>
          </div>
        </div>
        <div id="sr_loadSearch">
          <div class="sr_listsSearch"></div>
        </div>
      </div>
    </div>
    <div class="ex_norecord" v-if="!dataList1.length&&current==0">
      <img src="../../assets/images/an_white.png">
      <p class="ex_norecordP">暂无待领取记录哦~</p>
    </div>
    <scroller
      :on-refresh="refresh"
      :on-infinite="infinite"
      no-DataText
      v-if="dataList1.length&&current==0"
    >
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
            <div class="ex_recordbtn" v-if="idty!='user'">
              <div class="ex_paybtn" @click.stop="menuFunc(key)">
                <div>操作</div>
                <div class="ex_paybtnTop"></div>
              </div>
              <div class="ex_recordMenu none">
                <ul
                  class="ex_recordMeList"
                  @click.stop="liMenuFunc(this)"
                  v-if="currentOpen==key&&isOpen"
                >
                  <li @click.stop="reviseFunc(item,key)" ref="modify">修改手机号</li>
                  <li @click.stop="msgFunc">重发信息</li>
                  <li @click.stop="takeFunc(this)">取回快件</li>
                  <li @click.stop="phoneFunc(this)">拨号</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroller>
    <div class="groUl_tab" v-if="current==1">
      <div class="sr_title">
        <div class="sr_titleLes">已领取</div>
        <div class="sr_titleR sr_searchEs" v-if="idty!='user'" @click="toSearch(2)">搜索</div>
      </div>
      <div class="ex_norecordEs">
        <div id="sr_loadListEs">
          <div class="sr_listsEs"></div>
        </div>
      </div>
    </div>
    <scroller
      :on-refresh="refresh"
      :on-infinite="infinite"
      no-DataText
      v-if="dataList2.length&&current==1"
    >
      <div class="ex_norecord" v-if="!dataList2.length">
        <img src="../../assets/images/an_white.png">
        <p class="ex_norecordP">暂无待领取记录哦~</p>
      </div>
      <div class="ex_norecord" v-for="(item,key) in dataList2" :key="key">
        <div class="ex_recordbox">
          <div class="ex_recordTit ex_recordTitCss">
            <div class="ex_recordTitL ex_recordTitLCss"></div>
            <div
              class="ex_recordTitR ex_recordTitRMargin"
              @click="openFunc(key,dataList2)"
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
              <div class="ex_recorditem">
                <div class="ex_recorditem1">取件时间</div>
                <div class="ex_recorditem2">{{item.outDate}}</div>
              </div>
            </div>
            <div class="ex_recorditem">
              <div class="ex_recorditem1">余额支付</div>
              <div class="ex_recorditem2 ex_colorMon">￥{{item.totalFee}}</div>
            </div>
          </div>
        </div>
      </div>
    </scroller>
    <!-- <div class="popbg"></div>
    <div class="popbgFunc"></div>-->
  </div>
</template>
<style scoped>
@import url("../../assets/css/style.css");
@import url("../../assets/css/animate.min.css");
@import url("../../assets/css/common.css");
.fixed_all {
  width: 100%;
  height: 100%;
  position: fixed;
}
.velmld-parent {
  position: static !important;
}
/* .header{
  width: 100%;
  height: 1rem;
} */
._v-container {
  top: 140px !important;
}
.active {
  background: #f1f1f1 !important;
  color: #8f8f8f !important;
  border: 0 !important;
}
.velmld-overlay {
  font-size: 0.44rem;
  position: fixed !important;
}
.hide {
  /* display: none; */
}
.ul-box {
}
.ul-enter-active,
.ul-leave-active {
  transition: all 0.5s;
}
.ul-enter,
.ul-leave-to {
  height: 0;
}
</style>
<style>
</style>

<script>
</script>

<script>
import { Resource } from "../../utils/api.js";
import "../../assets/js/jquery.minV181011";
import "../../assets/js/jquery.hDialog.js";
import tooltipbox from "../../assets/js/tooltipbox.js";
import VueElementLoading from "vue-element-loading";
export default {
  name: "quickRecord",
  data() {
    return {
      items: ["待领取", "已领取"],
      current: 0,
      showSelect: false,
      timeList: ["查看全部", "只看当天", "超过三天"],
      currentIndex: "",
      timePicker: "查看全部",
      showOperation: false,
      dataList1: [],
      dataList2: [],
      isOpne: "展开",
      modifyMobile: "",
      currentOpen: "",
      isOpen: "",
      scrollState: true, //是否可以滑动
      indexScrollTop: 0,
      listdata: [],
      deg: 0,
      show: false,
      idty: "",
      page1: 1,
      page2: 1,
      total1: 1,
      total2: 1,
      click: false
    };
  },
  components: {
    VueElementLoading
  },
  mounted() {
    this.idty = localStorage.getItem("idty");
    // this.init();
    (this.page1 = 0),
      (this.page2 = 0),
      (this.dataList1 = []),
      (this.dataList2 = []);
    if (this.idty == "user") {
      document.title = "取件记录";
    } else {
      document.title = "投递记录";
    }
  },
  methods: {
    clearBtn() {
      this.isOpen = false;
    },
    toSearch(type) {
      this.$router.push({
        path: "/recordSearch",
        query: {
          state: type
        }
      });
    },
    noData() {},
    //   getDate (offset, fn) {
    //   $http.get({
    //     url: 'http://gl.luoyangjinmei.com/webapi/ApiTest.ashx?method=getdeliverylistpage',
    //     data: {
    //       'offset': offset,
    //       'limit': 5
    //     },
    //     success: data => {
    //       if (data.length < 5) {    //每次请求数据是10条，如果数据不够10条，就是没数据了 让页数=0；
    //         this.offset = 0
    //         fn(true)
    //         return
    //       } else {
    //         if (fn) fn()
    //       }
    //       if (offset === 1) {
    //         this.items = data   //如果是想下滑动，刷新数据 就让items等于最新数据
    //       } else {
    //         this.items = this.items.concat(data) //否则就把数据拼接
    //       }
    //     },
    //     error: err => {
    //       console.log(err, '----------err')
    //       // let message = err.response
    //       // toastr.toastrUtil(message.data[0].errorMessage)
    //     }
    //   })
    // },
    // infinite (done) {
    //   this.offset++    //每当向上滑动的时候就让页数加1
    //   this.getDate(this.offset, done)
    // },
    // refresh (done) { //这是向下滑动的时候请求最新的数据
    //   this.offset = 0
    //   this.getDate(1, done)
    // },
    refresh(done) {
      setTimeout(() => {
        if (this.idty == "user") {
          this.page1 = 1;
          if (this.current == 0) {
            this.dataList1 = [];
            this.getUserList(1);
          } else {
            this.dataList2 = [];
            this.getUserList(2);
          }
        } else {
          this.page2 = 1;
          if (this.current == 0) {
            this.dataList1 = [];
            this.UnGetList(1);
          } else {
            this.dataList2 = [];
            this.UnGetList(2);
          }
        }
        done();
      }, 1500);
    },
    infinite(done) {
      let that = this;
      if (this.idty == "user") {
        if (this.page1 >= this.total1) {
          setTimeout(() => {
            done(true);
          }, 1500);
          return;
        }
      } else {
        if (this.page2 >= this.total2) {
          setTimeout(() => {
            done(true);
          }, 1500);
          return;
        }
      }
      setTimeout(() => {
        if (that.idty == "user") {
          if (that.page1 == 0) {
            that.page1 = 1;
          } else {
            that.page1++;
            that.current == 1 ? that.getUserList(2) : that.getUserList(1);
          }
        } else {
          if (that.page2 == 0) {
            that.page2 = 1;
          } else {
            that.page2++;
            that.current == 1 ? that.UnGetList(2) : that.UnGetList(1);
          }
        }
        setTimeout(() => {
          done();
        }, 1100);
      }, 1000);
    },
    getTop(y) {
      //滚动条位置
      this.indexScrollTop = y;
    },

    init() {
      if (this.idty == "user") {
        this.getUserList(1);
      } else {
        this.UnGetList(1);
      }
    },
    getUserList(type) {
      this.$fetch(Resource.getpickuplistpage, {
        phoneNo: 18317529845,
        courierId: "2486c4c5-b224-4a3e-b987-2f2578e03643", //用户编号
        cabinetId: localStorage.getItem("erCode"), //柜子编号
        state: type, //1表示未取，2表示已取
        page: this.page1 == 0 ? 1 : this.page1
      }).then(res => {
        let dataList = JSON.parse(res.lists);
        this.total1 = res.total;
        dataList.forEach(v => {
          v.inDate =
            v.inDate &&
            this.$formatTimeAmt(
              parseInt(v.inDate.replace(/\D/gim, "")),
              "yyyy-MM-dd hh:mm:ss"
            );
          if (type == 2) {
            v.outDate =
              v.outDate &&
              this.$formatTimeAmt(
                parseInt(v.outDate.replace(/\D/gim, "")),
                "yyyy-MM-dd hh:mm:ss"
              );
          }
        });
        for (let i in dataList) {
          this.$set(dataList[i], "isOpen", "展开");
        }
        if (type == 1) {
          this.dataList1 = [...dataList, ...this.dataList1];
        } else {
          this.dataList2 = [...dataList, ...this.dataList2];
        }
      });
    },
    UnGetList(type) {
      this.$fetch(Resource.getdeliverylistpage, {
        courierId: "2486c4c5-b224-4a3e-b987-2f2578e03643", //快递员编号
        cabinetId: localStorage.getItem("erCode"), //柜子编号
        state: type, //1表示未取，2表示已取
        page: this.page2 == 0 ? 1 : this.page2
      }).then(res => {
        let dataList = JSON.parse(res.lists);
        this.total2 = res.total;
        dataList.forEach(v => {
          v.inDate =
            v.inDate &&
            this.$formatTimeAmt(
              parseInt(v.inDate.replace(/\D/gim, "")),
              "yyyy-MM-dd hh:mm:ss"
            );
          if (type == 2) {
            v.outDate =
              v.outDate &&
              this.$formatTimeAmt(
                parseInt(v.outDate.replace(/\D/gim, "")),
                "yyyy-MM-dd hh:mm:ss"
              );
          }
          for (let i in dataList) {
            this.$set(dataList[i], "isOpen", "展开");
          }
        });
        if (type == 1) {
          this.dataList1 = [...dataList, ...this.dataList1];
        } else {
          this.dataList2 = [...dataList, ...this.dataList2];
        }
      });
    },
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
    openOrClose() {
      this.showSelect = !this.showSelect;
    },
    change(item, index) {
      this.current = index;
      this.page1 = 0;
      this.dataList1 = [];
      this.dataList2 = [];
      this.page2 = 0;
      if (index == 0) {
        if (this.idty == "user") {
          this.getUserList(1);
        } else {
          this.UnGetList(1);
        }
      } else {
        if (this.idty == "user") {
          this.getUserList(2);
        } else {
          this.UnGetList(2);
        }
      }
    },
    selectTime(item, i) {
      this.currentIndex = i;
      this.timePicker = item;
      this.showSelect = false;
      this.$fetch(Resource.getdeliverylistpage, {
        courierId: "2486c4c5-b224-4a3e-b987-2f2578e03643",
        page: 0,
        state: 1,
        cabinetId: localStorage.getItem("erCode"),
        filtertype: i,
        inputpara: ""
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
          console.log(this.dataList1);
        })
        .catch(err => {});
    },
    menuFunc(index) {
      this.currentOpen = index;
      this.isOpen = !this.isOpen;
      // this.showOperation = !this.showOperation
    },
    liMenuFunc() {},
    reviseFunc(item, index) {
      let _this = this;
      $.dialogInput(
        "confirm",
        "修改收件人号码",
        0,
        () => {
          this.modifyMobile = $(".msb_phonecode2").val();
          this.$fetch(Resource.changephonetoresendmsg, {
            courierId: "2486c4c5-b224-4a3e-b987-2f2578e03643",
            deliverylogID: "SN19051609483720589471", //投递记录编号
            outphone: this.modifyMobile || 18039438761
          })
            .then(res => {
              if (res.status === true) {
                $.closeDialog();
                tooltipbox.show(res.msg);
                this.isOpen = !this.isOpen;
              }
            })
            .catch(err => {});
        },
        function() {
          _this.isOpen = !_this.isOpen;
          // window.location.reload();
        }
      );
      console.log(this.$refs.modify[index]);
    },
    msgFunc() {
      this.$fetch(Resource.resendmsg, {
        deliverylogID: "SN19051609483720589471" //投递记录编号
      })
        .then(res => {
          tooltipbox.show(res.msg);
          this.isOpen = !this.isOpen;
        })
        .catch(err => {});
    },
    takeFunc() {
      let _this = this;
      $.dialogDiy(
        "confirm",
        "取回提示",
        "请确保您在柜子前，确认取回后将发送取回消息通知收件人。",
        0,
        "确认取回",
        "点错了",
        function() {
          // 取回快递事件
          _this.show = true;
          _this
            .$fetch(Resource.pickupbycourier, {
              deliverylogid: "SN19052314160286356732"
            })
            .then(res => {
              setTimeout(() => {
                _this.show = false;
                _this.isOpen = !_this.isOpen;
                tooltipbox.show(res.msg);
              }, 1000);
            })
            .catch(err => {});
        },
        function() {}
      );
    },
    phoneFunc() {}
  }
};
</script>

