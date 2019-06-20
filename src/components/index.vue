<template>
  <div>
    <div class="id_body">
      <div class="id_header">
        <div id="oUl" class="card_content">
          <div class="oUl_tab" style="display:block;" v-if="index==0">
            <div class="id_banner">
              <img src="../assets/images/id_bgUser.png" v-if="idty=='user'">
              <img src="../assets/images/id_bg.png" v-else>
            </div>
            <div class="id_white"></div>
            <div class="id_serviceBox">
              <div class="id_service">
                <div class="id_serviceL">{{idty=='user'?'用户服务':'快递员服务'}}</div>
                <div class="id_serviceM" @click="changeIdentity">切换身份</div>
              </div>
              <div class="id_funcBox">
                <div class="id_funcBoxL" v-if="idty!='user'" @click="toExpressDelive">
                  <div class="id_funcBoxLItem1">扫码取件</div>
                  <div class="id_funcBoxLItem2">扫码轻松取件</div>
                </div>
                <div class="id_funcBoxLonekey" v-if="idty!='user'" @click="getCode">
                  <div class="id_funcBoxLItem1">取件码取件</div>
                  <div class="id_funcBoxLItem2">输入取件码开箱</div>
                </div>
                <div class="id_funcBoxL id_funcBoxL1" v-if="idty=='user'" @click="toExpressDelive1">
                  <div class="id_funcBoxLItem1">快速投递</div>
                  <div class="id_funcBoxLItem2">扫码轻松投件</div>
                </div>
                <!-- <div class="id_funcBoxLOpen ">
<div class="id_funcBoxLItem1">快速投递</div>
<div class="id_funcBoxLItem2">扫码轻松投件</div>
</div>
<div class="id_funcBoxR ">
<div class="id_funcBoxLItem1">预约投递</div>
<div class="id_funcBoxLItem2">预填信息高效投件</div>
                </div>-->
              </div>
              <div class="id_whiteBot"></div>
            </div>
          </div>
          <div class="oUl_tab" v-if="index==1">
            <div class="id_banner">
              <img src="../assets/images/id_recordBg.png">
            </div>
            <div class="id_white"></div>
            <div class="id_recordBox">
              <div class="id_recorditem" @click="toRecord">投递记录</div>
              <!-- <div class="id_recorditem1" @click="toRecord">预约记录</div> -->
            </div>
          </div>
          <div class="oUl_tab" v-if="index==2">
            <div class="ms_box">
              <div class="ms_header">
                <div class="ms_headerImg">
                  <img id="ms_imgCodes" src="../assets/images/timg.png">
                </div>
                <div class="ms_headerBtn"></div>
                <div class="ms_headerNum">
                  <span class="ms_Nums"></span>
                </div>
                <div class="ms_headerBtnun">欢迎使用智能快递柜服务</div>
                <div class="ms_ident none"></div>
              </div>
              <div class="ms_bindbox ms_purse" @click="towallet">
                <div class="ms_bind">
                  <div class="ms_bindL">
                    <div class="ms_bindL2">我的钱包</div>
                  </div>
                  <div class="ms_bindR ms_monColor">
                    ￥10
                    <span class="ms_mons"></span>
                  </div>
                </div>
              </div>
              <div class="ms_company none" @click="selectCompany" v-if="idty!='user'">
                <div class="ms_bind">
                  <div class="ms_bindL">
                    <div class="ms_bindL2">所属公司</div>
                  </div>
                  <div class="ms_bindR ms_companyName">{{express}}</div>
                </div>
              </div>
              <div class="ms_bindbox ms_about" @click="toInner">
                <div class="ms_bind">
                  <div class="ms_bindL">
                    <div class="ms_bindL2">账号信息</div>
                  </div>
                  <div class="ms_bindR">155569</div>
                </div>
              </div>
              <div class="ms_changeId" @click="changeIdentity">
                <div class="ms_bind">
                  <div class="ms_bindL">
                    <div class="ms_bindL2">切换身份</div>
                  </div>
                  <div class="ms_bindR ms_idColor">{{idty=='user'?'普通用户':'快递员'}}</div>
                </div>
              </div>
              <div class="ms_postion none">
                <div class="ms_bind">
                  <div class="ms_bindL">
                    <div class="ms_bindL2">管理中心</div>
                  </div>
                  <div class="ms_bindR"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="id_footer">
        <ul id="oLi" class="card_List clearfix" ref="oLi">
          <li
            :class="{'current':key==index}"
            v-for="(item,key) in list"
            :key="key"
            @click="switchTab(key)"
          >
            <img :src="item.img">
            <div>{{item.name}}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="masks"></div>
    <div class="popup_box none">
      <div class="popup_close" @click="closed1"></div>
      <div class="popup_header">选择所属快递公司</div>
      <div class="popup_content">设置快递公司信息将会在快递通知中展示</div>
      <div class="inputBox" id="telBox">
        <input
          type="text"
          id="myinput"
          class="sr_inputStyle"
          v-model="express"
          style="background: none;margin-top: .2rem;"
          placeholder="请选择或输入所属快递公司"
          maxlength="5"
        >
        <div class="clearBtn" style="right: .3rem;">
          <div class="clearBtnLine1"></div>
          <div class="clearBtnLine2"></div>
        </div>
      </div>
      <ul class="company_ul">
        <li
          v-for="(item,key) in items"
          :key="key"
          @click="select(item.label,key)"
          v-bind:class="{ company_current:key==current}"
        >{{item.label}}</li>
      </ul>
      <div class="popup_footer">
        <div class="popup_btn" @click="closed">确认</div>
      </div>
    </div>
  </div>
</template>
<script>
import "../assets/js/adaptive.js";
import "../assets/js/jquery.minV181011.js";
import "../assets/js/tooltipbox.js";
import "../assets/js/mycommon.js";
import { Resource } from "../utils/api.js";
export default {
  name: "HelloWorld",
  data() {
    return {
      items: [],
      list: [
        {
          img: "http://ceshi.wondware.com/express/images/an_foodes.png",
          name: "存快递"
        },
        {
          img: "http://ceshi.wondware.com/express/images/an_pepoun.png",
          name: "记录"
        },
        {
          img: "http://ceshi.wondware.com/express/images/an_rcodun.png",
          name: "我的"
        }
      ],
      express: "",
      current: "",
      idty: "",
      index: 0,
      openid: ""
    };
  },
  mounted() {
    if (this.$route.query.idty || localStorage.getItem("idty")) {
      this.idty = this.$route.query.idty || localStorage.getItem("idty");
    }
    this.idty == "user"
      ? ((document.title = "取快递"), (this.list[0].name = "取快递"))
      : (document.title = "存快递");
    $(".masks").hide();
    $(".popup_box").hide();
    // this.$fetch(Resource.getcheckcode,{
    //   openid:'oyXLt0_bqywZK5ifUNEVaVnVPokU',
    //   cabinetId: 1012,
    //   phoneNo: 18039438763
    // }).then(res=>{
    //   console.log(res)
    // })
    this.getCompanyList();
  },
  methods: {
    getCode() {
      this.$router.push({
        path: "/getCode"
      });
    },
    getCompanyList() {
      this.$fetch(Resource.getexpcompany)
        .then(res => {
          this.items = res;
        })
        .catch(err => {});
    },
    closed1() {
      $(".masks").hide();
      $(".popup_box").hide();
      $(".clearBtn").hide();
      $(".company_ul li").removeClass("company_current");
      $("#myinput").val("");
    },
    closed() {
      this.$fetch(Resource.setcourierexpname, {
        courierid: "18276e16-cb8a-4bba-95d0-b14667cfae48",
        expcompanyName: this.express
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {});
      $(".masks").hide();
      $(".popup_box").hide();
      $(".clearBtn").hide();
      $(".company_ul li").removeClass("company_current");
      $("#myinput").val("");
    },
    select(item, index) {
      this.express = item;
      $(".clearBtn").show();
      this.current = index;
    },
    selectCompany() {
      $(".masks").show();
      $(".popup_box").show();
    },
    toInner() {
      this.$router.push({
        path: "/userInfo"
      });
    },
    addun(str) {
      var arr = str.split("");
      arr.splice(48, 2, "un");

      return arr.join("");
    },
    toExpressDelive1() {
      if (this.idty == "user") {
        this.$router.push({
          path: "/scanGet"
        });
      } else {
        this.$router.push({
          path: "/expressDelive"
        });
      }
    },
    toExpressDelive() {
      let _this = this;
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
              var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            }
          });
        }
      });
      // if (this.idty=='user') {
      //   this.$router.push({
      //     path: "/scanGet"
      //   });
      // } else {
      //   this.$router.push({
      //     path: "/expressDelive"
      //   });
      // }
    },
    changeIdentity() {
      this.$router.push({
        path: "/"
      });
    },
    towallet() {
      this.$router.push({
        path: "/mywallet"
      });
    },
    toRecord() {
      this.$router.push({
        path: "/quickRecord"
      });
    },
    addes(str) {
      var arr = str.split("");
      arr.splice(48, 2, "es");

      return arr.join("");
    },
    switchTab(key) {
      var titleArr = {
        0: "存快递",
        1: "记录",
        2: "我的"
      };
      this.index = key;
      document.title = titleArr[key];
      for (let i in this.list) {
        this.list[i].img = this.addun(this.list[i].img);
      }
      this.list[key].img = this.addes(this.list[key].img);
      if (this.index == 1 && this.idty == "user") {
        this.$router.push({
          path: "quickRecord"
        });
      }
    }
  }
};
</script>
<style scoped>
@import url("../assets/css/style.css");
.white {
  background: white;
}
</style>
