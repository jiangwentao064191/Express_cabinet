<template>
  <div class="ftc_wzsf">
    <div class="cp_text" style="font-weight: bold;">输入取件码</div>
    <div class="srzfmm_box">
      <ul class="mm_box">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <div class="numb_box">
      <div class="xiaq_tb">
        <img src="../../../assets/images/jftc_14.jpg" height="10">
      </div>
      <ul class="nub_ggg">
        <li>
          <a href="javascript:void(0);" class="zf_num">1</a>
        </li>
        <li>
          <a href="javascript:void(0);" class="zj_x zf_num">2</a>
        </li>
        <li>
          <a href="javascript:void(0);" class="zf_num">3</a>
        </li>
        <li>
          <a href="javascript:void(0);" class="zf_num">4</a>
        </li>
        <li>
          <a href="javascript:void(0);" class="zj_x zf_num">5</a>
        </li>
        <li>
          <a href="javascript:void(0);" class="zf_num">6</a>
        </li>
        <li>
          <a href="javascript:void(0);" class="zf_num">7</a>
        </li>
        <li>
          <a href="javascript:void(0);" class="zj_x zf_num">8</a>
        </li>
        <li>
          <a href="javascript:void(0);" class="zf_num">9</a>
        </li>
        <li>
          <a href="javascript:void(0);" class="zf_empty">清空</a>
        </li>
        <li>
          <a href="javascript:void(0);" class="zj_x zf_num">0</a>
        </li>
        <li>
          <a href="javascript:void(0);" class="zf_del">删除</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
@import url("../../../assets/css/zhifu.css");
@import url("../../../assets/css/style.css");
</style>
<script>
// import '../../../assets/js/jweixin-1.2.0'
import "../../../assets/js/jquery.minV181011";
import "../../../assets/js/mycommon.js";
import { Resource } from "../../../utils/api.js";
import tooltipbox from "../../../assets/js/tooltipbox.js";
export default {
  methods: {
    funcOpen() {
      var datas = "";
      $(".mm_box li").each(function() {
        datas += $(this).attr("data");
      });
      this.$fetch(Resource.pickupsuccess, {
        cabinetId: localStorage.getItem('erCode'),
        pickcode: datas
      })
        .then(res => {
          if (res.status) {
            setTimeout(() => {
              this.$router.push({
                path: "/openAgainScan"
              });
            }, 1000);
          } else {
            tooltipbox.show(res.msg);
            }
        })
        .catch(err => {});
    }
  },
  mounted() {
    //$(".ftc_wzsf").show();
    //$(".numb_box").slideUp(0);
    //$(".numb_box").slideDown(0);
    $(".ftc_wzsf").show();
    $(".numb_box").slideUp(0);
    $(".numb_box").slideDown(500);
    var cabinetNumberstrs = "";

    // 进行页面微信授权
    var cabinetKeys = "";
    // 查询是否从外部扫码  从外部扫码就可以拿到二维码信息

    // 调取扫码

    //关闭浮动
    $(".close").click(function() {
      $(".ftc_wzsf").hide();
      $(".mm_box li").removeClass("mmdd");
      $(".mm_box li").attr("data", "");
      i = 0;
    });
    //数字显示隐藏
    $(".xiaq_tb").click(function() {
      $(".numb_box").slideUp(500);
    });
    $(".mm_box").click(function() {
      $(".numb_box").slideDown(500);
    });
    // 输入6个数字时触发的事件
    var i = 0;
    let _this = this;
    $(".nub_ggg li .zf_num").click(function() {
      $(".cp_btn").show();
      if (i < 6) {
        $(".mm_box li")
          .eq(i)
          .addClass("mmdds");
        $(".mm_box li")
          .eq(i)
          .text($(this).text());
        $(".mm_box li")
          .eq(i)
          .attr("data", $(this).text());
        //console.log($(this).text());
        i++;
        if (i == 6) {
          _this.funcOpen();
        }
      }
    });

    // 数字键盘删除功能
    $(".nub_ggg li .zf_del").click(function() {
      if (i > 0) {
        i--;
        $(".mm_box li")
          .eq(i)
          .removeClass("mmdds");
        $(".mm_box li")
          .eq(i)
          .attr("data", "");
        $(".mm_box li")
          .eq(i)
          .text("");

        if (i == 0) {
          $(".cp_btn").hide();
        }
      }
    });
    // 数字键盘清空功能
    $(".nub_ggg li .zf_empty").click(function() {
      $(".mm_box li").removeClass("mmdds");
      $(".mm_box li").attr("data", "");
      $(".mm_box li").text("");
      $(".cp_btn").hide();
      i = 0;
    });
    // 按钮关闭数字键盘
    $(".cp_btn").click(function() {
      $(".mm_box li").removeClass("mmdds");
      $(".mm_box li").attr("data", "");
      $(".mm_box li").text("");
      $(".cp_btn").hide();
      i = 0;
    });
  }
};
</script>

