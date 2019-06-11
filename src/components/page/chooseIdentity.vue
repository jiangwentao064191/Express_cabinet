<template>
  <div>
    <div class="ci_body">
      <img class="ci_img" src="../../assets/images/ci_save.png">
      <div class="ex_btnS" @click="judgeIdty('curiser')">我是快递小哥</div>
      <div class="ci_box">
        <div class="ci_boxitem" style="margin-left: .4rem;"></div>
        <div class="ci_boxitemTxt">或者</div>
        <div class="ci_boxitem"></div>
      </div>
      <img class="ci_imgGet" src="../../assets/images/ci_get.png">
      <div class="ex_btnS" @click="judgeIdty('user')">我是普通用户</div>
    </div>
  </div>
</template>
<script>
import { Resource } from "../../utils/api.js";
import tooltipbox from  '../../assets/js/tooltipbox.js'
export default {
  data() {
    return {
      openid: "",
      result: "",
      err: '',
      res: ''
    };
  },
  mounted() {
    this.$fetch('http://wx.luoyangjinmei.com/getWxinfo.ashx')
      .then(res => {

      })
      .catch(err => {
      });
    localStorage.removeItem("idty");
  },
  methods: {
    judgeIdty(idty) {
      let user = localStorage.getItem('userInfo')
      if(idty=='user'){
        localStorage.setItem("idty", "user");
      } else {
        localStorage.setItem("idty", "courier");
      }
      if (idty&&user) {
        if (idty=='user') {
            this.$router.replace({
              path: "/index",
              query: {
                idty: "user"
              }
            });
        } else {
            this.$router.replace({
              path: "/index",
              query: {
                idty: "courier"
              }
            });
        }
      } else {
        this.$router.replace({
              path: "/login",
              query: {
                idty: idty
              }
        });
      }


      // this.$fetch(Resource.isexistpickuser, {
      //   openid: this.openid
      // })
      //   .then(res => {
      //     // if (res.status) {
      //     if (res.usertype && res.usertype == 1) {
      //       localStorage.setItem("idty", "user");
      //       this.$router.replace({
      //         path: "/index",
      //         query: {
      //           idty: "user"
      //         }
      //       });
      //     } else {
      //       localStorage.setItem("idty", "courier");
      //       this.$router.replace({
      //         path: "/index",
      //         query: {
      //           idty: "courier"
      //         }
      //       });
      //     }
      //   })
      //   .catch(err => {});
    }
  }
};
</script>
<style scoped>
@import url("../../assets/css/style.css");
@import url("../../assets/css/animate.min.css");
@import url("../../assets/css/common.css");
</style>
