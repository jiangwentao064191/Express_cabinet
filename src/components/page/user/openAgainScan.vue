<template>
  <div>
    <vue-element-loading :active="show"  text="Loading" element-loading-spinner="el-icon-loading"/>
    <div class="oas_box none">
      <div class="oa_title">
        已打开
        <span class="oas_nums">1</span>个箱门，取件后请随手关门。
      </div>
      <div class="oas_loadList">
        <div class="oas_lists">
            <div class="oa_msgBox">
    <div class="oa_msgBoxTop">
      <div class="oa_msgBoxTopL oa_name">10号</div>
      <div class="oa_msgBoxTopR">
        <div class="oa_msgBoxTopitem">
          箱子类型：
          <span class="oa_msgBoxCol oa_type">中型</span>
        </div>
        <div class="oa_msgBoxTopitem">
          快递员手机:
          <span class="oa_msgBoxCol oa_phone">15556925810</span>
        </div>
        <div class="oa_msgBoxTopitem">
          投递时间:
          <span class="oa_msgBoxCol oa_time">2019.05.14</span>
        </div>
        <div class="oa_msgBoxTopitem">
          支付费用:
          <span class="oa_msgBoxCol oa_mon">￥0.01</span>
        </div>
      </div>
    </div>
    <!-- <div class="oa_msgBoxBot">
      <div class="oa_msgBoxBot1">若箱门异常，可在1分钟内再次开箱3次。</div>
      <div
        class="oa_msgBoxBot2"
        @click="open"
      >再次开箱</div>
    </div> -->
    <div class="oa_details" @click="toRecord">详情</div>
  </div>
        </div>
      </div>
      <div class="oas_whiteBo"></div>
      <div class="oas_btns" @click="toIndex">返回首页</div>
    </div>
  </div>
</template>
<style scoped>
@import url("../../../assets/css/style.css");
.active {
  background: #f1f1f1 !important;
  color: #8f8f8f !important;
  border: 0 !important;
}
.velmld-parent .velmld-overlay {
  font-size: 0.44rem;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
}
</style>
<script>
import VueElementLoading from "vue-element-loading";
import { Resource } from "../../../utils/api.js";
import tooltipbox from "../../../assets/js/tooltipbox.js";
export default {
   components: {
    VueElementLoading
  },
  data () {
    return {
      show: false

    }
  },
   mounted () {
      document.title = '取件成功';
  },
    methods:{
      open(){
      this.show = true;
      this.$fetch(Resource.pickupsuccess,{
                    cabinetId: localStorage.getItem('erCode'),
                    pickcode: 855895
                    }).then(res=>{
                      setTimeout(() => {
                    this.show = false;
                        tooltipbox.show(res.msg);
                  }, 1000);
                }).catch(err=>{
                })
      },
        toRecord() {
            this.$router.replace({
                path:'/quickRecord'
            })
        },
        toIndex () {
            this.$router.push({
                path:'/index'
            })
        }
    }
}
</script>
